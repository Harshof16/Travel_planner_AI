import React, { useState } from 'react';
import { useFiltersStore } from '../../store/filtersStore';
import CustomAutocomplete from '../ui/CustomAutocomplete';
import API from '../../apis/axios';
import MultiSelectDropdown from '../ui/MultiSelectDropdown';
import { FiltersState } from '../../types/filtersTypes';

const inclusionsOptions = ['Flight', 'Hotel', 'Sightseeing', 'Transfer', 'Meal'];
const themeOptions = ['Beach', 'Adventure', 'Wildlife', 'Shopping', 'Honeymoon', 'Family', 'Culture'];
const tripTypeOptions = ['solo', 'couple', 'family', 'friends'];

interface FiltersProps {
  closeModal: () => void;
  filtersStore: FiltersState;
}

const Filters: React.FC<FiltersProps> = ({ closeModal, filtersStore }) => {
  // const filtersStore = useFiltersStore();
  // console.log('Filters component rendered with store:', filtersStore);
  
  const [filter, setFilter] = useState({
    source: filtersStore.source ? filtersStore.source : '',
    destination: filtersStore.destination ? filtersStore.destination : [],
    travelDate: filtersStore.travelDate ? filtersStore.travelDate : '',
    inclusions: filtersStore.inclusions ? filtersStore.inclusions : [],
    theme: filtersStore.theme ? filtersStore.theme : [],
    no_of_days: filtersStore.no_of_days ? filtersStore.no_of_days : { location_wise: [], total: 0 },
    travelers: filtersStore.travelers ? filtersStore.travelers : { adults: 0, child: 0, infants: 0 },
    nationality: filtersStore.nationality ? filtersStore.nationality : '',
    visaRequirement: filtersStore.visaRequirement !== undefined ? filtersStore.visaRequirement : false,
    tripType: filtersStore.tripType ? filtersStore.tripType : '',
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [destinationInput, setDestinationInput] = useState("");

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
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex-shrink-0">Advance Filters</h2>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-8">
          {/* Going from */}
          <div className='gap-4'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departure City</label>
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
          {/* Going To (autocomplete chips) */}
          <div className='gap-4'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destinatios</label>
            <CustomAutocomplete
              value={destinationInput}
              onChange={val => {
                // Only set on explicit selection (onSelectSuggestion)
                setDestinationInput(val);
              }}
              suggestions={async (query) => {
                try {
                  const response = await API.get(`/amadeus/locations?keyword=${query}`);
                  return response.data;
                } catch {
                  return [];
                }
              }}
              onSelectSuggestion={val => {
                if (val && !filter.destination.includes(val)) {
                  setFilter(f => {
                    const newDest = [...f.destination, val];
                    const newLocationWise = newDest.map(dest => {
                      const prev = f.no_of_days.location_wise.find(obj => Object.keys(obj)[0] === dest);
                      return prev ? prev : { [dest]: 1 };
                    });
                    const total = newLocationWise.reduce((sum, obj) => sum + Object.values(obj)[0], 0);
                    return {
                      ...f,
                      destination: newDest,
                      no_of_days: { location_wise: newLocationWise, total },
                    };
                  });
                }
                setDestinationInput(""); // Clear input after selection
              }}
              placeholder="Search and add destinations..."
              inputClassName="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              dropdownClassName="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
            />
            {/* Chips for selected destinations */}
            {filter.destination.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {filter.destination.map((val) => (
                  <span
                    key={val}
                    className="flex items-center bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    {val}
                    <button
                      type="button"
                      className="ml-2 text-teal-500 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none"
                      onClick={() => {
                        setFilter(f => {
                          const newDest = f.destination.filter((s) => s !== val);
                          const newLocationWise = f.no_of_days.location_wise.filter(obj => Object.keys(obj)[0] !== val);
                          const total = newLocationWise.reduce((sum, obj) => sum + Object.values(obj)[0], 0);
                          return {
                            ...f,
                            destination: newDest,
                            no_of_days: { location_wise: newLocationWise, total },
                          };
                        });
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
          {/* Travel Date */}
          <div className='gap-4'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
            <input
              type="date"
              value={filter.travelDate}
              min={new Date().toISOString().split('T')[0]}
              onClick={(e) => e.currentTarget.showPicker() }
              onChange={e => setFilter(f => ({ ...f, travelDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
          {/* No of Nights per Destination */}
          {filter.destination.length > 0 && (
            <div className='gap-4'>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. of Nights per Destination</label>
              <div className="flex flex-col gap-2 justify-between">
                {filter.destination.map((dest: string) => {
                  const nights = (filter.no_of_days.location_wise.find((obj: { [key: string]: number }) => Object.keys(obj)[0] === dest)?.[dest]) || 1;

                  const updateNights = (newVal: number) => {
                    setFilter(f => {
                      const updated = f.no_of_days.location_wise.map((obj: { [key: string]: number }) =>
                        Object.keys(obj)[0] === dest ? { [dest]: newVal } : obj
                      );
                      const totalNights = updated.reduce((sum: number, obj: { [key: string]: number }) => sum + Object.values(obj)[0], 0);
                      const total = totalNights + 1;
                      
                      return {
                        ...f,
                        no_of_days: { location_wise: updated, total },
                      };
                    });
                  };

                  return (
                    <div key={dest} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-200 w-48 truncate">{dest}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => updateNights(Math.max(1, nights - 1))}
                          className="px-2 py-1 text-sm font-medium border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{nights}</span>
                        <button
                          type="button"
                          onClick={() => updateNights(nights + 1)}
                          className="px-2 py-1 text-sm font-medium border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          +
                        </button>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">night(s)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Inclusions (multi select dropdown) */}
          <div className="gap-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inclusions</label>
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
          <div className="gap-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interests</label>
            <MultiSelectDropdown
              options={themeOptions}
              selected={filter.theme}
              onChange={val => setFilter(f => ({ ...f, theme: val }))}
              placeholder="Select interests"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownKey="theme"
            />
          </div>
          {/* Trip type (single select) */}
          <div className="gap-4">
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
          <div className="gap-4">
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
          <div className="gap-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nationality</label>
            <CustomAutocomplete
              value={filter.nationality}
              onChange={val => setFilter(f => ({ ...f, nationality: val }))}
              suggestions={async (query) => {
                try {
                  const response = await API.get(`/amadeus/locations?keyword=${query}&subType=Country`);
                  return response.data;
                } catch {
                  return [];
                }
              }}
              placeholder="Search nationality..."
              inputClassName="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              dropdownClassName="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
            />
          </div>
          {/* Visa requirement (boolean) */}
          <div className="gap-4">
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
            // console.log('Filters applied:', filter);
            
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