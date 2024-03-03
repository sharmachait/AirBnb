import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then(res => { setPlace(res.data); });

  }, []);
  if (showPhotos) {
    return (<div className='-mx-8 py-8 inset-0 px-20 md:px-32 lg:px-60 xl:px-72 absolute bg-white min-h-screen'>
      <div className='w-full flex justify-end'>
        <svg onClick={() => { setShowPhotos(false); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fixed w-10 h-10 cursor-pointer right-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <div className='flex flex-col gap-2'>
        {place?.photos?.length > 0 && place.photos.map((photo, i) => (
          <div key={i}>
            <img className='object-cover' src={'http://localhost:3000/uploads/' + photo} alt="" />
          </div>
        ))}
      </div>

    </div>);
  }
  return (
    <div className='-mx-8 py-8 bg-gray-50 min-h-screen px-10 md:px-20 lg:px-32 xl:px-40'>
      <h1 className='text-3xl'>{place?.title}</h1>
      <a target='_blank' className='block my-2 semi-bold underline' href={'https://maps.google.com/?q=' + place?.address}>{place?.address}</a>
      <div className='relative '>
        <div className="grid grid-cols-[2fr_1fr] gap-2 ">
          <div className=''>
            {place?.photos?.[0] && <img className='w-full h-full object-cover aspect-square' src={'http://localhost:3000/uploads/' + place?.photos?.[0]}></img>}
          </div>
          <div className='flex flex-col '>
            <div className=''>
              {place?.photos?.[1] && <img className='object-cover aspect-square' src={'http://localhost:3000/uploads/' + place?.photos?.[1]}></img>}
            </div>
            <div className='overflow-hidden'>
              {place?.photos?.[2] && <img className='object-cover relative top-2 aspect-square' src={'http://localhost:3000/uploads/' + place?.photos?.[2]}></img>}
            </div>
          </div>
        </div>
        <button onClick={() => { setShowPhotos(true); }} className="absolute bottom-2 right-2 shadow-md shadow-black rounded-2xl text-center  text-gray-700 py-2 px-4 bg-white ">show more photos</button>
      </div>
    </div>
  );
}

export default PlacePage;