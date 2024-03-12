import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

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

  if (!booking) { return <div>no booking</div>; }
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
      <h1 className='text-3xl'>{booking.place?.title}</h1>
      <div className="flex align-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <a target='_blank' className='block my-2 semi-bold underline' href={'https://maps.google.com/?q=' + booking.place?.address}>{booking.place?.address}</a>
      </div>
      <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
        <h2 className='text-xl'>Your Booking Information</h2>
        <div className='flex flex-row mt-4 items-center justify-evenly'>
          <div className='flex gap-1 flex-col items-center bg-primary p-4 text-white rounded-2xl'>
            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              <div>Total Price:</div>
            </div>
            <div>${booking.price}</div>
          </div>
          <div className='flex flex-col gap-1 align-middle items-center bg-primary p-4 text-white rounded-2xl'>
            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
              <div>{booking.nights} Nights:</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex gap-1 align-middle items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
              </div>

              &rarr;
              <div className='flex gap-1 align-middle items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
              </div>
            </div>
          </div>
        </div>
      </div>
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