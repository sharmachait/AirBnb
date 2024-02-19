import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto'>
                    <input type="email" placeholder={'Email'} />
                    <input type="password" placeholder={'Password'} />
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