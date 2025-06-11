import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../contexts/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const { updateUser } =useContext(UserContext);

  const handleSignUp = async (e) => {
    // Handle SignUp logic here
    e.preventDefault();
    if(!fullName) { setError('Please enter a full name'); return;}
    if(!validateEmail(email)) {setError('Please enter a valid email address'); return;}
    if(!password) { setError('Please enter a password'); return;}
    

    setError('');


    //signuop api call
    try{
       if (profilePic) {
    const imgUploadRes = await uploadImage(profilePic);
    const profileImageUrl = imgUploadRes.imageUrl || "";
    
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name: fullName,
      email,
      password,
      profileImageUrl,
    });

    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate('/dashboard');
    }
  }
    } catch(error){
      if(error.response && error.response.data.message) setError(error.response.data.message);
      else setError(error.message);
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className="text-lg font-semibold text-black ">
        Create an Acount
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join use today by entering your details below
      </p>
<form action="" onSubmit={handleSignUp}>

  <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
<div className="grid grid-cols-1 md:grid-cols-1 gap-2">
  <Input
    label="Full Name" 
    type="text"
    placeholder="John Doe"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)} required
  />
  <Input
    label="Email Address" 
    type="email"  
    placeholder="user@gmail.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)} required
  />
  <Input
    label="Password" 
    type="password"
    placeholder="Min 8 characters"
    value={password}
    onChange={(e) => setPassword(e.target.value)} required
  />
  
</div>

{error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

<button type="submit" className="btn-primary">
  Sign Up
</button>

<p className="text-[13px] text-slate-800 mt-3">
  Already have an account?{' '}
  <button className="text-primary font-medium underline cursor-pointer" onClick={() => setCurrentPage('login')}>
    Log In
  </button>
</p>

</form>

    </div>
  )
}

export default SignUp
