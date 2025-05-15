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
      return {
        ...state,
        ...filters
      };
    }),
}));
