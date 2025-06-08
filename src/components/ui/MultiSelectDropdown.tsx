import React from 'react';


const MultiSelectDropdown: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  openDropdown: string | null;
  setOpenDropdown: (key: string | null) => void;
  dropdownKey: string;
  isMobile?: boolean | false;
  mode?: string | "default";
}> = ({ options, selected, onChange, placeholder, openDropdown, setOpenDropdown, dropdownKey, isMobile, mode="default" }) => {
  const open = openDropdown === dropdownKey;

  return (
    <div className="relative w-full">
      <div
        className="w-full px-4 py-3 border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
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
      {mode == "default" && selected.length > 0 && (
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

{/*       
      {mode.toLowerCase() === "searchbar" && (    
        <div className={`flex ${isMobile ? '' : 'flex-row'} justify-between`}>
                <div className={`flex flex-wrap gap-2 m-2 text-left ${isMobile ? 'flex-2' : 'flex-1'}`}>
                    {selected.length > 0 && selected.map((val) => (
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
        </div>
      )} */}
    </div>
  );
};

export default MultiSelectDropdown;