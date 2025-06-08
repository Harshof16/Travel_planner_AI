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

  const getRecommendations = async (location: string, category: string) => {
    // const response = {
    //   "success": true,
    //   "message": "Recommendations fetched successfully",
    //   "data": [
    //       {
    //           "location_id": "16660160",
    //           "name": "Eiffel Photoshoot Paris France",
    //           "description": "Book a private photoshoot with a professional photographer in Paris! Let's Capture your precious Memories !Few Spots available -Book today!",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d16660160-Reviews-Eiffel_Photoshoot_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "115 Rue De Reuilly",
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75012",
    //               "address_string": "115 Rue De Reuilly, 75012 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.84172",
    //           "longitude": "2.3935",
    //           "timezone": "Europe/Paris",
    //           "email": "marfloresparis@gmail.com",
    //           "phone": "+33 6 31 72 73 54",
    //           "website": "http://marianacattoir.com",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d16660160-Eiffel_Photoshoot_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#658 of 2,418 Tours in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "2418",
    //               "ranking": "658"
    //           },
    //           "rating": "5.0",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-66827-5.svg",
    //           "num_reviews": "8",
    //           "review_rating_count": {
    //               "1": "0",
    //               "2": "0",
    //               "3": "0",
    //               "4": "0",
    //               "5": "8"
    //           },
    //           "photo_count": "5",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d16660160-m66827-Reviews-Eiffel_Photoshoot_Paris_France-Paris_Ile_de_France.html#photos",
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               },
    //               {
    //                   "name": "sightseeing_tours",
    //                   "localized_name": "Tours"
    //               },
    //               {
    //                   "name": "activities",
    //                   "localized_name": "Activities"
    //               },
    //               {
    //                   "name": "other",
    //                   "localized_name": "Other"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Tours",
    //                   "localized_name": "Tours",
    //                   "categories": [
    //                       {
    //                           "name": "Photography Tours",
    //                           "localized_name": "Photography Tours"
    //                       }
    //                   ]
    //               },
    //               {
    //                   "name": "Other",
    //                   "localized_name": "Other",
    //                   "categories": [
    //                       {
    //                           "name": "",
    //                           "localized_name": ""
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "15621576",
    //                   "name": "Picpus"
    //               },
    //               {
    //                   "location_id": "7239101",
    //                   "name": "Bercy / Nation"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "3"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "1"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "1"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "0"
    //               }
    //           ],
    //           "awards": [],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/15/42/d5/ce/caption.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/15/42/d9/a1/caption.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "2219110",
    //           "name": "Espace Nadeshiko Paris France",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d2219110-Reviews-Espace_Nadeshiko_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "37 rue de la Croix Nivert",
    //               "street2": "",
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75015",
    //               "address_string": "37 rue de la Croix Nivert, 75015 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.84606",
    //           "longitude": "2.29905",
    //           "timezone": "Europe/Paris",
    //           "email": "nadeshiko.yk@gmail.com",
    //           "phone": "+33 1 83 96 69 33",
    //           "website": "http://espace-nadeshiko.fr/index.php/en",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d2219110-Espace_Nadeshiko_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#1,192 of 4,167 things to do in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "4167",
    //               "ranking": "1192"
    //           },
    //           "rating": "5.0",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-66827-5.svg",
    //           "num_reviews": "4",
    //           "review_rating_count": {
    //               "1": "0",
    //               "2": "0",
    //               "3": "0",
    //               "4": "0",
    //               "5": "4"
    //           },
    //           "photo_count": "0",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d2219110-m66827-Reviews-Espace_Nadeshiko_Paris_France-Paris_Ile_de_France.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 1,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 1,
    //                           "time": "2000"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "2000"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "2000"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "2000"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "2000"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "1700"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: 09:00 - 20:00",
    //                   "Tuesday: 09:00 - 20:00",
    //                   "Wednesday: 09:00 - 20:00",
    //                   "Thursday: 09:00 - 20:00",
    //                   "Friday: 09:00 - 20:00",
    //                   "Saturday: 09:00 - 17:00",
    //                   "Sunday: Closed"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "landmarks",
    //                   "localized_name": "Sights & Landmarks"
    //               },
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Sights & Landmarks",
    //                   "localized_name": "Sights & Landmarks",
    //                   "categories": [
    //                       {
    //                           "name": "Educational sites",
    //                           "localized_name": "Educational sites"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "15621591",
    //                   "name": "Necker"
    //               },
    //               {
    //                   "location_id": "15621637",
    //                   "name": "15th Arr. - Vaugirard"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "2"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "1"
    //               }
    //           ],
    //           "awards": [],
    //           "large_photos": []
    //       },
    //       {
    //           "location_id": "2613395",
    //           "name": "Paris by Mouth",
    //           "description": "There’s a reason why our tours are top-rated food tours on TripAdvisor and have been celebrated by The New York Times (twice!) and knowledgable foodies like David Lebovitz and Ruth Reichl: we keep our group sizes tiny, we spend generously at the best shops in town, and we only work with expert guides who have devoted their lives to food & wine. Our tours are in English and last for around 3 hours. They include some walking and standing, but also feature a seated tasting with wine pairings. Our tours are designed for adults. We’re unable to host children under ten years of age. Our price of 125€ per person is a little higher than the competition because we spend more than anyone else on premium tastings and to pay the most experienced and knowledgable guides in Paris. You’re also paying for the tiny group size. You can visit our website to see our calendar of availability, and we hope to welcome you soon!",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d2613395-Reviews-Paris_by_Mouth-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75004",
    //               "address_string": "75004 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.85627",
    //           "longitude": "2.35661",
    //           "timezone": "Europe/Paris",
    //           "email": "parisbymouthtours@gmail.com",
    //           "website": "http://parisbymouth.com/food-wine-tours/",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d2613395-Paris_by_Mouth-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#2 of 688 Food &amp; Drink in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "688",
    //               "ranking": "2"
    //           },
    //           "rating": "4.9",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-66827-5.svg",
    //           "num_reviews": "4094",
    //           "review_rating_count": {
    //               "1": "11",
    //               "2": "10",
    //               "3": "23",
    //               "4": "86",
    //               "5": "3963"
    //           },
    //           "photo_count": "2981",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d2613395-m66827-Reviews-Paris_by_Mouth-Paris_Ile_de_France.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "1400"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "1500"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "1900"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "1400"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "1500"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "1900"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "1400"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "1500"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "1900"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "1400"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "1500"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "1900"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "1400"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "1500"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "1900"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 7,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 7,
    //                           "time": "1400"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: Closed",
    //                   "Tuesday: 09:00 - 14:00,  15:00 - 19:00",
    //                   "Wednesday: 09:00 - 14:00,  15:00 - 19:00",
    //                   "Thursday: 09:00 - 14:00,  15:00 - 19:00",
    //                   "Friday: 09:00 - 14:00,  15:00 - 19:00",
    //                   "Saturday: 09:00 - 14:00,  15:00 - 19:00",
    //                   "Sunday: 09:00 - 14:00"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "food_drink",
    //                   "localized_name": "Food & Drink"
    //               },
    //               {
    //                   "name": "sightseeing_tours",
    //                   "localized_name": "Tours"
    //               },
    //               {
    //                   "name": "activities",
    //                   "localized_name": "Activities"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Food & Drink",
    //                   "localized_name": "Food & Drink",
    //                   "categories": [
    //                       {
    //                           "name": "Wine Tours & Tastings ",
    //                           "localized_name": "Wine Tours & Tastings "
    //                       },
    //                       {
    //                           "name": "Food Tours",
    //                           "localized_name": "Food Tours"
    //                       }
    //                   ]
    //               },
    //               {
    //                   "name": "Tours",
    //                   "localized_name": "Tours",
    //                   "categories": [
    //                       {
    //                           "name": "Wine Tours & Tastings ",
    //                           "localized_name": "Wine Tours & Tastings "
    //                       },
    //                       {
    //                           "name": "Food Tours",
    //                           "localized_name": "Food Tours"
    //                       },
    //                       {
    //                           "name": "Walking Tours",
    //                           "localized_name": "Walking Tours"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "15621598",
    //                   "name": "Saint-Gervais"
    //               },
    //               {
    //                   "location_id": "7236763",
    //                   "name": "Le Marais"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "14"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "1745"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "469"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "574"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "663"
    //               }
    //           ],
    //           "awards": [
    //               {
    //                   "award_type": "Travelers Choice",
    //                   "year": "2024",
    //                   "images": {
    //                       "tiny": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png",
    //                       "small": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png",
    //                       "large": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png"
    //                   },
    //                   "categories": [],
    //                   "display_name": "Travelers Choice"
    //               }
    //           ],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/12/78/d1/7d/the-before-shot-at-our.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/12/78/ed/05/one-of-the-many-colorful.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "12391179",
    //           "name": "Paris France Temple",
    //           "description": "The Paris France Temple in Le Chesnay offers a peaceful retreat from the bustle of the city. Whether the temple is surrounded by beautifully landscaped grounds or nestled within the heart of Le Chesnay, visitors are invited to come and explore designated areas open to all. Here, you can reflect on the teachings of Jesus Christ, find a moment of calm, and feel the peace of God. While only members of The Church of Jesus Christ of Latter-day Saints enter certain parts of the temple, all are welcome to experience the quiet, sacred spaces available. In the evening, the Paris France Temple shines brightly, symbolizing the light of Jesus Christ, offering hope and peace to the residents of Le Chesnay.",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g196572-d12391179-Reviews-Paris_France_Temple-Le_Chesnay_Chesnay_Rocquencourt_Versailles_Yvelines_Ile_de_F.html?m=66827",
    //           "address_obj": {
    //               "street1": "46 Blvd Saint Antoine",
    //               "city": "Le Chesnay",
    //               "country": "France",
    //               "postalcode": "78150",
    //               "address_string": "46 Blvd Saint Antoine, 78150 Le Chesnay, Versailles France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Le Chesnay",
    //                   "location_id": "196572"
    //               },
    //               {
    //                   "level": "Municipality",
    //                   "name": "Chesnay-Rocquencourt",
    //                   "location_id": "19451251"
    //               },
    //               {
    //                   "level": "Municipality",
    //                   "name": "Versailles",
    //                   "location_id": "187148"
    //               },
    //               {
    //                   "level": "Department",
    //                   "name": "Yvelines",
    //                   "location_id": "2568676"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.81741",
    //           "longitude": "2.12355",
    //           "timezone": "Europe/Paris",
    //           "phone": "+33 9 70 73 70 00",
    //           "website": "https://www.churchofjesuschrist.org/temples/details/paris-france-temple?lang=eng",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g196572-d12391179-Paris_France_Temple-Le_Chesnay_Chesnay_Rocquencourt_Versailles_Yvelines_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "196572",
    //               "ranking_string": "#1 of 12 things to do in Le Chesnay",
    //               "geo_location_name": "Le Chesnay",
    //               "ranking_out_of": "12",
    //               "ranking": "1"
    //           },
    //           "rating": "4.7",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg",
    //           "num_reviews": "105",
    //           "review_rating_count": {
    //               "1": "0",
    //               "2": "4",
    //               "3": "4",
    //               "4": "12",
    //               "5": "85"
    //           },
    //           "photo_count": "61",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g196572-d12391179-m66827-Reviews-Paris_France_Temple-Le_Chesnay_Chesnay_Rocquencourt_Versailles_Yvelines_Ile_de_F.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 1,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 1,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "2100"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 7,
    //                           "time": "0900"
    //                       },
    //                       "close": {
    //                           "day": 7,
    //                           "time": "2100"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: 09:00 - 21:00",
    //                   "Tuesday: 09:00 - 21:00",
    //                   "Wednesday: 09:00 - 21:00",
    //                   "Thursday: 09:00 - 21:00",
    //                   "Friday: 09:00 - 21:00",
    //                   "Saturday: 09:00 - 21:00",
    //                   "Sunday: 09:00 - 21:00"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "landmarks",
    //                   "localized_name": "Sights & Landmarks"
    //               },
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Sights & Landmarks",
    //                   "localized_name": "Sights & Landmarks",
    //                   "categories": [
    //                       {
    //                           "name": "Churches & Cathedrals",
    //                           "localized_name": "Churches & Cathedrals"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "1"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "24"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "6"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "31"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "4"
    //               }
    //           ],
    //           "awards": [],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/1b/e4/9f/cc/temple-de-paris.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/1b/6a/1f/75/celestial-room-in-the.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "188151",
    //           "name": "Eiffel Tower",
    //           "description": "Completed in 1889, this colossal landmark, although initially hated by many Parisians, is now a famous symbol of French civic pride.",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d188151-Reviews-Eiffel_Tower-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "Av. Gustave Eiffel",
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75007",
    //               "address_string": "Av. Gustave Eiffel, 75007 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.858353",
    //           "longitude": "2.294464",
    //           "timezone": "Europe/Paris",
    //           "phone": "+33 892 70 12 39",
    //           "website": "https://www.toureiffel.paris/",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d188151-Eiffel_Tower-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#12 of 4,167 things to do in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "4167",
    //               "ranking": "12"
    //           },
    //           "rating": "4.6",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg",
    //           "num_reviews": "143030",
    //           "review_rating_count": {
    //               "1": "1447",
    //               "2": "1943",
    //               "3": "8801",
    //               "4": "29944",
    //               "5": "100889"
    //           },
    //           "photo_count": "105898",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d188151-m66827-Reviews-Eiffel_Tower-Paris_Ile_de_France.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0845"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "2345"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0845"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "2345"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0845"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "2345"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0845"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "2345"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "1800"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "2345"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 7,
    //                           "time": "0845"
    //                       },
    //                       "close": {
    //                           "day": 7,
    //                           "time": "2345"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: Closed",
    //                   "Tuesday: 08:45 - 23:45",
    //                   "Wednesday: 08:45 - 23:45",
    //                   "Thursday: 08:45 - 23:45",
    //                   "Friday: 08:45 - 23:45",
    //                   "Saturday: 18:00 - 23:45",
    //                   "Sunday: 08:45 - 23:45"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "landmarks",
    //                   "localized_name": "Sights & Landmarks"
    //               },
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Sights & Landmarks",
    //                   "localized_name": "Sights & Landmarks",
    //                   "categories": [
    //                       {
    //                           "name": "Points of Interest & Landmarks",
    //                           "localized_name": "Points of Interest & Landmarks"
    //                       },
    //                       {
    //                           "name": "Observation Decks & Towers",
    //                           "localized_name": "Observation Decks & Towers"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "15621622",
    //                   "name": "Gros-Caillou"
    //               },
    //               {
    //                   "location_id": "7236767",
    //                   "name": "Tour Eiffel / Invalides"
    //               },
    //               {
    //                   "location_id": "15621644",
    //                   "name": "7th Arr. - Palais-Bourbon"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "2522"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "55112"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "8000"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "35639"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "21712"
    //               }
    //           ],
    //           "awards": [
    //               {
    //                   "award_type": "Travelers Choice Best of the Best",
    //                   "year": "2024",
    //                   "images": {
    //                       "tiny": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png",
    //                       "small": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png",
    //                       "large": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png"
    //                   },
    //                   "categories": [
    //                       "TopAttractions"
    //                   ],
    //                   "display_name": "Travelers Choice Best of the Best"
    //               },
    //               {
    //                   "award_type": "Travelers Choice",
    //                   "year": "2024",
    //                   "images": {
    //                       "tiny": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png",
    //                       "small": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png",
    //                       "large": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png"
    //                   },
    //                   "categories": [],
    //                   "display_name": "Travelers Choice"
    //               }
    //           ],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/1a/9e/7f/9d/eiffeltoren.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/1b/15/a3/d6/c-emeric-livinec-sete.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "15316904",
    //           "name": "DAY TRIPS FROM PARIS (FRANCE) - CITY TOURS",
    //           "description": "you have an independent spirit ! You are staying in Paris for a few days or more and you would love to take a day trip to explore the near and further environ of Paris or even another region.",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d15316904-Reviews-DAY_TRIPS_FROM_PARIS_FRANCE_CITY_TOURS-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "bd MONTPARNASSE",
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75014",
    //               "address_string": "bd MONTPARNASSE, 75014 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.84284",
    //           "longitude": "2.32636",
    //           "timezone": "Europe/Paris",
    //           "email": "booking@daytrips.paris",
    //           "phone": "+33 6 03 17 73 72",
    //           "website": "https://tp-independent.com/",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d15316904-DAY_TRIPS_FROM_PARIS_FRANCE_CITY_TOURS-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#506 of 2,418 Tours in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "2418",
    //               "ranking": "506"
    //           },
    //           "rating": "4.2",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-66827-5.svg",
    //           "num_reviews": "51",
    //           "review_rating_count": {
    //               "1": "4",
    //               "2": "2",
    //               "3": "5",
    //               "4": "10",
    //               "5": "30"
    //           },
    //           "photo_count": "36",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d15316904-m66827-Reviews-DAY_TRIPS_FROM_PARIS_FRANCE_CITY_TOURS-Paris_Ile_de_France.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 1,
    //                           "time": "0830"
    //                       },
    //                       "close": {
    //                           "day": 1,
    //                           "time": "1830"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0830"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "1830"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0830"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "1830"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0830"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "1830"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0830"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "1830"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: 08:30 - 18:30",
    //                   "Tuesday: 08:30 - 18:30",
    //                   "Wednesday: 08:30 - 18:30",
    //                   "Thursday: 08:30 - 18:30",
    //                   "Friday: 08:30 - 18:30",
    //                   "Saturday: Closed",
    //                   "Sunday: Closed"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               },
    //               {
    //                   "name": "sightseeing_tours",
    //                   "localized_name": "Tours"
    //               },
    //               {
    //                   "name": "activities",
    //                   "localized_name": "Activities"
    //               },
    //               {
    //                   "name": "other",
    //                   "localized_name": "Other"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Tours",
    //                   "localized_name": "Tours",
    //                   "categories": [
    //                       {
    //                           "name": "Day Trips",
    //                           "localized_name": "Day Trips"
    //                       },
    //                       {
    //                           "name": "Private Tours",
    //                           "localized_name": "Private Tours"
    //                       }
    //                   ]
    //               },
    //               {
    //                   "name": "Other",
    //                   "localized_name": "Other",
    //                   "categories": [
    //                       {
    //                           "name": "",
    //                           "localized_name": ""
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "7239103",
    //                   "name": "Montparnasse"
    //               },
    //               {
    //                   "location_id": "15621631",
    //                   "name": "14th Arr. - Observatoire"
    //               },
    //               {
    //                   "location_id": "15621556",
    //                   "name": "Montparnasse Quartier"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "13"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "1"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "7"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "4"
    //               }
    //           ],
    //           "awards": [],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/15/3a/4f/a4/caption.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-p/17/1d/9c/b4/booking-us-with-delux.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "189258",
    //           "name": "Disneyland Paris",
    //           "description": "Welcome to the place where everyone can shine their brightest!\n\nSince opening in 1992, Disneyland Paris® has welcomed hundreds of millions of guests through its gates, making it Europe's number-one tourist destination\n\nWith the majestic Sleeping Beauty castle as its heart, Disneyland park is the fantastical home to five incredible lands. For 30 magical years, it's been the place where extraordinary stories come to life before your very eyes. Buckle up because you’re about to whizz around Discoveryland, Fantasyland, Frontierland, Adventureland, and Main Street U.S.A.®\n\nFeel unique magic in the air, as the 30th Anniversary festive aura transforms Disneyland park into a vibrant wonderland. With stunning surroundings, the mesmerizing Gardens of Wonder, and many eye-catching surprises, you're sure to get swept up in the celebratory spirit.\n\nAs night falls, prepare to be amazed by the award-winning Disney D-Light, where spectacular drone light choreography illuminates the sky.",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g1182377-d189258-Reviews-Disneyland_Paris-Chessy_Marne_la_Vallee_Seine_et_Marne_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "Boulevard de Parc",
    //               "street2": "",
    //               "city": "Chessy",
    //               "country": "France",
    //               "postalcode": "77700",
    //               "address_string": "Boulevard de Parc, 77700 Chessy, Marne-la-Vallee France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Chessy",
    //                   "location_id": "1182377"
    //               },
    //               {
    //                   "level": "Municipality",
    //                   "name": "Marne-la-Vallee",
    //                   "location_id": "226865"
    //               },
    //               {
    //                   "level": "Department",
    //                   "name": "Seine-et-Marne",
    //                   "location_id": "1816325"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.872417",
    //           "longitude": "2.776952",
    //           "timezone": "Europe/Paris",
    //           "phone": "+33 1 60 30 60 53",
    //           "website": "https://www.disneylandparis.com/",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g1182377-d189258-Disneyland_Paris-Chessy_Marne_la_Vallee_Seine_et_Marne_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "1182377",
    //               "ranking_string": "#1 of 7 things to do in Chessy",
    //               "geo_location_name": "Chessy",
    //               "ranking_out_of": "7",
    //               "ranking": "1"
    //           },
    //           "rating": "3.9",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-66827-5.svg",
    //           "num_reviews": "53503",
    //           "review_rating_count": {
    //               "1": "4587",
    //               "2": "4446",
    //               "3": "7386",
    //               "4": "12409",
    //               "5": "24675"
    //           },
    //           "photo_count": "41758",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g1182377-d189258-m66827-Reviews-Disneyland_Paris-Chessy_Marne_la_Vallee_Seine_et_Marne_Ile_de_France.html#photos",
    //           "hours": {
    //               "periods": [
    //                   {
    //                       "open": {
    //                           "day": 1,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 1,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 2,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 2,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 3,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 3,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 4,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 4,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 5,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 5,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 6,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 6,
    //                           "time": "2300"
    //                       }
    //                   },
    //                   {
    //                       "open": {
    //                           "day": 7,
    //                           "time": "0930"
    //                       },
    //                       "close": {
    //                           "day": 7,
    //                           "time": "2300"
    //                       }
    //                   }
    //               ],
    //               "weekday_text": [
    //                   "Monday: 09:30 - 23:00",
    //                   "Tuesday: 09:30 - 23:00",
    //                   "Wednesday: 09:30 - 23:00",
    //                   "Thursday: 09:30 - 23:00",
    //                   "Friday: 09:30 - 23:00",
    //                   "Saturday: 09:30 - 23:00",
    //                   "Sunday: 09:30 - 23:00"
    //               ]
    //           },
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "amusement_parks",
    //                   "localized_name": "Water & Amusement Parks"
    //               },
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Water & Amusement Parks",
    //                   "localized_name": "Water & Amusement Parks",
    //                   "categories": [
    //                       {
    //                           "name": "Theme Parks",
    //                           "localized_name": "Theme Parks"
    //                       },
    //                       {
    //                           "name": "Disney Parks & Activities",
    //                           "localized_name": "Disney Parks & Activities"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "138"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "7567"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "526"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "31060"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "3989"
    //               }
    //           ],
    //           "awards": [
    //               {
    //                   "award_type": "Travelers Choice Best of the Best",
    //                   "year": "2024",
    //                   "images": {
    //                       "tiny": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png",
    //                       "small": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png",
    //                       "large": "https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_bob_2024_L.png"
    //                   },
    //                   "categories": [
    //                       "AmusementWaterParks"
    //                   ],
    //                   "display_name": "Travelers Choice Best of the Best"
    //               }
    //           ],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/26/92/e4/97/disneyland-paris.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/2b/54/ac/4c/chateau-de-la-belle-au.jpg"
    //           ]
    //       },
    //       {
    //           "location_id": "4414468",
    //           "name": "Geant Casino, Paris, France",
    //           "web_url": "https://www.tripadvisor.com/Attraction_Review-g187147-d4414468-Reviews-Geant_Casino_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "address_obj": {
    //               "street1": "98 boulevard Massena",
    //               "city": "Paris",
    //               "country": "France",
    //               "postalcode": "75013",
    //               "address_string": "98 boulevard Massena, 75013 Paris France"
    //           },
    //           "ancestors": [
    //               {
    //                   "level": "City",
    //                   "name": "Paris",
    //                   "location_id": "187147"
    //               },
    //               {
    //                   "level": "Region",
    //                   "name": "Ile-de-France",
    //                   "location_id": "187144"
    //               },
    //               {
    //                   "level": "Country",
    //                   "name": "France",
    //                   "location_id": "187070"
    //               }
    //           ],
    //           "latitude": "48.821636",
    //           "longitude": "2.366071",
    //           "timezone": "Europe/Paris",
    //           "phone": "+33 1 42 16 64 00",
    //           "website": "https://www.facebook.com/443772889051178",
    //           "write_review": "https://www.tripadvisor.com/UserReview-g187147-d4414468-Geant_Casino_Paris_France-Paris_Ile_de_France.html?m=66827",
    //           "ranking_data": {
    //               "geo_location_id": "187147",
    //               "ranking_string": "#8 of 9 Casinos &amp; Gambling in Paris",
    //               "geo_location_name": "Paris",
    //               "ranking_out_of": "9",
    //               "ranking": "8"
    //           },
    //           "rating": "2.5",
    //           "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/2.5-66827-5.svg",
    //           "num_reviews": "35",
    //           "review_rating_count": {
    //               "1": "13",
    //               "2": "6",
    //               "3": "6",
    //               "4": "4",
    //               "5": "6"
    //           },
    //           "photo_count": "28",
    //           "see_all_photos": "https://www.tripadvisor.com/Attraction_Review-g187147-d4414468-m66827-Reviews-Geant_Casino_Paris_France-Paris_Ile_de_France.html#photos",
    //           "category": {
    //               "name": "attraction",
    //               "localized_name": "Attraction"
    //           },
    //           "subcategory": [
    //               {
    //                   "name": "fun_games",
    //                   "localized_name": "Fun & Games"
    //               },
    //               {
    //                   "name": "attractions",
    //                   "localized_name": "Attractions"
    //               },
    //               {
    //                   "name": "casinos_gaming",
    //                   "localized_name": "Casinos & Gambling"
    //               },
    //               {
    //                   "name": "shopping",
    //                   "localized_name": "Shopping"
    //               },
    //               {
    //                   "name": "activities",
    //                   "localized_name": "Activities"
    //               }
    //           ],
    //           "groups": [
    //               {
    //                   "name": "Shopping",
    //                   "localized_name": "Shopping",
    //                   "categories": [
    //                       {
    //                           "name": "Gift & Specialty Shops",
    //                           "localized_name": "Gift & Specialty Shops"
    //                       }
    //                   ]
    //               },
    //               {
    //                   "name": "Casinos & Gambling",
    //                   "localized_name": "Casinos & Gambling",
    //                   "categories": [
    //                       {
    //                           "name": "Casinos",
    //                           "localized_name": "Casinos"
    //                       }
    //                   ]
    //               },
    //               {
    //                   "name": "Fun & Games",
    //                   "localized_name": "Fun & Games",
    //                   "categories": [
    //                       {
    //                           "name": "Casinos",
    //                           "localized_name": "Casinos"
    //                       }
    //                   ]
    //               }
    //           ],
    //           "neighborhood_info": [
    //               {
    //                   "location_id": "7239102",
    //                   "name": "Place d'Italie / Quartier Asiatique"
    //               },
    //               {
    //                   "location_id": "15621613",
    //                   "name": "Quartier de la Gare"
    //               },
    //               {
    //                   "location_id": "15621667",
    //                   "name": "Olympiades"
    //               }
    //           ],
    //           "trip_types": [
    //               {
    //                   "name": "business",
    //                   "localized_name": "Business",
    //                   "value": "0"
    //               },
    //               {
    //                   "name": "couples",
    //                   "localized_name": "Couples",
    //                   "value": "6"
    //               },
    //               {
    //                   "name": "solo",
    //                   "localized_name": "Solo travel",
    //                   "value": "10"
    //               },
    //               {
    //                   "name": "family",
    //                   "localized_name": "Family",
    //                   "value": "5"
    //               },
    //               {
    //                   "name": "friends",
    //                   "localized_name": "Friends getaway",
    //                   "value": "7"
    //               }
    //           ],
    //           "awards": [],
    //           "large_photos": [
    //               "https://media-cdn.tripadvisor.com/media/photo-s/0e/02/1d/d6/geant-casino-paris-france.jpg",
    //               "https://media-cdn.tripadvisor.com/media/photo-s/09/4f/3b/36/geant-casino-paris-france.jpg"
    //           ]
    //       }
    //   ]
    // };
    // return response.data;
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`/recommendations/getLocations?key=${location}&category=${category}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const recommendations = response.data.data;
      return recommendations;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch recommendations');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  // Return the photo, loading state, error message, and fetch function
  return { photo, loading, error, fetchPhoto, getRecommendations };
}
