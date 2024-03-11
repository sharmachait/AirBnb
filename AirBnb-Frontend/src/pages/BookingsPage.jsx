import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookedCard from '../components/BookedCard';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(res => {
      console.log(res.data.booking);
      setBookings(res.data.booking);
    });
  }, []);
  return (
    <div>{
      bookings.length > 0 && bookings.map((x, i) => (
        <BookedCard booking={x} key={i}></BookedCard>
      ))
    }</div>
  );
}

export default BookingsPage;