import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post('/register', {
                name, email, password
            });
            alert("Registered succefully, now you can login!");
        } catch (e) {
            alert('Invalid email!');
        }
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text"
                        placeholder={'Your Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input
                        type="email"
                        placeholder={'Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder={'Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member?
                        <Link className='px-2 underline text-black' to={'/login'}>Login.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;