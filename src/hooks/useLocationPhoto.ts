import { useState } from 'react';
import API from '../apis/axios';

/**
 * Custom hook to fetch a photo for a given location.
 * @param location The location string to search for.
 * @returns { photo: string | null, loading: boolean, error: string | null, fetchPhoto: (location: string) => Promise<void> }
 */
export function useLocationPhoto() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhoto = async (location: string) => {
    setLoading(true);
    setError(null);
    setPhoto(null);
    try {
      // 1. Get location id
      const locRes = await API.get(`/amadeus/locations?keyword=${encodeURIComponent(location)}`);
      const locId = locRes.data?.[0]?.id;
      if (!locId) throw new Error('Location not found');

      // 2. Get photo id
      const photoRes = await API.get(`/amadeus/locations/photos?inputs=${locId}`);
      const photoId = photoRes.data?.[0]?.photoid;
      if (!photoId) throw new Error('Photo not found');

      // 3. Get photo URL (assuming the API returns the image as a blob or a direct URL)
      const imgRes = await API.get(`/amadeus/locations/photo/serve`, {
        params: { photoid: photoId },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(imgRes.data);
      setPhoto(imageUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch photo');
      }
    } finally {
      setLoading(false);
    }
  };

  return { photo, loading, error, fetchPhoto };
}
