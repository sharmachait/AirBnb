import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className='grid gap-y-10 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
      {
        places.length > 0 && places.map(place => (
          <Link to={'/place/' + place._id} key={place._id}>
            <div className='bg-gray-500 rounded-2xl flex mb-2'>
              {place.photos?.[0] && (
                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:3000/uploads/' + place.photos[0]}></img>
              )}
            </div>
            <h2 className='text-md truncate'>{place.title}</h2>
            <h3 className='text-xs text-gray-500'>{place.address}</h3>
            <h3 className='mt-1'><span className='font-bold'>${place.price}</span> per night</h3>
          </Link>

        ))
      }
    </div>
  );
}

export default IndexPage;