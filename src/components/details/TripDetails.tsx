import WeatherForecast from './WeatherForecast';
import Itinerary from './Itinerary';
import TripBlueprintHeader from './TripBlueprintHeader';
import HandpickedForYou from './HandpickedForYou';
import SmartTravelHacks from './SmartTravelHacks';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 43.645,
//   lng: -79.387,
// };

const TripDetails = () => {
    return (
        <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Trip Details</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <TripBlueprintHeader />
                <WeatherForecast />
                <Itinerary />
                <HandpickedForYou />
                <SmartTravelHacks />

                {/* <div className="mt-8">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Location</h2>
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div> */}
            </div>
        </div>
    )
}

export default TripDetails