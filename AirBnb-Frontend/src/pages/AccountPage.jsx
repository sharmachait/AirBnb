import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
    let { subpage } = useParams();
    if (subpage === undefined) subpage = 'profile';
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

    function styles(type = undefined) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += " bg-primary text-white rounded-full"
        }
        return classes;
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
            <nav className='w-full flex mt-8 justify-center gap-4 mb-8'>
                <Link className={styles('profile')} to={'/account'}>My Profile</Link>
                <Link className={styles('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className={styles('places')} to={'/account/places'}>My Accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className='bg-primary px-6 py-2 rounded-full text-white mt-2'>Logout</button>
                </div>
            )}
        </div>
    );
}

export default AccountPage;