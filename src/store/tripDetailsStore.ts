import { create } from 'zustand';
// import tripDetailsData from '../data/tripDetailsV3.json';
import {
  TripDetails,
  TripDetailsState
} from '../types/tripDetailsTypes';

export const useTripDetailsStore = create<TripDetailsState>((set) => ({
  tripDetails: {} as TripDetails,
  // tripDetails: tripDetailsData as unknown as TripDetails,
  setTripDetails: (data) => set({ tripDetails: data }),
}));
