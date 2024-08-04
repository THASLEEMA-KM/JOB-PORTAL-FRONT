import React from 'react'
import Header from '../Components/Header'
import { Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ApplyJobs() {

  const handleApplyJob = async()=>{
    const token = sessionStorage.getItem("token")
    // setApplyResponse()
    if(token){
      toast.success("Job Applied Successfully!")
      navigate('/viewjobs')
    }
    else{
      toast.info("Please login first to apply job")
      navigate('/login')

    }
  }

  return (
    <>
        <Header insideUserDashboard={true}/>
        <div style={{marginTop:"180px"}} className="justify-content-center align-items-center container-fluid">
        <h1 className="text-center text-primary my-3">APPLY JOB HERE</h1>
        <div className="row d-flex mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6  border p-3 rounded shadow">
          <Form>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Nmae" />
      </FloatingLabel>
          <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      
      <FloatingLabel controlId="floating" label="Upload CV">
        <Form.Control type="file" placeholder="Upload CV" />
      </FloatingLabel>

      <div className="text-center my-3">
        <button onClick={handleApplyJob} className="btn btn-info">APPLY</button>
      </div>
          </Form>
          </div>
          <div className="col-lg-3"></div>
        </div>
        </div>
    </>
  )
}

export default ApplyJobs