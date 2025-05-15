import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useFiltersStore } from '../../store/filtersStore';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 43.645,
  lng: -79.387,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const TripMap: React.FC = () => {
  const filters = useFiltersStore();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    setSearchError('');
    const searchInput = filters.destination[0] || '';
    if (!searchInput.trim()) return;
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchInput)}&key=${GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        if (data.status === 'OK' && data.results.length > 0) {
          const loc = data.results[0].geometry.location;
          setMapCenter({ lat: loc.lat, lng: loc.lng });
        } else {
          setSearchError('Location not found.');
        }
      } catch {
        setSearchError('Error searching location.');
      }
    };
    fetchLocation();
  }, [filters.destination]);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Location</h2>
      {searchError && <div className="text-red-500 mb-2">{searchError}</div>}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
          <Marker position={mapCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default TripMap;
