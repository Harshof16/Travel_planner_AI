import { useState } from 'react';
import API from '../apis/axios';
import { useToken } from '../context/TokenProvider';

/**
 * Custom hook to fetch a photo for a given location.
 * @param location The location string to search for.
 * @returns { photo: string | null, loading: boolean, error: string | null, fetchPhoto: (location: string) => Promise<void> }
 */
export function useLocationPhoto() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useToken();

  const fetchPhoto = async (location: string, height: number = 400, width: number = 600, type: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setPhoto(null);
    try {
      // 1. Get location id
      // console.log("token::::::::::::::", token);
      
      // if (!token) token = useToken().token;
      if (!type) type="location";
      const locRes = await API.get(`/amadeus/locations?keyword=${location}&subType=${type}`);
      const locId = locRes.data?.[0]?.id;
      if (!locId) throw new Error('Location not found');

      // 2. Get photo links array for locId
      const photoRes = await API.get(`/amadeus/locations/photos?inputs=${locId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const linksArr = photoRes.data?.[locId];
      if (!Array.isArray(linksArr) || !linksArr[0]) throw new Error('Photo not found');
      const photoLink = linksArr[0];

      // 3. Fetch the image with height and width query params
      const imgUrl = `${photoLink}&height=${height}&width=${width}`;
      const imgRes = await API.get(imgUrl, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const imageUrl = URL.createObjectURL(imgRes.data);
      setPhoto(imageUrl);
      return imageUrl;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch photo');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { photo, loading, error, fetchPhoto };
}
