import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Uploader from '../components/Uploader';
import Perks from '../components/Perks';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState("13:00");
  const [checkOut, setCheckOut] = useState("12:00");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then(res => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDescription(data.description);

      setPerks(data.perks);

      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return (<h2 className='text-2xl mt-4'>{text}</h2>);
  }
  function inputDescription(text) {
    return (<p className="text-sm text-gray-400">{text}</p>);
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(e) {
    e.preventDefault();
    let { data } = await axios.post('/upload-by-link', { link: photoLink });
    setPhotos(prev => [...prev, data]);
    setPhotoLink('');
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    let response = await axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setPhotos(prev => [...prev, ...response.data]);
  }
  async function savePlace(ev) {
    ev.preventDefault();
    if (id) {
      //update
      const payload = { title, address, photos, photoLink, description, perks, extraInfo, checkIn, checkOut, maxGuest, price };
      const response = await axios.put('/places/' + id, payload);
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status == 201) {
        setRedirect(true);
      }
    }
    else {
      //new
      const payload = { title, address, photos, photoLink, description, perks, extraInfo, checkIn, checkOut, maxGuest, price };
      const response = await axios.post('/places', payload);
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status == 201) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {

    return (<Navigate to={'/account/places'} />);
  }

  return (
    <div>
      <form className="mx-auto lg:max-w-6xl" onSubmit={savePlace}>

        {preInput("Title", "Give a short and catchy title for your accomodation")}
        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Title, for example: My lovely apartment" />

        {preInput("Address", "How to get to your accomodation")}
        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />

        {preInput("Description", "Description of the place")}
        <textarea type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" />

        {preInput("Photos", "More is better")}
        <Uploader uploadPhoto={uploadPhoto} photos={photos} addPhotoByLink={addPhotoByLink} setPhotoLink={setPhotoLink} photoLink={photoLink} setPhotos={setPhotos}></Uploader>

        {preInput("Perks", "What all do you offer")}
        <Perks perks={perks} setPerks={setPerks}></Perks>

        {preInput("Extra information", "Anythin you would like to tell?")}
        <textarea type="text" value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} placeholder="Extra info" />

        {preInput("Check in & out times", "Add the check in and check out times, remember to have a time window for cleaning the accomodation between guests")}
        <div className=" gap-5 justify-evenly grid grid-cols-2 md:grid-cols-4">
          <div className="w-full sm:w-60 mt-2 -mb-1 border rounded-2xl flex flex-col items-center justify-center p-2">
            <h3>Check in time</h3>
            <input type="time" value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
          </div>
          <div className="w-full sm:w-60 mt-2 -mb-1 border rounded-2xl flex flex-col items-center justify-center p-2">
            <h3>Check out time</h3>
            <input type="time" value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
          </div>
          <div className="w-full sm:w-60 mt-2 -mb-1 border rounded-2xl flex flex-col items-center justify-center p-2">
            <h3>Max guests</h3>
            <input value={maxGuest} onChange={e => { setMaxGuest(e.target.value) }} className="border-b max-w-24 text-center border-gray-300 rounded-xl" type="number" />
          </div>
          <div className="w-full sm:w-60 mt-2 -mb-1 border rounded-2xl flex flex-col items-center justify-center p-2">
            <h3>Price ($)</h3>
            <input value={price} onChange={e => { setPrice(e.target.value) }} className="border-b  text-center border-gray-300 rounded-xl" type="number" />
          </div>
        </div>
        <div className="flex justify-center items-center align-middle">
          <button className="flex gap-2 justify-center items-center mt-10 primary max-w-56 mx">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>Save</button>
        </div>

      </form>
    </div>
  );
}

export default PlacesFormPage;