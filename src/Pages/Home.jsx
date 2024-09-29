import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import homegif from '../assets/homegif.gif'
import './home.css'
import Header from '../Components/Header';
import { viewAllJobAPI } from '../Services/allAPI';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [searchKey,setSearchKey] = useState("")
  const [searchedjobs,setSearchedJobs] = useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)


  const getsearchedJobs = async()=>{
    try {
      const result = await viewAllJobAPI()
      if (result.status === 200) {
        // Filter jobs based on searchKey
        const filteredJobs = result.data.filter(job => 
          job.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          job.category.toLowerCase().includes(searchKey.toLowerCase())
        )
        setSearchedJobs(filteredJobs)
        setSearchPerformed(true)

      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch=()=>{
    if(searchKey==""){
      toast.info("Please enter any category name")
    }
    else{
      getsearchedJobs()
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; 
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentsearchedJobs = searchedjobs.slice(indexOfFirstJob, indexOfLastJob);
   // Change page
   const paginate = (pageNumber) =>{
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(searchedjobs?.length / jobsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
    }
  useEffect(()=>{
    setSearchPerformed(false)
  },[searchKey])
  return (
   <>
   <Header/>
      <div style={{minHeight:"100vh",marginTop:"150px"}} className='bg-white'>
       <div className="row container-fluid justify-content-between align-items-center">
          <div className="col-lg-7 ">
            <h1 className='homehead text-dark '><strong>To Choose</strong> <br /></h1>
            <h1 className='fw-bolder homehead'>Right Jobs.</h1>
              <div className='row mt-3 px-4'>
                <div className="col-lg-2"></div>
                
                <div className='col-lg-8 mt-3 pb-3 py-4 px-3  border border-1 rounded'>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Your job"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      className='rounded bg-light w-50 p-2'
                      onChange={e=>setSearchKey(e.target.value)}
                    />
                    <Button variant='primary' id="button-addon2" className='rounded ms-3' onClick={handleSearch}>
                      Search
                    </Button>
                  </InputGroup>
                  <p className='text-black'>
                  <i className="fa-solid fa-bookmark mx-3 text-primary"></i>
                    Suggested Tags : <span style={{color:"GrayText",fontSize:"17px"}}>Software/Marketing/Developer...</span></p>
  
                </div>
                <div className="col-lg-2"></div>
              </div>
          </div>
          <div className="col-lg-5">
            <img className='img-fluid' src={homegif} alt="homegif" />
          </div>
       </div>

       {/* to display searched jobs */}
       {
        searchPerformed && searchedjobs.length > 0 && (
          <div className="mt-2 container">
            <h3 className='text-primary text-center fw-bolder py-3'>Search Results</h3>
            <div className="row">
              {currentsearchedJobs.map(job => (
                <div key={job.id} className="col-lg-4 mb-3">
                  <div className="card p-3 h-100" >
                    <h5 className='text-center'>{job.title}</h5>
                    <p>{job.description.slice(0,80)}...</p>
                    <Link to={`/viewjobs/${job._id}`}  variant="primary">view</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className='d-flex justify-content-center my-5'>
            { 
            searchedjobs.length>6 &&
              <Pagination>
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
              {Array.from({ length: Math.ceil(searchedjobs.length / jobsPerPage) }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />

            </Pagination>
            }
          </div>
          </div> 
        )
      }
      {
        searchPerformed && searchedjobs.length === 0 && (
          <div className="mt-3 container">
            <h5 className='text-danger text-center fw-bolder'>No jobs found matching your search criteria.</h5>
          </div>
        )
      }
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
   </>
  )
}

export default Home