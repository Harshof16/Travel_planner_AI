import React, { useState, useRef, useEffect } from 'react';

interface Suggestion {
  name: string;
  [key: string]: string | number | boolean; // Allow any other properties
}

interface CustomAutocompleteProps {
  suggestions: (query: string) => Promise<Suggestion[]>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSelectSuggestion?: (value: string) => void;
  inputClassName?: string;
  dropdownClassName?: string;
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
  onSelectSuggestion,
  inputClassName,
  dropdownClassName,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const justSelected = useRef(false);

  const debouncedFetchSuggestions = useRef(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setFilteredSuggestions([]);
        setIsDropdownVisible(true); // Show dropdown for 'no data found' case
        setIsLoading(false);
        setError(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const results = await suggestions(query);
        setFilteredSuggestions(results);
        setIsDropdownVisible(true);
        setIsLoading(false);
        if (!results || results.length === 0) setError('No data found');
      } catch {
        setFilteredSuggestions([]);
        setIsDropdownVisible(true);
        setIsLoading(false);
        setError('No data found');
      }
    }, 1000)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      onChange("");
      setFilteredSuggestions([]);
      setIsDropdownVisible(false);
      setError(null);
      setIsLoading(false);
      return;
    }
    onChange(inputValue);
    debouncedFetchSuggestions(inputValue); // Only call the debounced function
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    justSelected.current = true;
    onChange(suggestion.name);
    if (onSelectSuggestion) onSelectSuggestion(suggestion.name);
    setIsDropdownVisible(false);
  };

  const handleBlur = () => {
    if (justSelected.current) {
      justSelected.current = false;
      setIsDropdownVisible(false);
      return;
    }
    // If there are suggestions and value is not in them, clear
    if (filteredSuggestions.length > 0 && value && !filteredSuggestions.some(s => s.name === value)) {
      onChange("");
    }
    // If there are no suggestions and error is 'No data found', clear
    if (filteredSuggestions.length === 0 && error === 'No data found') {
      onChange("");
    }
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const inputElement = document.querySelector('.autocomplete-input');
    if (inputElement) {
      const rect = inputElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(spaceBelow < 300 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputClassName || "w-full px-4 border-none rounded-lg focus:ring-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none autocomplete-input"}
      />
      {isDropdownVisible && (
        <ul
          className={
            dropdownClassName ||
            `absolute z-100 w-full bg-white dark:bg-gray-800 dark:border-none rounded-lg shadow-lg max-h-48 ${
              dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`
          }
        >
          {isLoading && (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">Loading...</li>
          )}
          {!isLoading && error && (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">{error}</li>
          )}
          {!isLoading && !error && filteredSuggestions.length > 0 && filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="text-left text-gray-700 px-4 py-2 cursor-pointer hover:bg-teal-100 dark:text-gray-300 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-300"
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
