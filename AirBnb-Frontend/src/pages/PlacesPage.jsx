import { Link, useParams } from "react-router-dom";
import PlacesFormPage from './PlacesFormPage';
import { useEffect, useState } from "react";
import axios from "axios";
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  function getDescription(desc) {
    let words = desc.split(' ');
    if (words.length < 30) return desc;
    let s = '';
    for (let i = 0; i <= 30; i++) {
      s += words[i] + " ";
    }
    return s;
  }

  const { action } = useParams();
  let { subpage } = useParams();
  if (subpage === false) subpage = 'profile';
  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary px-6 py-2 rounded-full text-white mt-2"
            to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new Accomodation
          </Link>
          <div className="mt-4">
            {places.length > 0 && places.map((place) => (
              <div key={place._id} className="mx-auto mb-4 lg:max-w-6xl bg-gray-200 p-4 rounded-2xl flex gap-4 cursor-pointer">
                <Link to={'/account/places/' + place._id} className="max-w-32 sm:max-w-48 lg:max-w-64 grow shrink-0">
                  {place.photos.length > 0 && <img className="rounded-2xl w-full object-cover" src={"http://localhost:3000/uploads/" + place.photos[0]} />}
                </Link>
                <div className="flex flex-col shrink">
                  <h2 className="text-sm font-bold md:text-xl md:font-normal">{place.title}</h2>
                  <br />
                  <div className="line-clamp-2 max-w-3xl mt-2 text-sm md:text-lg">{place.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>)}
      {action === 'new' && (
        <PlacesFormPage></PlacesFormPage>)}
    </div>
  );
}

export default PlacesPage;