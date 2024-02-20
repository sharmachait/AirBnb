import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function loginUser(e) {
        e.preventDefault();
        try {
            let response = await axios.post('/login', { email, password });
            console.log(response);
            if (response.status == 201) {

                setRedirect(true);
            }
            else
                alert('Login Failed');
        } catch (e) {
            alert('Login Failed');
        }
    }

    if (redirect) {
        return (
            <Navigate to={'/'}>
            </Navigate>
        );
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={loginUser}>
                    <input type="email"
                        placeholder={'Email'}
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder={'Password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Dont have an account yet?
                        <Link className='px-2 underline text-black' to={'/register'}>Register Now.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;