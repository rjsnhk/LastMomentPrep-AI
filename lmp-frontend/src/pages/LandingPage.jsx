import React, { useContext, useState } from 'react'
import { APP_FEATURES } from '../utils/data'
import {LuSparkles } from 'react-icons/lu'
import hero from '../assets/hero.png'
import Modal from '../components/Modal'
import LogIn from './Auth/LogIn'
import SignUp from './Auth/SignUp'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
const LandingPage = () => {
  const {user} =useContext(UserContext);
  const navigate=useNavigate();
  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login");
  const handleCTA=()=>{
    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate('/dashboard');
    }
  }
  return (
    <>
    <div className='w-full min-h-full bg-[#FFFCEF] '>
      <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/*header*/}
          <header className="flex items-center justify-between mb-16">
            <div className="text-xl text-black font-bold">
              LastMomentPrep AI
            </div>
            {user ? (<ProfileInfoCard />) : (<button className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer" onClick={()=> setOpenAuthModal(true)}>
              Login/Signup
            </button>)}
          </header>


<div className="flex flex-col md:flex-row items-center">
  <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
    <div className="flex items-center justify-left mb-2">
      <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 ">
        <LuSparkles /> Ai Powered
      </div>
    </div>
    <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
      Ace Interview with <br />
      <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
         Ai powered
      </span>{" "}
      Learning
    </h1>
  </div>
  <div className="w-full md:w-1/2">
    <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
      Get interview questions and model answers based on your role, experience, and specific focus areas — no filler, just what matters. 
    </p>
    <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer" onClick={handleCTA}>
      Get Started
    </button>
  </div>
</div>


        </div>
      </div>
    <div className="w-full min-h-full relative z-10">
      <div>
        <section className='flex items-center justify-center -mt-36'>
<img src={hero} alt="" className='w-[80vw] rounded-lg' />
        </section>
      </div>

      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-6 pb-20">
          <section className='mt-5'>
          <h2 className="text-2xl font-medium text-center mb-12">
            Features of Interview Prep AI
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {APP_FEATURES.slice(0,3).map((feature) => (
                <div className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100" key={feature.id}>
                  <h3 className='text-base font-semibold mb-3'>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
            </div>
              ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              {APP_FEATURES.slice(3).map((feature) => (
                <div className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100" key={feature.id}>
                  <h3 className='text-base font-semibold mb-3'>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
            </div>
              ))}
              </div>
              </div>
          
          </section></div>
      </div>

      <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
        Made With rjsnhk ❤️
      </div>

    </div>

    <Modal isOpen={openAuthModal} onClose={() => {setOpenAuthModal(false);
    setCurrentPage("login");
    }
    } hideHeader>
      <div>
        {currentPage==="login"&& <LogIn setCurrentPage={setCurrentPage} />}
        {currentPage==="signup"&& <SignUp setCurrentPage={setCurrentPage} />}
      </div>
      </Modal>
    </>
  )
}

export default LandingPage
