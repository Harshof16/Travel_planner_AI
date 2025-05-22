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
  entry_requirements: string[];
  visa_type: string;
  validity: string;
  extension: string;
  special_notes: string;
}

export interface TravelTips {
  packing_tips: string[];
  local_experience_tips: string[];
  transportation_advice: string[];
  safety_tips: string[];
  tech_and_tools_recommendations: string[];
  cultural_tips: string[];
  health_and_wellness_tips: string[];
  food_and_dining_tips: string[];
  money_and_budgeting_tips: string[];
  language_and_communication_tips: string[];
  local_culture_tips: string[];
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
  smart_travel_hacks: TravelTips;
}

export interface TripDetailsState {
  tripDetails: TripDetails;
  setTripDetails: (data: TripDetails) => void;
}

export const TravelTipsConst = {
  packing_tips: "Packing Tips",
  local_experience_tips: "Local Experience Tips",
  transportation_advice: "Transportation Advice",
  safety_tips: "Safety Tips",
  tech_and_tools_recommendations: "Tech and Tools Recommendations",
  cultural_tips: "Cultural Tips",
  health_and_wellness_tips: "Health and Wellness Tips",
  food_and_dining_tips: "Food and Dining Tips",
  language_and_communication_tips: "Language and Communication Tips",
  local_culture_tips: "Local Culture Tips",
};