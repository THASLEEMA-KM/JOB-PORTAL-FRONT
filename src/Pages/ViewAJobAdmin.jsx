import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import { viewAJobAPI } from '../Services/allAPI';

function ViewAJobAdmin() {
   

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
    useEffect(()=>{
        getJobDetails(id)
    },[])

  return (
    <>
        <AdminHeader insideDashboard={true}/>
      <div style={{marginTop:"150px"}} className="row container-fluid justify-content-center align-items-center d-flex">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 p-5 border rounded-5 shadow">
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
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-outline-primary"><Link style={{textDecoration:"none"}} to={'/viewapplications'}>View Applications</Link></button>
              </div>
          </div>
          <div className="col-lg-2"></div>
      </div>
    </>
  )
}

export default ViewAJobAdmin