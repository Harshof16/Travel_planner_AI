import API from "../../apis/axios";
import { MapPin, Calendar, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CustomAutocomplete from '../ui/CustomAutocomplete';
import { FiltersState, FilterType } from "../../types/filtersTypes";
import { useFiltersStore } from '../../store/filtersStore';
import MultiSelectDropdown from "../ui/MultiSelectDropdown";

const inclusionsOptions = ['Flight', 'Hotel', 'Sightseeing', 'Transfer', 'Meal'];

interface Params {
    type: string;
    source: string;
    destination: string[];
    date: string;
    nationality: string;// Optional for no of days
    trip_type?: string; // Optional for visa type
    [key: string]: string | string[] | undefined; // Allow additional properties
}
export default function TripToolkit({ toggleFilters, filters }: { toggleFilters: () => void; filters: FiltersState;}) {

    const [isMobile, setIsMobile] = useState(false);
    const [params, setParams] = useState<FiltersState>({
        ...filters
    });
    
    const [activeTab, setActiveTab] = useState<string>(params.type || "package");
    const [userInputLocation, setUserInputLocation] = useState<string[]>(params.destination);
    // const [userInputMonth, setUserInputMonth] = useState<string | undefined>(params.date || undefined);
    const [visaLeavingFrom, setVisaLeavingFrom] = useState(params.source || "");
    const [visaTravelTo, setVisaTravelTo] = useState(params.destination || "");
    
    useEffect(() => {
        const locationUpdatedDays = filters.destination.map((dest: string) => {
            // Find if location_wise has an entry for this destination
            const found = filters.no_of_days.location_wise.find((obj: { [key: string]: number }) => Object.keys(obj)[0] === dest);
            // If found, use it; otherwise, default to { [dest]: 1 }
            return found ? found : { [dest]: 1 };
        });

        const totalDays = filters.no_of_days.total > 0 ? filters.no_of_days.total : filters.destination.length; // Default to 5 if not set

        setParams({
            type: filters.type || "package",
            source: filters.source || "",
            destination: filters.destination || [],
            travelDate: filters.travelDate || "",
            inclusions: filters.inclusions || [],
            theme: filters.theme || "",
            no_of_days: {
                location_wise: locationUpdatedDays,
                total: totalDays,
            },
            travelers: filters.travelers || { adults: 1, child: 0, infants: 0 },
            nationality: filters.nationality || "",
            visaRequirement: filters.visaRequirement || 0,
            tripType: filters.tripType || "",
        });

        setActiveTab(filters.type || "package");
        setUserInputLocation(filters.destination || []);
        // setUserInputMonth(filters.travelDate || undefined);
        setVisaLeavingFrom(filters.source || "");
        setVisaTravelTo(filters.destination || "");


    }, [filters]);



    // const [visaNationality, setVisaNationality] = useState(params.nationality || "");
    // const navigate = useNavigate();
    // const filtersStore = useFiltersStore();
    //   const [filter, setFilter] = useState({
    //     source: filtersStore.source,
    //     destination: filtersStore.destination,
    //     travelDate: filtersStore.travelDate,
    //     inclusions: filtersStore.inclusions,
    //     theme: filtersStore.theme,
    //     no_of_days: filtersStore.no_of_days,
    //     travelers: filtersStore.travelers,
    //     nationality: filtersStore.nationality,
    //     visaRequirement: filtersStore.visaRequirement,
    //     tripType: filtersStore.tripType,
    //   });
      const [openDropdown, setOpenDropdown] = useState<string | null>();

    useEffect(() => {
        const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // useEffect(() => {
    //     // Update params when filters store changes
    //     setParams({
    //         type: filters.type || "package",
    //         source: filters.source || "",
    //         destination: filters.destination || [],
    //         date: filters.travelDate || "",
    //         nationality: filters.nationality || "",
    //         no_of_days: filters.no_of_days || "5",
    //         trip_type: filters.tripType || "Tourist Visa"
    //     });
    //     setActiveTab(filters.type || "package");
    //     // setUserInputLocation("");
    //     // setUserInputMonth(filters.travelDate || undefined);
    //     setVisaLeavingFrom(filters.source || "");
    //     setVisaTravelTo(filters.destination || "");
    //     // setVisaNationality(filters.nationality || "");
    // }, [filters]);
    const tabs = [
        { label: "Itinerary", url: 'package' },
        { label: "Visa Info", url: 'visa' },
        // { label: "Weather Watch", url: 'weather' },
        { label: "Smart Travel Hacks", url: 'hacks' }
    ];

    const fetchSuggestions = async (event: string, type: string) => {
        try {
            if (!type) {
                type = 'Location';
            }
            
            if (!event) {
                return [];
            }
            const response = await API.get(`/amadeus/locations?keyword=${event}&subType=${type}`);
            return response.data
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const toolkitUI = <>
        {/* Destinations Input */}
            <div className={`flex flex-col ${isMobile ? 'flex-2' : 'flex-1'}`}>
                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Departure City</label>
                <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                    <CustomAutocomplete
                        value={visaLeavingFrom}
                        onChange={(val) => {
                            setVisaLeavingFrom(val);
                        }}
                        suggestions={(query) => fetchSuggestions(query, 'Locations')}
                        placeholder="Type city name..."
                        onSelectSuggestion={(val) => {
                            if (val) {
                                setParams(prev => ({
                                    ...prev,
                                    source: val,
                                }));
                            }
                        }}
                    />
                </div>
            </div>

            {/* Inclusions (multi select dropdown) */}
            <div className={`${isMobile ? 'ruby w-full' : 'flex flex-col flex-1'}`}>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inclusions</label>
                <MultiSelectDropdown
                    options={inclusionsOptions}
                    selected={params.inclusions}
                    onChange={val => setParams(f => ({ ...f, inclusions: val }))}
                    placeholder="Select inclusions"
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    dropdownKey="inclusions"
                    isMobile={isMobile}
                    mode= "searchBar"
                />
            </div>
        </>

    const visaUI = <>
        <div className={`flex flex-col ${isMobile ? 'flex-2' : 'flex-1'}`}>
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Visa type</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <select
                    value={params.tripType || "Tourist Visa"}
                    onChange={(e) => setParams(prev => ({
                        ...prev,
                        tripType: e.target.value
                    }))}
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Business Visa">Business Visa</option>
                </select>
            </div>
        </div>
        <div className={`flex flex-col ${isMobile ? 'flex-2' : 'flex-1'}`}>
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Destinations</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                {/* <input
                    type="text"
                    placeholder="Brisbane"
                    value={visaTravelTo}
                    onChange={e => setVisaTravelTo(e.target.value)}
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                /> */}
                <CustomAutocomplete
                    value={visaTravelTo}
                    onChange={(val) => setVisaTravelTo(val)}
                    suggestions={(query) => fetchSuggestions(query, 'Country')}
                    placeholder="Type country name..."
                    onSelectSuggestion={(val) => {
                        if (val && !params.destination.includes(val)) {
                            setParams(prev => ({
                                ...prev,
                                destination: [...prev.destination, val]
                            }));
                        }
                        setVisaTravelTo(val);
                    }}
                />
            </div>
        </div>
    </>


    const handleSearch = () => {
        
        filters.setFilters({
            ...filters,
            ...params
        });

        
        // const params: string[] = [];
        if (activeTab === 'package' || activeTab === 'weather' || activeTab === 'hacks') {
            // params.push(`type=${activeTab}`);
            // params.push(`destination=${userInputLocation}`);
            // params.push(`no_of_days={total:5}`);
            // if (userInputMonth) {
            //     params.push(`date=${userInputMonth}`);
            // }
        } else if (activeTab === 'visa') {
            // params.push(`type=visa`);
            // if (visaLeavingFrom) params.push(`source=${visaLeavingFrom}`);
            // if (visaTravelTo) params.push(`destination=${visaTravelTo}`);
            // if (visaNationality) params.push(`nationality=${visaNationality}`);
        }
        const query = Object.entries(params)
            .map(([key, value]) => {
                if (value === undefined || value === "") {
                    return "";
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(value) ? JSON.stringify(value) : value)}`;
            })
            .join('&');
        

        // console.log("Params in TripToolkit destinations:", params);
        // console.log(`Navigating to /trips?${query}`);
        
        // navigate(`/trips?${query}`);
    };

    return (
        <div className="w-full mx-auto mt-4">

            {/* Search Section */}
            <div className="bg-white px-8 pt-4 pb-8 rounded-xl shadow-md dark:bg-gray-800 dark:text-gray-200 border-l-4 border-yellow-500">
                
                {/* {params.destination.length === 0 && (
                    <div className="flex items-center mb-4 w-full">
                        <span className="w-full bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-3 py-2 rounded-full flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Let’s get moving! First pick a destination to kick off your dream trip.
                        </span>
                    </div>
                )} */}
                <div className="flex flex-wrap gap-6 items-end">
                    {activeTab !== 'visa' && toolkitUI}
                    {activeTab === 'visa' && visaUI}

                    {/* Search Button */}
                    <div className="flex flex-col item-center md:justify-end mt-4 md:mt-0 flex-[0_0_1]">
                            <button 
                            className={`px-6 py-3 border border-teal-500 dark:border-teal-400 rounded-lg text-teal-700 dark:text-teal-300 font-semibold bg-white dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors`} 
                            onClick={handleSearch}
                            >

                            Apply Filters
                            </button>

                    </div>
                </div>
                {/* Chips for selected destinations */}
                {isMobile && activeTab !== 'visa' && (
                    <div className="text-xs text-teal-500 dark:text-teal-200 hover:underline p-2 cursor-pointer" onClick={toggleFilters}>
                        Advance Filters
                    </div>
                )}
                <div className={`flex ${isMobile ? '' : 'flex-row'} justify-between`}>
                    {
                    // params.type === 'visa' && 
                    (
                        <div className={`flex flex-wrap gap-2 m-2 text-left ${isMobile ? 'flex-2' : 'flex-1'}`}>
                            {params.destination.length > 0 && params.destination.map((val) => (
                                <span
                                    key={val}
                                    className="flex items-center bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm shadow-sm"
                                >
                                    {val}
                                    <button
                                    type="button"
                                    className="ml-2 text-teal-500 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none"
                                    onClick={() => {
                                        setParams(prev => ({
                                            ...prev,
                                            destination: prev.destination.filter((s) => s !== val)
                                        }));
                                    }}
                                    aria-label={`Remove ${val}`}
                                    >
                                    &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    {params.type === 'package' && (
                        <div className={`flex flex-wrap gap-2 m-2 text-left ${isMobile ? 'flex-2' : 'flex-1'}`}>
                           {filters.inclusions.length > 0 && filters.inclusions.map((val : any) => (
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
                                        filters.setFilters({
                                            ...filters,
                                            inclusions: filters.inclusions.filter((s: any) => s.toLowerCase() !== val.toLowerCase())
                                        })
                                    }}
                                    aria-label={`Remove ${val}`}
                                    >
                                    &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    {!isMobile && activeTab !== 'visa' && (
                        <div className="text-xs text-teal-500 dark:text-teal-200 hover:underline p-2 text-end cursor-pointer" onClick={toggleFilters}>
                            Advance Filters
                        </div>
                    )}
                </div>

                {params.type === 'package' && (
                    <div className={`flex mt-6 ${isMobile ? 'flex-col gap-4' : 'flex-row gap-8'}`}>
                    {/* No. of Travelers */}
                    <div className={`flex flex-col ${isMobile ? 'flex-2' : 'flex-1'}`}>
                        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">No. of Travelers</label>
                        <div className="flex flex-wrap gap-4">
                        {[
                            { label: 'Adults', key: 'adults', min: 1 },
                            { label: 'Children', key: 'child', min: 0 },
                            { label: 'Infants', key: 'infants', min: 0 },
                        ].map(({ label, key, min }) => (
                            <div key={key}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400">{label}</span>
                            <input
                                type="number"
                                min={min}
                                value={params.travelers[key]}
                                onChange={e => setParams(f => ({
                                ...f,
                                travelers: { ...f.travelers, [key]: Number(e.target.value) }
                                }))}
                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            />
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* No. of Nights per Destination */}
                    <div className={`flex flex-col ${isMobile ? 'flex-2' : 'flex-1'}`}>
                        {params.destination.length > 0 && (
                        <>
                            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">No. of Nights per Destination</label>
                            <div className="flex flex-col gap-3">
                            {params.destination.map((dest: string) => {
                                const nights = (params.no_of_days.location_wise.find((obj: { [key: string]: number }) => Object.keys(obj)[0] === dest)?.[dest]) || 1;
                                // console.log("Nights object for destination:", params.no_of_days);
                                
                                // console.log("Nights for destination:", dest, "is", nights);
                                // console.log("Nights type:", typeof nights);

                                const updateNights = (newVal: number) => {
                                // console.log("New Nights for destination:", dest, "is", newVal);
                                // console.log("New Type:", typeof newVal);

                                setParams(f => {
                                    const updated = f.no_of_days.location_wise.map((obj: { [key: string]: number }) =>
                                        Object.keys(obj)[0] === dest ? { [dest]: newVal } : obj
                                    );
                                    const totalNights = updated.reduce((sum: number, obj: { [key: string]: number }) => sum + Object.values(obj)[0], 0);
                                    const total = totalNights;
                                    return {
                                    ...f,
                                    no_of_days: { location_wise: updated, total },
                                    };
                                });
                                };

                                return (
                                <div key={dest} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-200 w-48 truncate">{dest}</span>
                                    <div className="flex items-center space-x-1">
                                    <button
                                        type="button"
                                        onClick={() => updateNights(Math.max(1, nights - 1))}
                                        className="px-3 py-1 text-sm font-medium border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >-</button>
                                    <span className="w-6 text-center">{nights}</span>
                                    <button
                                        type="button"
                                        onClick={() => updateNights(nights + 1)}
                                        className="px-3 py-1 text-sm font-medium border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >+</button>
                                    {isMobile ? null :
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">night(s)</span>
                                    }
                                    </div>
                                </div>
                                );
                            })}
                            </div>
                        </>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
