import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

const AccountPage = () => {
  let { subpage } = useParams();
  // if (subpage === undefined) subpage = 'profile';

  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  if (!ready) {
    return 'Loading...';
  }
  if (ready && !user && !redirect) {
    return (
      <Navigate to={'/login'}>
      </Navigate>
    );
  }


  async function logout() {
    await axios.post('/logout');
    setUser(null);
    setRedirect(true);
  }
  if (redirect) {
    return (
      <Navigate to='/'></Navigate>
    );
  }
  return (
    <div>
      <AccountNav></AccountNav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className='bg-primary px-6 py-2 rounded-full text-white mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPage></PlacesPage>
        </div>
      )}
    </div>
  );
}

export default AccountPage;