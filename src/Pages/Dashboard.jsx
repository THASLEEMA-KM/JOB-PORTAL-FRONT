import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import homeimage from '../assets/homeimg1.png'
import './home.css'
import { viewAllJobAPI } from '../Services/allAPI';

function Dashboard() {
  const [searchKey,setSearchKey] = useState("")
  const [searchedjobs,setSearchedJobs] = useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)

  const getsearchedJobs = async()=>{
    try {
      const result = await viewAllJobAPI()
      if (result.status === 200) {
        // Filter jobs based on searchKey
        const filteredJobs = result.data.filter(job => 
          job.title.toLowerCase().includes(searchKey.toLowerCase())
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
      alert("Please enter any category name")
    }
    else{
      getsearchedJobs()
    }
  }
  useEffect(()=>{
    setSearchPerformed(false)
  },[searchKey])
  return (
    <>
        <AdminHeader insideDashboard={true}/>
        <div style={{height:"100vh",marginTop:"150px"}} className='bg-white'>
       <div className="row container-fluid justify-content-between align-items-center">
          <div className="col-lg-7 ">
            <h1 className='homehead text-dark '><strong>To Choose</strong> <br />
            <span className='fw-bolder homehead'>Right Jobs.</span></h1>
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
                    <Button variant="primary" id="button-addon2" className='rounded ms-3' onClick={handleSearch}>
                      Search
                    </Button>
                  </InputGroup>
                  <p className='text-black'>
                  <i className="fa-solid fa-bookmark mx-3 text-primary"></i>
                    Suggested Tags : <span style={{color:"GrayText",fontSize:"17px"}}>Software/Marketing/UI-UX Developer...</span></p>
  
                </div>
                <div className="col-lg-2"></div>
              </div>
          </div>
          <div className="col-lg-5">
            <img className='img-fluid' src={homeimage} alt="" />
          </div>
       </div>
              {/* to display searched jobs */}

              {
        searchPerformed && searchedjobs.length > 0 && (
          <div className="mt-2 container">
            <h3>Search Results</h3>
            <div className="row">
              {searchedjobs.map(job => (
                <div key={job.id} className="col-lg-4 mb-3">
                  <div className="card p-3">
                    <h5>{job.title}</h5>
                    <p>{job.description}</p>
                    <Link to={`/viewjobs/${job._id}`}  variant="primary">view</Link>
                  </div>
                </div>
              ))}
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
    </>
  )
}

export default Dashboard