import { MapPin, Calendar, Search } from "lucide-react";
import { useState } from "react";

export default function TripToolkit() {
    const [activeTab, setActiveTab] = useState("Trip Toolkit");

    const tabs = ["Trip Toolkit", "Visa Info", "Weather Watch", "Smart Travel Hacks"];

    return (
        <div className="w-full max-w-7xl mx-auto mt-16">
            {/* Tabs */}
            <div className="flex to-white overflow-hidden gap-2 justify-start">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-10 py-2 text-sm font-semibold rounded-t-2xl transition-all
                    ${activeTab === tab
                                ? "bg-white text-teal-700 shadow-md dark:bg-teal-900 dark:text-teal-300"
                                : "text-gray-600 hover:text-teal-700 bg-teal-50 dark:text-gray-300 dark:bg-gray-700"
                            }
                    rounded-t-md
                `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search Section */}
            <div className="bg-white p-8 rounded-bl-xl rounded-tr-xl rounded-br-xl shadow-md dark:bg-gray-800 dark:text-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    {/* Location Input */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Location</label>
                        <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                            <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                            <input
                                type="text"
                                placeholder="Brisbane"
                                className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200"
                            />
                        </div>
                    </div>

                    {/* Month Selector */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Month</label>
                        <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg relative dark:bg-gray-700">
                            <Calendar className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
                            <select className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200 appearance-none">
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                {/* More months */}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none dark:text-gray-500">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center md:justify-end mt-4 md:mt-0 ">
                        <button className="flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow dark:bg-teal-600 dark:hover:bg-teal-500">
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
