import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData]=useState({
    role: '',
    
    experience: '',
    topicsToFocus: "",
    description: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key,value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const navigate= useNavigate();
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;
    if(!role || !experience || !topicsToFocus) {
      setErrors("Please fill in all the required fields.");
      return;
    }
    setErrors("");
    setLoading(true);
    try{
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 18,
      });

      const generatedQuestions = aiResponse.data;
      const responce = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if(responce.data?.session?._id){
        navigate(`/interview-prep/${responce.data?.session?._id}`);
      }



    }catch(error){
      if(error.response && error.response.data.message) {
        setErrors(error.response.data.message);
      }else{
        setErrors("An unexpected error occurred. Please try again.");
      }
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
      <h3 className="text=lg font-semibold text-black">
        Start a new interview journey
      </h3>
      <p className="cc">
        Fill in the details below to create a new session.
      </p>
      <form onSubmit={handleCreateSession} className='flex flex-col gap-3'> 
        <Input
          label="Target Role"
          type="text"
          placeholder="(e.g., Frontend Developer, Backend Engineer)"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          
        />
        <Input
          label="Years of Experience"
          type="text"
          placeholder="{.e.g.,1 year, 3 years, 5+ years}"
          value={formData.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
          
        />
        <Input
          label="Topics to focus on"
          type="text"
          placeholder="{Comma-separated, e.g., React, Node.js, Algorithms}"
          value={formData.topicsToFocus}
          onChange={(e) => handleChange('topicsToFocus', e.target.value)}
          
        />
        <Input
          label="Description"
          type="text"
          placeholder="(Any specified topics, e.g., Focus on system design, data structures, etc.)"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {errors && <p className='text-red-500 text-xs pb-2.5'>{errors}</p>}
        <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>{loading && <SpinnerLoader />} Create Session</button>
      </form>
      
    </div>
  )
}

export default CreateSessionForm
