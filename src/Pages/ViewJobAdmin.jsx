import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Col, Pagination, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeJobAPI, viewAJobAPI, viewAllJobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Components/AdminHeader';
import { addjobResponseContext, editJobResponseContext } from '../Contexts/ContextAPI';

const ViewJobAdmin = () => {
  const {editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
  const {addJobResponse,setAddJobResponse} = useContext(addjobResponseContext)

  const navigate = useNavigate()
  const [allJobs,setAllJobs] = useState([])
  console.log(allJobs);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const jobsPerPage = 9; // Jobs to display per page
  useEffect(()=>{
    viewAllJobs()
  },[addJobResponse,editJobResponse])


  const viewAllJobs = async()=>{
    try {
      const result = await viewAllJobAPI()
      if(result.status==200){
        const jobs = result.data.map(job => ({
          ...job,
          deadline: new Date(job.deadline).toLocaleDateString(),
        }));
        setAllJobs(jobs)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
    // Change page
    const paginate = (pageNumber) =>{
      if (
        pageNumber >= 1 &&
        pageNumber <= Math.ceil(allJobs?.length / jobsPerPage)
      ) {
        setCurrentPage(pageNumber);
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
      <div style={{marginTop:"180px",minHeight:"100vh"}}>
      <div className=' align-items-center container-fluid justify-content-center'>
        {/* this is to be dublicated part */}
          <Row className='container-fluid  d-flex justify-content-center' >
           {
            currentJobs.length>0?
            currentJobs.map(jobs=>(
              <Col key={jobs?._id} sm={12} md={6} lg={4}>
            <Card className='ms-2 mt-3' style={{ width: '20rem' }}>
                <Card.Body style={{textAlign:"center"}}>
                  <Card.Title className='fs-3'>{jobs?.title}</Card.Title>
                  <Card.Subtitle className="my-2">Company Name : {jobs?.company}</Card.Subtitle>
                  <Card.Text>Salary : {jobs?.salary}PA</Card.Text>
                  <Card.Text>Deadline : {jobs?.deadline} </Card.Text>
                  <div className='d-flex justify-content-between'>
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
          <div className='d-flex justify-content-center my-5'>
            <Pagination>
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
              {Array.from({ length: Math.ceil(allJobs.length / jobsPerPage) }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />

            </Pagination>
          </div>
      </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

   </>
  )
}

export default ViewJobAdmin