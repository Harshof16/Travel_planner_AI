import API from "../../apis/axios";
import { MapPin, Calendar, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomAutocomplete from '../ui/CustomAutocomplete';
import { FilterType } from "../../types/filtersTypes";

interface Params {
    type: string;
    source: string;
    destination: string[];
    date: string;
    nationality: string;
    no_of_days: string;
}
export default function TripToolkit() {
    const [activeTab, setActiveTab] = useState<FilterType>("package");
    const [userInputLocation, setUserInputLocation] = useState<string>("");
    const [params, setParams] = useState<Params>({
        type: "package",
        source: "",
        destination: [],
        date: "",
        nationality: "",
        no_of_days: "5"
    });
    const [userInputMonth, setUserInputMonth] = useState<string | undefined>(undefined);
    const [visaLeavingFrom, setVisaLeavingFrom] = useState("");
    const [visaTravelTo, setVisaTravelTo] = useState("");
    const [visaNationality, setVisaNationality] = useState("");
    const navigate = useNavigate();

    const tabs = [
        { label: "Trip Toolkit", url: 'package' },
        { label: "Visa Info", url: 'visa' },
        // { label: "Weather Watch", url: 'weather' },
        { label: "Smart Travel Hacks", url: 'hacks' }
    ];

    const fetchSuggestions = async (event: string, type: string) => {
        try {
            if (!type) {
                type = 'Location';
            }
            console.log(`Fetching suggestions for ${event} with type ${type}`);
            
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
            <div className="flex flex-col flex-1">
                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Destinations</label>
                <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                    <CustomAutocomplete
                        value={userInputLocation}
                        onChange={(val) => {
                            setUserInputLocation(val);
                        }}
                        suggestions={(query) => fetchSuggestions(query, 'Location')}
                        placeholder="Search destinations..."
                        onSelectSuggestion={(val) => {
                            if (val && !params.destination.includes(val)) {
                                setParams(prev => ({
                                    ...prev,
                                    destination: [...prev.destination, val]
                                }));
                            }
                            setUserInputLocation("");
                        }}
                    />
                </div>
            </div>

            {/* Month Selector (now Date Picker) */}
            <div className="flex flex-col flex-1">
                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Travel Date</label>
                <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg relative dark:bg-gray-700">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                    <input
                        type="date"
                        className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200 appearance-none cursor-pointer px-2"
                        value={userInputMonth || ""}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            setUserInputMonth(e.target.value);
                            setParams(prev => ({
                                ...prev,
                                date: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
        </>

    const visaUI = <>
        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Nationality</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                {/* <input
                    type="text"
                    placeholder="Brisbane"
                    value={visaNationality}
                    onChange={e => setVisaNationality(e.target.value)}
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                /> */}
                <CustomAutocomplete
                    value={visaNationality}
                    onChange={(val) => setVisaNationality(val)}
                    suggestions={(query) => fetchSuggestions(query, 'Country')}
                    placeholder="Search country..."
                    onSelectSuggestion={(val) => setVisaNationality(val)}
                />
            </div>
        </div>
        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Departure City</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                {/* <input
                    type="text"
                    placeholder="Brisbane"
                    value={visaLeavingFrom}
                    onChange={e => setVisaLeavingFrom(e.target.value)}
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                /> */}
                <CustomAutocomplete
                    value={visaLeavingFrom}
                    onChange={(val) => setVisaLeavingFrom(val)}
                    suggestions={(query) => fetchSuggestions(query, 'Location')}
                    placeholder="Search city..."
                    onSelectSuggestion={(val) => setVisaLeavingFrom(val)}
                />
            </div>
        </div>
        <div className="flex flex-col flex-1">
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
                    suggestions={(query) => fetchSuggestions(query, 'Location')}
                    placeholder="Search destination..."
                    onSelectSuggestion={(val) => setVisaTravelTo(val)}
                />
            </div>
        </div>
    </>

    // Clear input fields when switching tabs
    const handleTabSwitch = (tab: FilterType) => {
        setActiveTab(tab);
        setUserInputLocation("");
        setUserInputMonth(undefined);
        setVisaLeavingFrom("");
        setVisaTravelTo("");
        setVisaNationality("");
        setParams({
            type: tab,
            source: "",
            destination: [],
            date: "",
            nationality: "",
            no_of_days: "5"
        });
    };

    const handleSearch = () => {
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
        
        // console.log(`Navigating to /trips?${query}`);
        
        navigate(`/trips?${query}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-16">
            {/* Tabs */}
            <div className="flex to-white overflow-hidden gap-2 justify-start">
                {tabs.map((tab) => (
                    <button
                        key={tab.url}
                        onClick={() => handleTabSwitch(tab.url as FilterType)}
                        className={`px-10 py-2 text-sm font-semibold rounded-t-2xl transition-all
                    ${activeTab === tab.url
                                ? "bg-teal-100 text-teal-700 shadow-md dark:bg-teal-900 dark:text-teal-300 font-bold"
                                : "text-gray-600 hover:text-teal-700 bg-teal-50 dark:text-gray-300 dark:bg-gray-700"
                            }
                    rounded-t-md
                `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search Section */}
            <div className="bg-white p-8 rounded-bl-xl rounded-tr-xl rounded-br-xl shadow-md dark:bg-gray-800 dark:text-gray-200">
                <div className="flex flex-wrap gap-6 items-end">
                    {activeTab !== 'visa' && toolkitUI}
                    {activeTab === 'visa' && visaUI}

                    {/* Search Button */}
                    <div className="flex justify-center md:justify-end mt-4 md:mt-0 flex-[0_0_1]">
                        <button 
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors 
                            ${(params.destination.length === 0 )? 'bg-teal-700/60 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500'}`} 
                          onClick={handleSearch} 
                          disabled={params.destination.length === 0}
                        >
                          <Search className="w-5 h-5" />
                          Search
                        </button>
                    </div>
                </div>
                {/* Chips for selected destinations */}
                <div className="flex flex-wrap gap-2 m-2">
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
            </div>
        </div>
    );
}
