import { useContext, useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const BookingCard = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    setName(user.name);
  }, [user]);

  function handleNumberOfGuestsChange(e) {
    const inputValue = parseInt(e.target.value);
    // Check if the input value exceeds the maximum number of guests
    if (inputValue >= place.maxGuests) {
      // If it exceeds, set the number of guests to the maximum value
      setNumberOfGuests(place.maxGuests);
    } else {
      // If it doesn't exceed, update the state with the input value
      setNumberOfGuests(inputValue);
    }
  }
  async function book() {
    console.log(place);
    const data = {
      checkIn,
      checkOut,
      guests: numberOfGuests,
      phone: number,
      name,
      placeId: place._id,
      nights: differenceInCalendarDays(checkOut, checkIn) > 0 && differenceInCalendarDays(checkOut, checkIn),
      price: differenceInCalendarDays(checkOut, checkIn) > 0 && differenceInCalendarDays(checkOut, checkIn) * place?.price
    }
    const response = await axios.post('/booking', data,);
    const bookingId = response.data._id;
    setRedirect(`/booked/${bookingId}`);
  }
  if (redirect !== '') {
    return (<Navigate to={redirect}></Navigate>);
  }
  return (
    <div>
      <div className='bg-white  md:w-full xl:w-[500px] p-4 rounded-2xl shadow-md'>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-xl  p-4 rounded-xl'>
            Price: ${place?.price} / per night
          </div>
          <div className="flex flex-col border w-[100%] rounded-xl items-center ">
            <div className='p-4 flex gap-2'>
              <div>Guests:</div>
              <input
                type="number"
                value={numberOfGuests}
                onChange={handleNumberOfGuestsChange}
                className="border-b text-center border-gray-300 rounded-xl max-w-16"
              />
            </div>
            <div className="flex flex-col lg:flex-row border-t w-full justify-center">
              <div className='flex flex-col lg:items-start justify-center py-4 px-4 '>
                <label htmlFor="">Check in date</label>
                <input type="date" className="w-11/12" value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
              </div>
              <div className='flex flex-col lg:items-start justify-center md:border-l py-4 px-4 '>
                <label htmlFor="">Check out date</label>
                <input type="date" className="w-11/12" value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
              </div>
            </div>
            {
              !isNaN(differenceInCalendarDays(checkOut, checkIn)) && differenceInCalendarDays(checkOut, checkIn) > 0 && (
                <>
                  <div className="py-3 px-4 border-t">
                    <label>Your Name: </label><br />
                    <input type="text" value={name} onChange={e => { setName(e.target.value) }} />
                  </div>
                  <div className="py-3 px-4 border-t">
                    <label>Your Number: </label><br />
                    <input type="tel" value={number} onChange={e => { setNumber(e.target.value) }} className="border-b text-center border-gray-300 rounded-xl" />
                  </div>
                </>
              )
            }
          </div>
          <button onClick={book} className='primary mt-4'>
            Book Now ${!isNaN(differenceInCalendarDays(checkOut, checkIn)) && differenceInCalendarDays(checkOut, checkIn) > 0 && differenceInCalendarDays(checkOut, checkIn) * place?.price}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingCard