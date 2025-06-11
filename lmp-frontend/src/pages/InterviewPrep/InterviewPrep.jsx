import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import moment from 'moment';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponcePreview from './components/AIResponcePreview';
import Drawer from '../../components/Drawer';
import SkeltonLoader from '../../components/Loader/SkeltonLoader';
// import motion from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';

import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import toast from 'react-hot-toast';

const InterviewPrep = () => {
   const { sessionId } = useParams();
   const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);


  const fetchSessionDetailById = async () => {
    try{
      const responce = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if(responce.data&&responce.data.session) {
        setSessionData(responce.data.session);
      }
    }
    catch(error) {
      console.error("Error fetching session details:", error);
    }
  };
  const generateConceptExplanation = async (question) => {
      try{
        setErrors("");
        setExplanation(null);
        setLoading(true);
        setOpenLeanMoreDrawer(true);
        const responce =await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION,{
          question,
        });
        if(responce.data){
          setExplanation(responce.data);
        }
      }catch(error) {
        setExplanation(null);
        setErrors("Failed to generate explanation,try again.");
        console.error("Error fetching session details:", error);
      }finally{
        setLoading(false);
      }
  };
  const toggleQuestionPinStatus = async (questionId) => {
    try{
      const responce =await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      console.log(responce);
      if(responce.data&&responce.data.question) {
        fetchSessionDetailById();
      }
    }catch(error){
      console.error("Errors : ",error);
    }
  };
  const uploadMoreQuestions = async () => {
    try{
      setIsUpdateLoader(true);
      const aiResponce= await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponce.data;
      const responce = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
        sessionId,
        questions: generatedQuestions,
      });
      if(responce.data){
        toast.success("Addes More Q&A !!");
        fetchSessionDetailById();
      }

    }catch(error){
      if(error.response && error.response.data.message) {
        setErrors(error.response.data.message);
      }
      else {
        setErrors("Something went wrong . Please try again.");
      }
    }finally{
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailById();
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);


  return (
    <DashboardLayout>
      <RoleInfoHeader role={sessionData?.role||""} topicsToFocus={sessionData?.topicsToFocus||""} experience={sessionData?.experience||"-"} questions={sessionData?.questions?.length||"-"} description={sessionData?.description||""} lastUpdated={
        sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""} />
        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 ">
          <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
          <div className="grid grid-cols-12 gap-4  mt-5 mb-10">
            <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"} `}>
          <AnimatePresence>
            {sessionData?.questions?.map((data,idx)=>{
              return (
                <motion.div key={data._id||idx} initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} exit={{opacity:0, scale:0.95}} transition={{duration:0.3, type:"spring", stiffness:100, delay:idx*0.1, damping:15, }} layout layoutId={`question-${data._id||idx}`} >
                  <>

                  <QuestionCard question={data?.question} answer={data?.answer} onLearnMore={()=> generateConceptExplanation(data.question)} isPinned={data?.isPinned} onTogglePin={()=>toggleQuestionPinStatus(data._id)} />
                  

                  {
                    !loading && sessionData?.questions.length== idx+1 && (
                      <div className="flex items-center justify-center mt-5">
                        <button className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer' disabled={loading||isUpdateLoader} onClick={uploadMoreQuestions}>
{isUpdateLoader ? (<SpinnerLoader />):(<LuListCollapse className='text-lg' />)}(" ")
Load More
                        </button>
                      </div>
                    )
                  }
                  </>
                  </motion.div>
              )
            })}
          </AnimatePresence>
            </div>
          </div>
          <div className="cc">
            <Drawer isOpen={openLeanMoreDrawer} onClose={()=>setOpenLeanMoreDrawer(false)} title={!loading && explanation?.title} >
              {errors && <p className="flex gap-2 text-sm text-amber-600 font-medium"> <LuCircleAlert className='mt-1' /> {errors}</p>}
              {loading && <SkeltonLoader /> }
              {
                !loading && explanation &&(
                  <AIResponcePreview content={explanation?.explanation} />
                )
              }
            </Drawer>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default InterviewPrep
