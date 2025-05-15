// Trip Details related types

export interface Transportation {
  from: string;
  to: string;
  mode: string;
}

export interface Schedule {
  time_of_day: string;
  activities: string[];
}

export interface Day {
  day: number;
  title: string;
  schedule: Schedule[];
  transportation: Transportation[];
  accommodation: string;
}

export interface VisaRequirement {
  country: string;
  requirement: string;
}

export interface TopRecommendations {
  accommodations: string[];
  activities: string[];
}

export interface TripDetails {
  title: string;
  description?: string;
  days: Day[];
  notes: string[];
  top_recommendations: TopRecommendations;
  visa_requirements: VisaRequirement[];
}

export interface TripDetailsState {
  tripDetails: TripDetails;
  setTripDetails: (data: TripDetails) => void;
}
