import WeatherForecast from './WeatherForecast';
import Itinerary from './Itinerary';
import HandpickedForYou from './HandpickedForYou';
import { useTripDetailsStore } from '../../store/tripDetailsStore';
import VisaRequirements from './VisaRequirements';
import TripNotes from './TripNotes';
import { useFiltersStore } from '../../store/filtersStore';
import { useEffect } from 'react';
import TripMap from './TripMap';
import TripHeader from './TripHeader';
import API from '../../apis/axios';
import { FilterType } from '../../types/filtersTypes';

const TripDetails = () => {
    const tripDetails = useTripDetailsStore((state) => state.tripDetails);
    const setTripDetails = useTripDetailsStore((state) => state.setTripDetails);
    const filters = useFiltersStore();
    const setFilters = useFiltersStore((state) => state.setFilters);

    console.log('filters:', filters);

    useEffect(() => {
        const {
            type,
            tripType,
            source,
            destination,
            travelDate,
            no_of_days,
            inclusions,
            theme,
            travelers,
            visaRequirement,
            nationality
        } = filters;

        const payload = {
            type,
            source,
            destination,
            travel_date: travelDate,
            no_of_days,
            inclusion: inclusions,
            theme,
            traveling_persons: {
            count: {
                adults: travelers.adults,
                child: travelers.child,
                infants: travelers.infants
            },
            },
            trip_type: tripType,
            visa_requirement: visaRequirement,
            nationality,
        };
        console.log('Payload:', payload);
        const fetchTripDetails = async () => {
            try {
                const response = await API.post('/proposals/AIsuggestion', payload);
                setTripDetails(response.data);
                console.log('Trip details:', response.data);
            } catch (error) {
                console.error('Error fetching trip details:', error);
            }
        };

        fetchTripDetails();
        // eslint-disable-next-line 
    }, [filters]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type')?.replace(/\s+/g, '') as FilterType || '';
        const source = params.get('source')?.replace(/\s+/g, '') || '';
        const destinationRaw = params.get('destination')?.replace(/\s+/g, '') || '';
        const date = params.get('date')?.replace(/\s+/g, '') || '';
        const nationality = params.get('nationality')?.replace(/\s+/g, '') || '';

        if (type || source || destinationRaw || date || nationality) {
            setFilters({
                ...(type && { type }),
                ...(source && { source }),
                ...(destinationRaw && { destination: [destinationRaw] }),
                ...(date && { travelDate: date }),
                ...(nationality && { nationality }),
            });
        }

        return () => {
            setFilters({
                type: '',
                source: '',
                destination: [],
                travelDate: '',
                no_of_days: { location_wise: [], total: 0 },
                inclusions: [],
                theme: [],
                travelers: { adults: 0, child: 0, infants: 0 },
                visaRequirement: false,
                nationality: '',
                tripType: '',
            });
        };
    }, [setFilters]);

    return (
        <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{tripDetails.title || 'Trip Details'}</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <TripHeader tripTitle={tripDetails.title} tripDescription={tripDetails.description}/>
                <div className="container mx-auto" id="trip-details-content">
                    <WeatherForecast />
                    {tripDetails?.days && <Itinerary days={tripDetails.days} />}
                    {tripDetails?.top_recommendations && <HandpickedForYou recommendations={tripDetails.top_recommendations} />}
                    {tripDetails?.visa_requirements && <VisaRequirements requirements={tripDetails.visa_requirements} />}
                    {tripDetails?.notes && <TripNotes notes={tripDetails.notes} />}
                    {filters.destination.length > 0 && <TripMap />}
                </div>
            </div>
        </div>
    )
}

export default TripDetails;