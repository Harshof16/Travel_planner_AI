import { create } from 'zustand';
import { FiltersState } from '../types/filtersTypes';

const initialFilters: Omit<FiltersState, 'setFilters'> = {
  type: '',
  source: '',
  destination: [],
  travelDate: '',
  inclusions: [],
  theme: [],
  no_of_days: { location_wise: [], total: 0 },
  travelers: { adults: 0, child: 0, infants: 0 },
  nationality: '',
  visaRequirement: false,
  tripType: '',
};

export const useFiltersStore = create<FiltersState>()((set) => ({
  ...initialFilters,
  setFilters: (filters) =>
    set((state) => {
      console.log('Filters:', filters);
      console.log("dasdasdkjashdj", typeof filters.destination);
      
      
      if (
        filters.destination &&
        filters.destination.length > 0 &&
        filters.destination.length < 2 &&
        typeof filters.destination[0] === 'string'
      ) {
        filters.destination = JSON.parse(filters.destination[0]);
      }
      
      return {
        ...state,
        ...filters
      };
    }),
}));
