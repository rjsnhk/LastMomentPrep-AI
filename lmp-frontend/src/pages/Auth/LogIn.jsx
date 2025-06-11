   import React, { useContext, useState } from 'react'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const LogIn = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser }=useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Handle login logic here
    e.preventDefault();
    if(!validateEmail(email)) {setError('Please enter a valid email address'); return;}
    if(!password) { setError('Please enter a password'); return;}

    setError("");


    //login api call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password,});
      const { token } = response.data;
      if(token){
      localStorage.setItem('token', token);
      updateUser(response.data);
      navigate("/dashboard");
      }
    } catch(error){
      if(error.response && error.response.data.message) setError(error.response.data.message);
      else setError(error.message);
    }
  };

  return (
    
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your email and password to log in
      </p>
      <form onSubmit={handleLogin}>
        <Input
          label="Email Address" 
          type="email"
          placeholder="user@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password" 
          type="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className='btn-primary'>Log In</button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{' '}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
      
    </div>
  )
}

export default LogIn
