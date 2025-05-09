import API from "../../apis/axios";
import { MapPin, Calendar, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomAutocomplete from '../ui/CustomAutocomplete';

export default function TripToolkit() {
    const [activeTab, setActiveTab] = useState<'trip' | 'visa' | 'weather' | 'hacks'>("trip");
    const [userInputLocation, setUserInputLocation] = useState("");
    const [userInputMonth, setUserInputMonth] = useState("January");
    const navigate = useNavigate();

    const tabs = [
        { label: "Trip Toolkit", url: 'trip' }, { label: "Visa Info", url: 'visa' }, { label: "Weather Watch", url: 'weather' }, { label: "Smart Travel Hacks", url: 'hacks' }];

    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"]

    const fetchSuggestions = async (event: string) => {
        try {
            const response = await API.get(`/amadeus/locations?keyword=${event}`,);
            return response.data
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const toolkitUI = <>
        {/* Location Input */}
        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Location</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <CustomAutocomplete
                    value={userInputLocation}
                    onChange={setUserInputLocation}
                    suggestions={fetchSuggestions}
                    placeholder="Search location..."
                />
            </div>
        </div>

        {/* Month Selector */}
        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Month</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg relative dark:bg-gray-700">
                <Calendar className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <select
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200 appearance-none cursor-pointer px-2"
                    value={userInputMonth}
                    onChange={(e) => setUserInputMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option
                            key={month}
                            value={month}
                            className="px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
                        >
                            {month}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none dark:text-gray-500">
                    ▼
                </div>
            </div>
        </div></>

    const visaInfoUI = <>
        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Leaving From</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Brisbane"
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                />
            </div>
        </div>

        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Travel To</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Brisbane"
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                />
            </div>
        </div>

        <div className="flex flex-col flex-1">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Nationality</label>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Brisbane"
                    className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                />
            </div>
        </div>
    </>

    const handleSearch = () => {
        const query = `type=${activeTab}&location=${userInputLocation}&month=${userInputMonth}`;
        navigate(`/trips?${query}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-16">
            {/* Tabs */}
            <div className="flex to-white overflow-hidden gap-2 justify-start">
                {tabs.map((tab) => (
                    <button
                        key={tab.url}
                        onClick={() => setActiveTab(tab.url as 'trip' | 'visa' | 'weather' | 'hacks')}
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
                    {activeTab === 'visa' && visaInfoUI}

                    {/* Search Button */}
                    <div className="flex justify-center md:justify-end mt-4 md:mt-0 flex-[0_0_1]">
                        <button 
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors 
                            ${!userInputLocation ? 'bg-teal-700/60 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500'}`} 
                          onClick={handleSearch} 
                          disabled={!userInputLocation}
                        >
                          <Search className="w-5 h-5" />
                          Search
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
