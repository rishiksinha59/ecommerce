import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, handleGoogle  } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
         
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
         
         
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  

  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      )}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === 'Login' ? <p className='cursor-pointer'>Forgot your password?</p> : <p className='cursor-pointer'>Already have an account?</p>}
        {currentState === 'Login' ? (
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create account</p>
        ) : (
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
        )}
      </div>
      <button className='bg-[green] hover:bg-orange-500 duration-150 w-full text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>

    {/* <div onClick={handleGoogle} className='border flex items-center gap-5 w-[90%] sm:max-w-96 mx-auto mt-8 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer'><img src={assets.google_logo} className='w-10' alt="" /> Google Sign In</div> */}
    </>
  );
};

export default Login;
