import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(res => {
        console.log(typeof res.data.booking);
        console.log(res.data.booking);
        let found = null
        for (let i = 0; i < res.data.booking.length; i++) {
          if (res.data.booking[i]._id == id) {
            console.log(res.data.booking[i]);
            found = res.data.booking[i];
          }
        }
        if (found) {
          setBooking(found);
        }
      });
    }
  }, []);

  if (!booking) { return <div>hi</div>; }
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
        {booking.place?.photos?.length > 0 && booking.place.photos.map((photo, i) => (
          <div key={i}>
            <img className='object-cover' src={'http://localhost:3000/uploads/' + photo} alt="" />
          </div>
        ))}
      </div>

    </div>);
  }

  return (
    <div className='-mx-8 py-8 bg-gray-50 min-h-screen px-10 md:px-20 lg:px-32 xl:px-40'>
      {booking}
      <h1 className='text-3xl'>{booking.place?.title}</h1>
      <div className="flex align-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
        <a target='_blank' className='block my-2 semi-bold underline' href={'https://maps.google.com/?q=' + booking.place?.address}>{booking.place?.address}</a></div>
      <div className='relative '>
        <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
          <div className=''>
            {booking.place?.photos?.[0] && <img className='w-full h-full object-cover aspect-square' src={'http://localhost:3000/uploads/' + booking.place?.photos?.[0]}></img>}
          </div>
          <div className='flex flex-col '>
            <div className=''>
              {booking.place?.photos?.[1] && <img className='object-cover aspect-square' src={'http://localhost:3000/uploads/' + booking.place?.photos?.[1]}></img>}
            </div>
            <div className='overflow-hidden'>
              {booking.place?.photos?.[2] && <img className='object-cover relative top-2 aspect-square' src={'http://localhost:3000/uploads/' + booking.place?.photos?.[2]}></img>}
            </div>
          </div>
        </div>
        <button onClick={() => { setShowPhotos(true); }} className="absolute bottom-2 right-2 shadow-md shadow-black rounded-2xl text-center  text-gray-700 py-2 px-4 bg-white ">show more photos</button>
      </div>
    </div>
  );
}

export default BookingPage;