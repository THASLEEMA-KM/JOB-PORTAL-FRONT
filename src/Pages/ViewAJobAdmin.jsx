import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import { editAJobAPI, viewAJobAPI } from '../Services/allAPI';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { editJobResponseContext } from '../Contexts/ContextAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewAJobAdmin() {
  const {editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

    const [jobDetails,setJobDetails] = useState([])

    console.log(jobDetails);
    const {id} = useParams()

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    const getJobDetails = async(id)=>{
    try {
        const result = await viewAJobAPI(id)
        console.log(result);
        if(result.status==200){
          const formattedJobDetails = {
            ...result.data,
            deadline: formatDate(result.data.deadline)
          }
          setJobDetails(formattedJobDetails)
          // const job = result.data
          // job.deadline = new Date(job.deadline).toLocaleDateString(); 
          //   setJobDetails(job)
            
        }
    } catch (error) {
        console.log(error);
    }
    }

    const [updatedJob,setUpdatedJob] = useState({
      id:jobDetails._id,
      title:jobDetails.title,
      company:jobDetails.company,
      location:jobDetails.location,
      category:jobDetails.category,
      email:jobDetails.email,
      description:jobDetails.description,
      jobType:jobDetails.jobType,
      salary:jobDetails.salary,
      deadline:jobDetails.deadline,
      experience:jobDetails.experience,
      vacancy:jobDetails.vacancy
    })
    // console.log(updatedJob);
    
    const handleShow = async (id) => {
      setShow(true);
      console.log(id);
      setUpdatedJob({
        id:jobDetails._id,
        title:jobDetails.title,
        company:jobDetails.company,
        location:jobDetails.location,
        category:jobDetails.category,
        email:jobDetails.email,
        description:jobDetails.description,
        jobType:jobDetails.jobType,
        salary:jobDetails.salary,
        deadline:jobDetails.deadline,
        experience:jobDetails.experience,
        vacancy:jobDetails.vacancy
      })
    }
    const handleClose = () => {
      setShow(false);
      setUpdatedJob({
        id:jobDetails._id,
        title:jobDetails.title,
        company:jobDetails.company,
        location:jobDetails.location,
        category:jobDetails.category,
        email:jobDetails.email,
        description:jobDetails.description,
        jobType:jobDetails.jobType,
        salary:jobDetails.salary,
        deadline:jobDetails.deadline,
        experience:jobDetails.experience,
        vacancy:jobDetails.vacancy
      })
    }
    const handleUpdateJob = async()=>{
      const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = updatedJob
      if(updatedJob.title && updatedJob.salary && updatedJob.email && updatedJob.company && updatedJob.location && updatedJob.description && updatedJob.category && updatedJob.jobType && updatedJob.experience && updatedJob.vacancy && updatedJob.deadline){

        const token = sessionStorage.getItem("token")
        if(token){
          try {
            const reqHeader = {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
            }
            const result = await editAJobAPI(id,updatedJob,reqHeader)
            console.log(result);
            
            if(result.status==200){
              setEditJobResponse(result)
              toast.success("Job Updation success")
              // setEditJobResponse(result)
              handleClose()
              setTimeout(()=>{
              navigate('/viewJobsAdmin')
              },3000)
            }
            else{
              console.log(result.response);              
            }
          } catch (error) {
            console.log(error);
            
          }
        }
      }
      else{
        toast.error("Please fill the form completely!!")
      }
    }
    useEffect(()=>{
        getJobDetails(id)
    },[editJobResponse])

  return (
    <>
        <AdminHeader insideDashboard={true}/>
      <div style={{marginTop:"150px",height:"100vh"}} className="row container-fluid justify-content-center align-items-center d-flex">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 p-5 border rounded-5 shadow">
            <h1 className='text-center'>{jobDetails?.title}</h1>
              <h3>Company Name:{jobDetails?.company}</h3>
              <h3>Location : {jobDetails?.location}</h3>
              <h3>Category : {jobDetails?.category}</h3>
              <h3>Email : {jobDetails?.email}</h3>
              <h3>Description : {jobDetails?.description}</h3>
              <h3>Job type : {jobDetails?.jobType}</h3>
              <h3>Salary : {jobDetails?.salary}/-</h3>
              <h3>Deadline : {jobDetails?.deadline}</h3>
              <h3>Experience : {jobDetails?.experience} Year(s)</h3>
              <h3>Vacancies : {jobDetails?.vacancy}</h3>
              
              <div className="d-flex mt-5 justify-content-evenly">
                <button onClick={()=>handleShow(jobDetails?._id)} className="btn btn-warning">Edit</button>
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
                          value={updatedJob?.title}
                          onChange={(e)=>setUpdatedJob({...updatedJob,title:e.target.value})}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupSalary">
                          <Form.Label  className='text-black'>Salary : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Salary" 
                          value={updatedJob?.salary}
                          onChange={(e)=>setUpdatedJob({...updatedJob,salary:e.target.value})}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupEmail">
                          <Form.Label  className='text-black'>Email : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="email" placeholder="Enter Email"
                           value={updatedJob?.email}
                           onChange={(e)=>setUpdatedJob({...updatedJob,email:e.target.value})}
/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupCompany">
                          <Form.Label  className='text-black'>Company : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company name" 
                          value={updatedJob?.company}
                          onChange={(e)=>setUpdatedJob({...updatedJob,company:e.target.value})}

                          />
                      </Form.Group>
                   </div>

                    <div className='d-flex justify-content-between'>
                      <Form.Group className="mb-3 me-2" controlId="formGroupLocation">
                          <Form.Label  className='text-black'>Location : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company Location" 
                          value={updatedJob?.location}
                          onChange={(e)=>setUpdatedJob({...updatedJob,location:e.target.value})}
/>
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupCategory">
                          <Form.Label className='text-black'>Category : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Category" 
                         value={updatedJob?.category}
                         onChange={(e)=>setUpdatedJob({...updatedJob,category:e.target.value})}
/>
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupExperience">
                          <Form.Label  className='text-black'>Experience : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Experience" 
                         value={updatedJob?.experience}
                         onChange={(e)=>setUpdatedJob({...updatedJob,experience:e.target.value})}
/>
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupVacancy">
                          <Form.Label  className='text-black'>Vacancy : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Vacancy"
                           value={updatedJob?.vacancy}
                           onChange={(e)=>setUpdatedJob({...updatedJob,vacancy:e.target.value})}
/>
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupJobtype">
                          <Form.Label  className='text-black'>Job type : </Form.Label>
                              <select name="" id="" className='form-control mb-3 border p-3 w-100 rounded'
                            
                            value={updatedJob?.jobType}
                            onChange={(e)=>setUpdatedJob({...updatedJob,jobType:e.target.value})}
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
                          <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Enter job Deadline" 
                          value={updatedJob?.deadline}
                          onChange={(e)=>setUpdatedJob({...updatedJob,deadline:e.target.value})}
/>
                      </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label  className='text-black'>Description : </Form.Label>
                        <Form.Control
                        className='border rounded p-3 text-black'
                            as="textarea"
                            placeholder="Enter A description about the job"
                            // style={{ height: '100px' }}
                            style={{height: '100px'}}
                            value={updatedJob?.description}
                            onChange={(e)=>setUpdatedJob({...updatedJob,description:e.target.value})}

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
              <Button onClick={handleUpdateJob} variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
      </div>
    </>
  )
}

export default ViewAJobAdmin