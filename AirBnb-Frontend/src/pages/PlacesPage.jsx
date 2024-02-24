import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Perks from "../components/Perks";

const PlacesPage = () => {
  const { action } = useParams();
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
  return (
    <div>
      {action !== 'new' && (<div className="text-center">
        <Link className="inline-flex gap-1 bg-primary px-6 py-2 rounded-full text-white mt-2"
          to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new Accomodation
        </Link>
      </div>)}
      {action === 'new' && (
        <div>
          <form className="mx-auto lg:max-w-6xl">

            {preInput("Title", "Give a short and catchy title for your accomodation")}
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Title, for example: My lovely apartment" />

            {preInput("Address", "How to get to your accomodation")}
            <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />

            {preInput("Description", "Description of the place")}
            <textarea type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" />

            {preInput("Photos", "More is better")}
            <div className="flex gap-2">
              <input type="text" value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} placeholder="Add a link"></input>
              <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;Photo</button>
            </div>

            <div className="mt-2 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {photos.length > 0 && (photos.map((x, i) => (
                <img className="rounded-2xl" key={i} src={"http://localhost:3000/uploads/" + x}></img>
              )
              ))}
              <label className="flex items-center justify-center gap-2 border bg-transparent text-2xl rounded-2xl p-8 text-gray-500">
                <input type="file" className="hidden" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                <div>Upload</div>
              </label>

            </div>

            {preInput("Perks", "What all do you offer")}
            <Perks selected={perks} onChange={setPerks}></Perks>

            {preInput("Extra information", "Anythin you would like to tell?")}
            <textarea type="text" value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} placeholder="Extra info" />

            {preInput("Check in & out times", "Add the check in and check out times, remember to have a time window for cleaning the accomodation between guests")}
            <div className="flex gap-5 justify-evenly flex-col sm:flex-row sm:">
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
                <input value={maxGuest} onChange={e => { setMaxGuest(e.target.value) }} className="border-b max-w-24 pl-10 border-gray-300 rounded-xl" type="number" />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="flex gap-2 justify-center items-center mt-10 primary max-w-56 mx">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg> Add accomodation</button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;