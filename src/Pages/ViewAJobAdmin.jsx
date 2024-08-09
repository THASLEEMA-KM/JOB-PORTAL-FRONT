import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import { viewAJobAPI } from '../Services/allAPI';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

function ViewAJobAdmin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <button onClick={handleShow} className="btn btn-warning">Edit</button>
                <button className="btn btn-outline-primary"><Link style={{textDecoration:"none"}} to={`/viewJobsAdmin/${jobDetails?._id}/viewapplications`}>View Applications</Link></button>
              </div>
          </div>
          <div className="col-lg-2"></div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg">
            <Modal.Header closeButton>
              <Modal.Title className='fw-bolder text-info'>Edit Job Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                   <div className='d-flex justify-content-between'>
                      <Form.Group className="mb-3 me-2" controlId="formGroupTitle">
                          <Form.Label className='text-black'>Title : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter title of job"
                          />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupSalary">
                          <Form.Label  className='text-black'>Salary : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Salary" 
                          // value={postJob.salary}
                          // onChange={(e)=>setPostJob({...postJob,salary:e.target.value})}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupEmail">
                          <Form.Label  className='text-black'>Email : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="email" placeholder="Enter Email"
                           />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupCompany">
                          <Form.Label  className='text-black'>Company : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company name" 
                          />
                      </Form.Group>
                   </div>

                    <div className='d-flex justify-content-between'>
                      <Form.Group className="mb-3 me-2" controlId="formGroupLocation">
                          <Form.Label  className='text-black'>Location : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company Location" 
                          />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupCategory">
                          <Form.Label className='text-black'>Category : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar job Category" 
                         />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupExperience">
                          <Form.Label  className='text-black'>Experience : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar Experience" 
                         />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupVacancy">
                          <Form.Label  className='text-black'>Vacancy : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar job Vacancy"
                           />
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupJobtype">
                          <Form.Label  className='text-black'>Job type : </Form.Label>
                              <select name="" id="" className='form-control mb-3 border p-3 w-100 rounded'
                            
                              // value={postJob.jobType}
                              // onChange={(e)=>setPostJob({...postJob,jobType:e.target.value})}
                              >
                                  <option selected disabled hidden value="">Select job type</option>
                                  <option value="Part Time">Part Time</option>
                                  <option value="Full Time">Full Time</option>
                                  <option value="Intern">Intern</option>
                                  <option value="Contract">Contract</option>
                              </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDeadline">
                          <Form.Label className='text-black'>Deadline : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Entar job Deadline" />
                      </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label  className='text-black'>Description : </Form.Label>
                        <Form.Control
                        className='border rounded p-3 text-black'
                            as="textarea"
                            placeholder="Enter A description about the job"
                            // style={{ height: '100px' }}
                            style={{height: '100px'}}
                            />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formGroupDeadline">
                          <Form.Label className='text-black'>Deadline : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Entar job Deadline" 
                          />
                      </Form.Group> */}


                    </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>

      </div>
    </>
  )
}

export default ViewAJobAdmin