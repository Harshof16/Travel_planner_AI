import React, { useState, useRef } from 'react';

interface Suggestion {
  name: string;
  [key: string]: string | number | boolean; // Allow any other properties
}

interface CustomAutocompleteProps {
  suggestions: (query: string) => Promise<Suggestion[]>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const debounce = <T extends (arg: string) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: [string]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  suggestions,
  value,
  onChange,
  placeholder = "Search...",
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const debouncedFetchSuggestions = useRef(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setFilteredSuggestions([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        const results = await suggestions(query);
        setFilteredSuggestions(results);
        setIsDropdownVisible(results.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions", error);
        setFilteredSuggestions([]);
        setIsDropdownVisible(false);
      }
    }, 300)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    debouncedFetchSuggestions(inputValue); // Only call the debounced function
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onChange(suggestion.name);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 border-none rounded-lg focus:ring-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
      />
      {isDropdownVisible && (
        <ul className="absolute z-100 w-full bg-white dark:bg-gray-800 dark:border-none rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-left text-gray-700 px-4 py-2 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-300"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAutocomplete;
