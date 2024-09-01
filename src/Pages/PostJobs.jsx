import React, { useContext, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import Form from 'react-bootstrap/Form';
import { postjobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addjobResponseContext } from '../Contexts/ContextAPI';
import { useNavigate } from 'react-router-dom';

function PostJobs() {
    const {addJobResponse,setAddJobResponse} = useContext(addjobResponseContext)
    const navigate = useNavigate()
    const [postJob,setPostJob]= useState({
        title:"",salary:"",email:"",company:"",location:"",description:"",category:"",jobType:"",experience:"",vacancy:"",deadline:""
    })
    console.log(postJob);

    const handlePostJob = async()=>
        {
        console.log("Inside post job");
        const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = postJob
        if(postJob.title && postJob.salary && postJob.email && postJob.company && postJob.location && postJob.description && postJob.category && postJob.jobType && postJob.experience && postJob.vacancy && postJob.deadline){

            const token = sessionStorage.getItem("token")
            const adminUser = sessionStorage.getItem("admin")
            console.log(adminUser);
            
            if(token && adminUser){

                const reqHeader = {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                  }
                //   console.log(reqHeader);
                  try {
                    // api call
                    const result = await postjobAPI(postJob,reqHeader)
                    console.log(result);
                    if(result.status==200){
                        toast.success("Job added successfully")
                        setPostJob({
                            title:"",salary:"",email:"",company:"",location:"",description:"",category:"",jobType:"",experience:"",vacancy:"",deadline:""
                        })
                        setAddJobResponse(result)
                        setTimeout(()=>{
                            navigate('/dashboard')
                        },3000)
                    }else{
                        alert(result.response.data)
                        console.log(result.response.data);
                    }
                  } catch (error) {
                    console.log(error);
                  }
            }
            else{
                toast.warn("please Login as admin")
            }


        }else{
            toast.warning("Please fill the form completely")
        }
        
    }
  return (
    <>
     <AdminHeader insideDashboard={true}/>
        <div style={{marginTop:"180px",minHeight:"100vh"}} className="justify-content-center align-items-center container-fluid">
            <h1 className="text-center text-primary my-3">ENTER JOB DETAILS</h1>
            <div className="row d-flex mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 border p-3 rounded shadow">
                    <Form>
                    <Form.Group className="mb-3" controlId="formGroupTitle">
                        <Form.Label className='text-black'>Title : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter title of job"
                        value={postJob.title}
                        onChange={(e)=>setPostJob({...postJob,title:e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupSalary">
                        <Form.Label  className='text-black'>Salary : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Salary" 
                        value={postJob.salary}
                        onChange={(e)=>setPostJob({...postJob,salary:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label  className='text-black'>Email : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="email" placeholder="Enter Email"
                        value={postJob.email}
                        onChange={(e)=>setPostJob({...postJob,email:e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCompany">
                        <Form.Label  className='text-black'>Company : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company name" 
                        value={postJob.company}
                        onChange={(e)=>setPostJob({...postJob,company:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLocation">
                        <Form.Label  className='text-black'>Location : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company Location" 
                        value={postJob.location}
                        onChange={(e)=>setPostJob({...postJob,location:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label  className='text-black'>Description : </Form.Label>
                        <Form.Control
                        className='border rounded p-3 text-black'
                            as="textarea"
                            placeholder="Enter A description about the job"
                            style={{ height: '100px' }}
                            value={postJob.description}
                        onChange={(e)=>setPostJob({...postJob,description:e.target.value})}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCategory">
                        <Form.Label className='text-black'>Category : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar job Category" 
                        value={postJob.category}
                        onChange={(e)=>setPostJob({...postJob,category:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupJobtype">
                        <Form.Label  className='text-black'>Job type : </Form.Label>
                            <select name="" id="" className='form-control w-100 mb-3 border p-3 rounded'
                            value={postJob.jobType}
                            onChange={(e)=>setPostJob({...postJob,jobType:e.target.value})}>
                                <option selected disabled hidden value="">Select job type</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Intern">Intern</option>
                                <option value="Contract">Contract</option>
                            </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupExperience">
                        <Form.Label  className='text-black'>Experience : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar Experience" 
                        value={postJob.experience}
                        onChange={(e)=>setPostJob({...postJob,experience:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupVacancy">
                        <Form.Label  className='text-black'>Vacancy : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Entar job Vacancy"
                        value={postJob.vacancy}
                        onChange={(e)=>setPostJob({...postJob,vacancy:e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDeadline">
                        <Form.Label className='text-black'>Deadline : </Form.Label>
                        <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Entar job Deadline" 
                        value={postJob.deadline}
                        onChange={(e)=>setPostJob({...postJob,deadline:e.target.value})}/>
                    </Form.Group>
                    </Form>
                    <div className='text-center'><button onClick={handlePostJob} className='btn btn-primary'>Submit</button></div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>   
        <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </>
  )
}

export default PostJobs
