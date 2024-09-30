import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Header from '../Components/Header';
import { Col, Pagination, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { viewAJobAPI, viewAllJobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addjobResponseContext, editJobResponseContext } from '../Contexts/ContextAPI';

const ViewJob = () => {

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
        setAllJobs(jobs);
        // setAllJobs(result.data)
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

  return (
   <>
   <Header insideUserDashboard={true}/>
      <div style={{marginTop:"180px",minHeight:"100vh"}}>
      <div className=' align-items-center container-fluid justify-content-center'>
      <h1 className="text-center fw-bolder mt-3 mb-5 text-primary animate__animated animate__bounceIn">Find Your dream Jobs Here..!</h1>
        {/* this is to be dublicated part */}
          <Row className='container-fluid  d-flex justify-content-center' >
           {
            currentJobs.length>0?
            currentJobs.map(jobs=>(
              <Col key={jobs?._id} sm={12} md={6} lg={4} xl={4}>
            <Card className='ms-2 mt-3' style={{ width: 'auto' }}>
                <Card.Body style={{textAlign:"center"}}>
                  <Card.Title className='fs-3'>{jobs?.title}</Card.Title>
                  <Card.Subtitle className="my-2">Company Name : {jobs?.company}</Card.Subtitle>
                  <Card.Text>Salary : {jobs?.salary} PA</Card.Text>
                  <Card.Text>Deadline : {jobs?.deadline} </Card.Text>
                  <div><button className='btn btn-outline-dark'><Link to={`/viewjobs/${jobs._id}`} style={{textDecoration:"none"}}>View Details</Link><i className="fa-solid fa-arrow-right ms-2"></i></button></div>
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
          {
              currentJobs.length> 9 &&
              <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                  {Array.from({ length: Math.ceil(allJobs.length / jobsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </Pagination.Item>
                  ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            </Pagination>
            }
          </div>
      </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

   </>
  )
}

export default ViewJob