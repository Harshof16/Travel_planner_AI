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
import { useToken } from '../../context/TokenProvider';
import TripHacks from './TripHacks';
import TripSearchBar from './Searchbar';
import Filters from './Filters';
import AILoader from '../ui/AILoader';


const TripDetails = () => {
    const [isMobile, setIsMobile] = useState(false);
    const tripDetails = useTripDetailsStore((state) => state.tripDetails);
    const setTripDetails = useTripDetailsStore((state) => state.setTripDetails);
    const filters = useFiltersStore();
    // const setFilters = useFiltersStore((state) => state.setFilters);
    const [loading, setLoading] = useState(false);
    const { fetchPhoto } = useLocationPhoto();
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [bgLoading, setBgLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => setShowFilters(!showFilters);
    const { token } = useToken();

    // console.log('filters:', filters);

    // Fetch background image for the first destination
    useEffect(() => {
        const getBg = async () => {
            if (filters.destination && filters.destination[0]) {
                setBgLoading(true);
                try {
                    // Use a wide aspect ratio for banner
                    const url = await fetchPhoto(filters.destination[0], 400, 1200 , "");
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
        if (!filters.destination || filters.destination.length === 0) {
            toggleFilters();
            setLoading(true);
            return;
        };
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
        // console.log('Payload:', payload);
        const fetchTripDetails = async () => {
            setLoading(true);
            try {
                if (destination.length === 0) {
                    setTripDetails({
                        title: '',
                        days: [],
                        notes: [],
                        top_recommendations: [],
                        visa_requirements: [],
                        smart_travel_hacks: {} as any,
                        description: '',
                        historical_description: ''
                    });
                    return;
                }
                if (type === "package" || type === "visa" || type === "hacks" ) {
                    // payload.no_of_days.total = payload.no_of_days.total > 0 ? payload.no_of_days.total + 1 : 0;

                    setTripDetails({
                        title: '',
                        days: [],
                        notes: [],
                        top_recommendations: [],
                        visa_requirements: [],
                        smart_travel_hacks: {} as any,
                        description: '',
                        historical_description: ''
                    });
                    let visaInfo = null;
                    if (type === "package" && visaRequirement) {
                        // const response = await API.post('/proposals/AIsuggestion'
                        // , {
                        //     ...payload,
                        //     type: 'visa'
                        // }, {
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //         Authorization: `Bearer ${token}`,
                        //     },
                        // });
                        // visaInfo = response.data?.visa_requirements;
                        // console.log('Visa Trip details:', response.data);
                    }
                    const response = await API.post('/proposals/AIsuggestion'
                    , payload, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (visaInfo && typeof visaInfo !== undefined && visaInfo !== null) {
                        response.data.visa_requirements = visaInfo;
                    }
                    setTripDetails(response.data);
                    // console.log('Trip details:', response.data);    
                } else {
                    // const response = await API.post('/weather/by-city', payload, {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // });
                    // setTripDetails(response.data);
                    // console.log('Trip details:', response.data);
                }
            } catch (error) {
                console.error('Error fetching trip details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [filters]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type')?.replace(/\s+/g, '') as FilterType || '';
        const source = params.get('source')?.replace(/\s+/g, '') || '';
        const destinationRaw = params.get('destination')?.replace(/\s+/g, '') || '';
        const date = params.get('date')?.replace(/\s+/g, '') || '';
        const nationality = params.get('nationality')?.replace(/\s+/g, '') || '';
        const theme = params.get('theme')?.replace(/\s+/g, '') || '';

        if (!destinationRaw) {
            setLoading(true);
        }
        filters.setFilters({
            type: type || filters.type,
            source: source || filters.source,
            destination: destinationRaw ? JSON.parse(destinationRaw) : filters.destination,
            travelDate: date || filters.travelDate,
            no_of_days: filters.no_of_days,
            inclusions: filters.inclusions,
            theme: theme ? [theme] : filters.theme,
            travelers: filters.travelers,
            visaRequirement: filters.visaRequirement,
            nationality: nationality || filters.nationality,
            tripType: filters.tripType,
        });

    }, [filters.setFilters]);

    useEffect(() => {
        const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // make an API call to get the visa suggestion only if the visa_requirement in trip details is empty
    useEffect(() => {
        const fetchVisaSuggestion = async () => {
            if (!tripDetails.visa_requirements) {
                setLoading(true);
                try {
                    if (filters.type === "package" && filters.visaRequirement) {
                        // filters.no_of_days.total = filters.no_of_days.total > 0 ? filters.no_of_days.total + 1 : 0;

                        let visaInfo = [];
                        const response = await API.post('/proposals/AIsuggestion'
                        , {
                            ...filters,
                            type: 'visa'
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        visaInfo = response.data?.visa_requirements;
                        if (visaInfo && typeof visaInfo !== undefined && visaInfo !== null) {
                            tripDetails.visa_requirements = visaInfo;
                        }
                        setTripDetails(tripDetails);
                    }
                } catch (error) {
                    console.error('Error fetching visa suggestion:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchTravelTips = async () => {
            if (!tripDetails.smart_travel_hacks) {
                setLoading(true);
                try {
                    if (filters.type === "package" || filters.type === "hacks") {
                        // filters.no_of_days.total = filters.no_of_days.total > 0 ? filters.no_of_days.total + 1 : 0;
                        let visaInfo = [];
                        const response = await API.post('/proposals/AIsuggestion'
                        , {
                            ...filters,
                            type: 'hacks'
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        visaInfo = response.data?.smart_travel_hacks;
                        if (visaInfo && typeof visaInfo !== undefined && visaInfo !== null) {
                            tripDetails.smart_travel_hacks = visaInfo;
                        }
                        setTripDetails(tripDetails);
                    }
                } catch (error) {
                    console.error('Error fetching visa suggestion:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchVisaSuggestion();
        fetchTravelTips();
    }, [tripDetails.visa_requirements, tripDetails.smart_travel_hacks, filters]);

    return (
        <div className="relative items-center justify-center overflow-hidden top-0 right-0">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "url('https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-white">{!loading && 'Trip Details'}</div>
                    <div className="flex flex-col items-center text-white mt-4">
                        <div className="flex space-x-2">
                            {filters.destination.map((dest, index) => (
                                <div key={index} className="flex items-center space-x-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-red-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13s-7-7.75-7-13c0-3.866 3.134-7 7-7z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9a2 2 0 110-4 2 2 0 010 4z"
                                        />
                                    </svg>
                                    <span>{dest}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {bgLoading && <div className="absolute inset-0 bg-gray-200/60 dark:bg-gray-800/60 flex items-center justify-center"><Skeleton height={64} width={400} /></div>}
            </div>
            <div className="container mx-auto px-4 py-8">
                <div>
                    {filters.destination.length === 0 && (

                        // loading && (
                        //     <AILoader/>
                        // )
                        //GIF for AI powered website that shows our team is creafting your travel itinerary with the help of AI, just wait for a while. Use lottie animations.
                         <div className="flex justify-center items-center mb-8">
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md w-full max-w-xl text-center">
                                <div className="flex flex-col items-center">
                                    <svg className="w-10 h-10 mb-2 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                    </svg>
                                    <h2 className="font-semibold text-lg mb-1">No Destination Selected</h2>
                                    <p className="text-sm">
                                        For a better experience and to explore more, please enter a destination to kick off your journey in the&nbsp; 
                                        <button
                                        className="text-sm text-yellow-800 font-semibold hover:text-yellow-600 focus:outline-none"
                                        onClick={toggleFilters}
                                    >
                                        advanced filters
                                    </button>
                                    .
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Search Form */}
                <div className="mb-8">
                  <TripSearchBar toggleFilters={toggleFilters} filters={filters} />
                </div>
                
                {filters.destination.length !== 0 && (
                    <>
                        <TripHeader tripTitle={tripDetails.title} tripDescription={tripDetails.description} tripAdditionalDescription={tripDetails.historical_description} loading={loading} destinations={filters.destination}/>
                        <div className="container mx-auto" id="trip-details-content">
                            {loading ? (
                                // <>
                                //     <Skeleton height={120} className="mb-6" /> {/* WeatherForecast skeleton */}
                                //     <Skeleton height={300} className="mb-6" /> {/* Itinerary skeleton */}
                                //     <Skeleton height={180} className="mb-6" /> {/* HandpickedForYou skeleton */}
                                //     <Skeleton height={120} className="mb-6" /> {/* VisaRequirements skeleton */}
                                //     <Skeleton height={100} className="mb-6" /> {/* TripNotes skeleton */}
                                //     <Skeleton height={200} className="mb-6" /> {/* TripMap skeleton */}
                                // </>
                                <AILoader/>
                            ) : (                  
                                <>
                                    {/* <WeatherForecast /> */}
                                    {tripDetails?.days && <Itinerary days={tripDetails.days} isMobile={isMobile} />}
                                    {tripDetails?.top_recommendations && <HandpickedForYou recommendations={tripDetails.top_recommendations} destinations={filters.destination} />}
                                    {(filters.visaRequirement || filters.type === "visa") && tripDetails?.visa_requirements && <VisaRequirements requirements={tripDetails.visa_requirements} isMobile={isMobile}/>}
                                    {tripDetails?.smart_travel_hacks && <TripHacks requirements={tripDetails.smart_travel_hacks} isMobile={isMobile}/>}
                                    {tripDetails?.notes && <TripNotes notes={tripDetails.notes} />}
                                    {/* {filters.destination.length > 0 && <TripMap />} */}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            {showFilters && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
                        <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
                        onClick={toggleFilters}
                        aria-label="Close"
                        >
                        &times;
                        </button>
                        <Filters closeModal={toggleFilters} filtersStore={filters} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TripDetails;