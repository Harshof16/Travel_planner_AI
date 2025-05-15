import React, { useState } from 'react';
import { useFiltersStore } from '../../store/filtersStore';
import CustomAutocomplete from '../ui/CustomAutocomplete';
import API from '../../apis/axios';

const inclusionsOptions = ['Flight', 'Hotel', 'Sightseeing', 'Transfer', 'Meal'];
const themeOptions = ['Beach', 'Adventure', 'Wildlife', 'Shopping', 'Honeymoon', 'Family', 'Culture'];
const tripTypeOptions = ['solo', 'couple', 'family', 'friends'];
const nationalityOptions = [
  'India', 'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 'France', 'UAE', 'Qatar', 'Syria'
];
const destinationOptions = [
  'Dubai - United Arab Emirates',
  'Qatar, Syria',
  'Bali, Indonesia',
  'Paris, France',
  'London, United Kingdom',
];

const MultiSelectDropdown: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  openDropdown: string | null;
  setOpenDropdown: (key: string | null) => void;
  dropdownKey: string;
}> = ({ options, selected, onChange, placeholder, openDropdown, setOpenDropdown, dropdownKey }) => {
  const open = openDropdown === dropdownKey;
  return (
    <div className="relative">
      <div
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer min-h-[40px]"
        onClick={() => setOpenDropdown(open ? null : dropdownKey)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <span className="text-gray-700 dark:text-gray-200">{selected.length} selected</span>
        )}
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900 ${selected.includes(opt) ? 'bg-teal-50 dark:bg-teal-950' : ''}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => {
                  if (selected.includes(opt)) {
                    onChange(selected.filter((s) => s !== opt));
                  } else {
                    onChange([...selected, opt]);
                  }
                }}
                className="form-checkbox h-4 w-4 text-teal-600 mr-2 accent-teal-500"
                onClick={e => e.stopPropagation()}
              />
              <span className="text-gray-800 dark:text-gray-200">{opt}</span>
            </label>
          ))}
        </div>
      )}
      {/* Chips for selected values */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((val) => (
            <span
              key={val}
              className="flex items-center bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm shadow-sm"
            >
              {val}
              <button
                type="button"
                className="ml-2 text-teal-500 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none"
                onClick={e => {
                  e.stopPropagation();
                  onChange(selected.filter((s) => s !== val));
                }}
                aria-label={`Remove ${val}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

interface FiltersProps {
  closeModal: () => void;
}

const Filters: React.FC<FiltersProps> = ({ closeModal }) => {
  const filtersStore = useFiltersStore();
  const [filter, setFilter] = useState({
    source: filtersStore.source,
    destination: filtersStore.destination,
    travelDate: filtersStore.travelDate,
    inclusions: filtersStore.inclusions,
    theme: filtersStore.theme,
    no_of_days: filtersStore.no_of_days,
    travelers: filtersStore.travelers,
    nationality: filtersStore.nationality,
    visaRequirement: filtersStore.visaRequirement,
    tripType: filtersStore.tripType,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Sync no_of_days.location_wise with destination if set from outside (e.g., query)
  React.useEffect(() => {
    setFilter(f => {
      // If destinations are set but location_wise is empty or out of sync, fix it
      const dests = f.destination;
      if (!dests.length) return f;
      const currentLocs = f.no_of_days.location_wise.map(obj => Object.keys(obj)[0]);
      // If already in sync, do nothing
      if (dests.length === currentLocs.length && dests.every(d => currentLocs.includes(d))) return f;
      // Build new location_wise array, preserving values if possible
      const newLocationWise = dests.map(dest => {
        const prev = f.no_of_days.location_wise.find(obj => Object.keys(obj)[0] === dest);
        return prev ? prev : { [dest]: 1 };
      });
      const total = newLocationWise.reduce((sum, obj) => sum + Object.values(obj)[0], 0);
      return {
        ...f,
        no_of_days: { location_wise: newLocationWise, total },
      };
    });
  }, [filter.destination]);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.relative')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="max-h-[80vh] overflow-y-auto p-1 flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex-shrink-0">Advanced Search</h2>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">
          {/* Going from */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Going from</label>
            <CustomAutocomplete
              value={filter.source}
              onChange={val => setFilter(f => ({ ...f, source: val }))}
              suggestions={async (query) => {
                try {
                  const response = await API.get(`/amadeus/locations?keyword=${query}`);
                  return response.data;
                } catch {
                  return [];
                }
              }}
              placeholder="Search source..."
              inputClassName="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              dropdownClassName="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
            />
          </div>
          {/* Going To (multi select dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Going To</label>
            <MultiSelectDropdown
              options={destinationOptions}
              selected={filter.destination}
              onChange={val => setFilter(f => {
                // Build new location_wise array: 1 night per destination by default
                const newLocationWise = val.map(dest => {
                  // Try to preserve previous value if exists
                  const prev = f.no_of_days.location_wise.find(obj => Object.keys(obj)[0] === dest);
                  return prev ? prev : { [dest]: 1 };
                });
                // Remove any locations that are no longer selected
                const total = newLocationWise.reduce((sum, obj) => sum + Object.values(obj)[0], 0);
                return {
                  ...f,
                  destination: val,
                  no_of_days: { location_wise: newLocationWise, total },
                };
              })}
              placeholder="Select destinations"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownKey="destination"
            />
          </div>
          {/* Travel Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
            <input
              type="date"
              value={filter.travelDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setFilter(f => ({ ...f, travelDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
            {/* No of Nights per Destination */}
          {filter.destination.length > 0 && (
            <div>
              <label className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-2">No. of Nights per Destination</label>
              <div className="flex flex-col gap-2 justify-between">
                {filter.destination.map((dest: string) => {
                  // Find value in location_wise
                  const nights = (filter.no_of_days.location_wise.find((obj: { [key: string]: number }) => Object.keys(obj)[0] === dest)?.[dest]) || 1;
                  return (
                    <div key={dest} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-200 w-48 truncate">{dest}</span>
                      <div>
                      <input
                        type="number"
                        min={1}
                        value={nights}
                        onChange={e => {
                          const newVal = Number(e.target.value);
                          setFilter(f => {
                            const updated = f.no_of_days.location_wise.map((obj: { [key: string]: number }) =>
                              Object.keys(obj)[0] === dest ? { [dest]: newVal } : obj
                            );
                            // Update total as sum
                            const total = updated.reduce((sum: number, obj: { [key: string]: number }) => sum + Object.values(obj)[0], 0);
                            return {
                              ...f,
                              no_of_days: { location_wise: updated, total },
                            };
                          });
                        }}
                        className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">night(s)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Inclusions (multi select dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select inclusions</label>
            <MultiSelectDropdown
              options={inclusionsOptions}
              selected={filter.inclusions}
              onChange={val => setFilter(f => ({ ...f, inclusions: val }))}
              placeholder="Select inclusions"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownKey="inclusions"
            />
          </div>
          {/* Theme/Interests (multi select dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme/Interests</label>
            <MultiSelectDropdown
              options={themeOptions}
              selected={filter.theme}
              onChange={val => setFilter(f => ({ ...f, theme: val }))}
              placeholder="Select themes/interests"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownKey="theme"
            />
          </div>
          {/* Trip type (single select) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trip Type</label>
            <select
              value={filter.tripType}
              onChange={e => setFilter(f => ({ ...f, tripType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">Select trip type</option>
              {tripTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>        
          {/* No. of Travelers (adults, children, infants) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. of Travelers</label>
            <div className="flex gap-4">
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Adults</span>
                <input type="number" min={1} value={filter.travelers.adults} onChange={e => setFilter(f => ({ ...f, travelers: { ...f.travelers, adults: Number(e.target.value) } }))} className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Children</span>
                <input type="number" min={0} value={filter.travelers.child} onChange={e => setFilter(f => ({ ...f, travelers: { ...f.travelers, child: Number(e.target.value) } }))} className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Infants</span>
                <input type="number" min={0} value={filter.travelers.infants} onChange={e => setFilter(f => ({ ...f, travelers: { ...f.travelers, infants: Number(e.target.value) } }))} className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
              </div>
            </div>
          </div>
          {/* Nationality (autocomplete) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nationality</label>
            <select
              value={filter.nationality}
              onChange={e => setFilter(f => ({ ...f, nationality: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">Select nationality</option>
              {nationalityOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Visa requirement (boolean) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visa Requirement</label>
            <input
              type="checkbox"
              checked={filter.visaRequirement}
              onChange={e => setFilter(f => ({ ...f, visaRequirement: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-gray-700 dark:text-gray-300">Required</span>
          </div>
        </div>
      </div>
      {/* Apply/Cancel/Close Buttons */}
      <div className="flex justify-end gap-4 mt-6 flex-shrink-0">
        <button
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
          onClick={() => {
            setOpenDropdown(null);
            closeModal();
          }}
        >
          Close
        </button>
        <button
          className="px-6 py-2 bg-teal-500 text-white rounded-lg"
          onClick={() => {
            filtersStore.setFilters(filter);
            setOpenDropdown(null);
            closeModal();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;