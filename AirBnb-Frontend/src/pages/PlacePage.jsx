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
    return (<div className='-mx-8 py-8 inset-0 px-20 md:px-32 lg:px-60 xl:px-72 absolute bg-black min-h-fit'>

      <div className='fixed w-full flex justify-end cursor-pointer right-1 items-center '>

        <div className='border text-white border-white flex items-center py-1 px-4 rounded-3xl bg-black bg-opacity-70 shadow-black'>
          <svg onClick={() => { setShowPhotos(false); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-10 h-10 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <div className='flex flex-col gap-2 items-center'>
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
      <div className="flex align-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
        <a target='_blank' className='block my-2 semi-bold underline' href={'https://maps.google.com/?q=' + place?.address}>{place?.address}</a></div>
      <div className='relative '>
        <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
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

      <div className='my-4 '>
        <h2 className='font-semibold text-2xl'>Description</h2>
        {place?.description}
      </div>

      <div className='flex flex-col md:flex-row w-ful items-center md:justify-between'>
        <div>
          Check in: {place?.checkIn} <br />
          Check out: {place?.checkOut} <br />
          Max Guests: {place?.maxGuests} <br />
        </div>
        <div>
          <div className='bg-white  md:w-full xl:w-[500px] p-4 rounded-2xl shadow-md'>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-xl  p-4 rounded-xl'>
                Price: ${place?.price} / per night
              </div>
              <div className="flex flex-col border w-[100%] rounded-xl items-center ">
                <div className='p-4 flex gap-2'>
                  <div>Guests:</div>
                  <input type="number" value={1} className="border-b text-center border-gray-300 rounded-xl max-w-16" />
                </div>
                <div className="flex flex-col lg:flex-row border-t w-full justify-center">
                  <div className='flex flex-col items-center py-4 px-4 '>
                    <label htmlFor="">Check in date</label>
                    <input type="date" />
                  </div>
                  <div className='flex flex-col items-center  md:border-l py-4 px-4 '>
                    <label htmlFor="">Check out date</label>
                    <input type="date" />
                  </div>
                </div>
              </div>
              <button className='primary mt-4'>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;