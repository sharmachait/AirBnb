import { Link, useParams } from "react-router-dom";
import PlacesFormPage from './PlacesFormPage';
const PlacesPage = () => {
  const { action } = useParams();
  let { subpage } = useParams();
  if (subpage === false) subpage = 'profile';
  console.log(subpage);
  console.log(action);
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
        </div>)}
      {action === 'new' && (
        <PlacesFormPage></PlacesFormPage>)}
    </div>
  );
}

export default PlacesPage;