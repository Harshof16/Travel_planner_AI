// Filters related types

export interface Travelers {
  adults: number;
  child: number;
  infants: number;
}

export interface no_of_days {
  location_wise: { [location: string]: number }[];
  total: number;
}

export type FilterType = 'package' | 'visa' | 'weather' | 'hacks' | '';

export interface FiltersState {
  type: FilterType;
  source: string;
  destination: string[];
  travelDate: string;
  inclusions: string[];
  theme: string[];
  no_of_days: no_of_days;
  travelers: Travelers;
  nationality: string;
  visaRequirement: boolean;
  tripType: string;
  setFilters: (filters: Partial<Omit<FiltersState, 'setFilters'>>) => void;
}
