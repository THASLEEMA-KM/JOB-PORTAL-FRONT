import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeJobAPI, viewAJobAPI, viewAllJobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Components/AdminHeader';

const ViewJobAdmin = () => {
  const navigate = useNavigate()
  const [allJobs,setAllJobs] = useState([])
  console.log(allJobs);

  useEffect(()=>{
    viewAllJobs()
  },[])


  const viewAllJobs = async()=>{
    try {
      const result = await viewAllJobAPI()
      if(result.status==200){
        setAllJobs(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
//   const handleJobDetails = async ()=>{
//     if(sessionStorage.getItem("token")){
//         // try {
//         //     const result = await viewAJobAPI()
//         //     if(result.status==200){
//         //         navigate(`/${allJobs._id}/viewjobdetailsAdmin`)
//         //     }
    
//         //   } catch (error) {
//         //     console.log(error);
//         //   }
//     //   navigate('/5/viewjobdetailsAdmin')
//     navigate(`/${allJobs._id}/viewjobdetailsAdmin`)

//     }else{
//       toast.warning("Please Login to view job Details")
//     }
//   }

const handledeleteJob = async (jid)=>{
const token = sessionStorage.getItem("token")
if(token){
  const reqHeader = {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`
  }
  try {
    const result = await removeJobAPI(jid,reqHeader)
    if(result.status==200){
      viewAllJobs()
    }
    else{
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}
}
  return (
   <>
    <AdminHeader insideDashboard={true}/>
      <div style={{marginTop:"180px"}}>
      <div className=' align-items-center container-fluid justify-content-center'>
        {/* this is to be dublicated part */}
          <Row className='container-fluid  d-flex ' >
           {
            allJobs.length>0?
            allJobs.map(jobs=>(
              <Col key={jobs?._id} sm={12} md={6} lg={4}>
            <Card className='ms-2 mt-3' style={{ width: '20rem' }}>
                <Card.Body style={{textAlign:"center"}}>
                  <Card.Title className='fs-3'>{jobs?.title}</Card.Title>
                  <Card.Subtitle className="my-2">Company Name : {jobs?.company}</Card.Subtitle>
                  <Card.Text>Salary : {jobs?.salary}</Card.Text>
                  <Card.Text>Deadline : {jobs?.deadline} </Card.Text>
                  <div className='d-flex justify-content-between'>
                    {/* <button className='btn btn-outline-dark' onClick={handleJobDetails}>View Details<i className="fa-solid fa-arrow-right ms-2"></i></button> */}
                    <button className='btn btn-outline-dark'><Link to={`/viewJobsAdmin/${jobs._id}`}>View Details</Link><i className="fa-solid fa-arrow-right ms-2"></i></button>
                    <button onClick={()=>handledeleteJob(jobs?._id)} className="btn text-danger"><i className="fa-solid fa-trash"></i></button>
                    </div>
                </Card.Body>
              </Card>
            </Col>  
            ))
            :
            <div className="text-center text-danger fw-bolder">
              No more jobs to view
            </div>
           
            }
          </Row>   
      </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

   </>
  )
}

export default ViewJobAdmin