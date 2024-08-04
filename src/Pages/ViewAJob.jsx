import React, {  useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { saveJobAPI, viewAJobAPI } from '../Services/allAPI'
import { saveReponseContext } from '../Contexts/ContextAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewAJob() {

  const {saveResponse,setSaveResponse} = useContext(saveReponseContext)
  const navigate = useNavigate()

  const [jobDetails,setJobDetails] = useState([])

  console.log(jobDetails);
  const {id} = useParams()
  const getJobDetails = async(id)=>{
  try {
      const result = await viewAJobAPI(id)
      console.log(result);
      if(result.status==200){
          setJobDetails(result.data)
      }
  } catch (error) {
      console.log(error);
  }
  }

  const handleApplyJob = async()=>{
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("user")
    // setApplyResponse()
    if(token && userId){
      navigate('/applyAjob')
    }
    else{
      toast.info("Please login first to apply job")
      navigate('/login')

    }
  }
  
  const handleSaveJob = async()=>{
    const token = sessionStorage.getItem("token")
    const id = jobDetails._id
    console.log(`job id is ${id}`);
    // const {id} = useParams()
    if(token){
      // api call
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
     try {
     const result =  await saveJobAPI(id,jobDetails,reqHeader)
    //  console.log(result.response.data);
    //  alert(result.response.data)
     if(result.status==200){
      toast.success("Job Saved Successfully!")
      // navigate('/userdashboard')
      setSaveResponse(result)
     }
     else{
      toast.warn("Job Already Saved")
     }
     } catch (error) {
      console.log(error);
     }
    }
    else{
      toast.info("Please login first to apply job")
      navigate('/login')

    }
  }

  useEffect(()=>{
      getJobDetails(id)
  },[])
  

  return (
    <>
        <Header insideUserDashboard={true}/>
      <div style={{marginTop:"150px"}} className="row container-fluid justify-content-center align-items-center d-flex">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 p-5 border rounded-5 shadow " >
          <h1 className='text-center'>{jobDetails?.title}</h1>
              <h3>Company Name:{jobDetails?.company}</h3>
              <h3>Location : {jobDetails?.location}</h3>
              <h3>Category : {jobDetails?.category}</h3>
              <h3>Email : {jobDetails?.email}</h3>
              <h3>Description : {jobDetails?.description}</h3>
              <h3>Job type : {jobDetails?.jobType}</h3>
              <h3>Salary : {jobDetails?.salary}</h3>
              <h3>Deadline : {jobDetails?.deadline}</h3>
              <h3>Experience : {jobDetails?.experience}</h3>
              <h3>Vacancies : {jobDetails?.vacancy}</h3>
              <div className="d-flex mt-5 justify-content-evenly">
                <button className="btn btn-warning" onClick={handleSaveJob}>Save</button>
                <button onClick={()=>handleApplyJob(jobDetails?._id)} className="btn btn-primary">Apply</button>
              </div>
          </div>
          <div className="col-lg-2"></div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
    </>
  )
}

export default ViewAJob