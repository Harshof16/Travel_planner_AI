import WeatherForecast from './WeatherForecast';
import Itinerary from './Itinerary';
import HandpickedForYou from './HandpickedForYou';
import { useTripDetailsStore } from '../../store/tripDetailsStore';
import VisaRequirements from './VisaRequirements';
import TripNotes from './TripNotes';
import { useFiltersStore } from '../../store/filtersStore';
import { useEffect, useState } from 'react';
import TripMap from './TripMap';
import TripHeader from './TripHeader';
import API from '../../apis/axios';
import { FilterType } from '../../types/filtersTypes';
import Skeleton from '../ui/Skeleton';
import { useLocationPhoto } from '../../hooks/useLocationPhoto';

const TripDetails = () => {
    const tripDetails = useTripDetailsStore((state) => state.tripDetails);
    const setTripDetails = useTripDetailsStore((state) => state.setTripDetails);
    const filters = useFiltersStore();
    const setFilters = useFiltersStore((state) => state.setFilters);
    const [loading, setLoading] = useState(false);
    const { fetchPhoto } = useLocationPhoto();
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [bgLoading, setBgLoading] = useState(false);

    console.log('filters:', filters);

    // Fetch background image for the first destination
    useEffect(() => {
        const getBg = async () => {
            if (filters.destination && filters.destination[0]) {
                setBgLoading(true);
                try {
                    // Use a wide aspect ratio for banner
                    const url = await fetchPhoto(filters.destination[0], 400, 1200);
                    setBgImage(url || null);
                } catch {
                    setBgImage(null);
                } finally {
                    setBgLoading(false);
                }
            } else {
                setBgImage(null);
            }
        };
        getBg();
        // eslint-disable-next-line
    }, [filters.destination && filters.destination[0]]);

    useEffect(() => {
        if (!filters.destination || filters.destination.length === 0) return;
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
            setLoading(true);
            try {
                const response = await API.post('/proposals/AIsuggestion', payload);
                setTripDetails(response.data);
                console.log('Trip details:', response.data);
            } catch (error) {
                console.error('Error fetching trip details:', error);
            } finally {
                setLoading(false);
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
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "url('https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{!loading && (tripDetails.title || 'Trip Details')}</h1>
                </div>
                {bgLoading && <div className="absolute inset-0 bg-gray-200/60 dark:bg-gray-800/60 flex items-center justify-center"><Skeleton height={64} width={400} /></div>}
            </div>
            <div className="container mx-auto px-4 py-8">
                <TripHeader tripTitle={tripDetails.title} tripDescription={tripDetails.description} loading={loading}/>
                <div className="container mx-auto" id="trip-details-content">
                    {loading ? (
                        <>
                            <Skeleton height={120} className="mb-6" /> {/* WeatherForecast skeleton */}
                            <Skeleton height={300} className="mb-6" /> {/* Itinerary skeleton */}
                            <Skeleton height={180} className="mb-6" /> {/* HandpickedForYou skeleton */}
                            <Skeleton height={120} className="mb-6" /> {/* VisaRequirements skeleton */}
                            <Skeleton height={100} className="mb-6" /> {/* TripNotes skeleton */}
                            <Skeleton height={200} className="mb-6" /> {/* TripMap skeleton */}
                        </>
                    ) : (
                        <>
                            <WeatherForecast />
                            {tripDetails?.days && <Itinerary days={tripDetails.days} />}
                            {tripDetails?.top_recommendations && <HandpickedForYou recommendations={tripDetails.top_recommendations} />}
                            {tripDetails?.visa_requirements && <VisaRequirements requirements={tripDetails.visa_requirements} />}
                            {tripDetails?.notes && <TripNotes notes={tripDetails.notes} />}
                            {filters.destination.length > 0 && <TripMap />}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TripDetails;