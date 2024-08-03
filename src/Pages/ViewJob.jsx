import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Header from '../Components/Header';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { viewAJobAPI, viewAllJobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewJob = () => {
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

  // const handleJobDetails = async ()=>{
  //   if(sessionStorage.getItem("token")){
  //     // try {
  //     //   const result = await viewAJobAPI()
  //     //   if(result.status==200){
  //     //       navigate(`/${allJobs._id}/viewjobdetails`)
  //     //   }

  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //     navigate(`/${allJobs.id}/viewjobdetails`)

  //   }else{
  //     toast.warning("Please Login to view job Details")
  //   }
  // }

  return (
   <>
   <Header insideUserDashboard={true}/>
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
                  <div><button className='btn btn-outline-dark'><Link to={`/viewjobs/${jobs._id}/viewjobdetails`} style={{textDecoration:"none"}}>View Details</Link><i className="fa-solid fa-arrow-right ms-2"></i></button></div>
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

export default ViewJob