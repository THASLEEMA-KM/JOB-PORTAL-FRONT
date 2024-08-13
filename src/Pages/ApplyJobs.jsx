import React, { useContext, useState } from 'react'
import Header from '../Components/Header'
import { Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { applyJobAPI } from '../Services/allAPI';
import SERVER_URL from '../Services/serverURL';
import { applyReponseContext } from '../Contexts/ContextAPI';

function ApplyJobs() {
  const {applyResponse,setApplyResponse} = useContext(applyReponseContext)

const navigate = useNavigate()
  const {id} = useParams()
  const email = JSON.parse(sessionStorage.getItem('user'))?.email;

  console.log(email);
  
  

  const [appliedJobs,setAppliedJobs] = useState({
    jobId: id,
    title:applyResponse.title || "",
    username:"",
    email,
    mobile:"",
    resumeFile:null
  })

  console.log(appliedJobs);
  

  const handleApplyAJob = async (e) =>{
   e.preventDefault()
    const {title,username,email,mobile,resumeFile} = appliedJobs
    if(appliedJobs.title && appliedJobs.username && appliedJobs.email && appliedJobs.mobile && appliedJobs.resumeFile)
      {
          console.log("Insied apply job funct");
          
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("mobile",mobile)
            reqBody.append("resumeFile",resumeFile)

            console.log(reqBody);
            
            const token = sessionStorage.getItem("token")
            // const userId =JSON.parse(sessionStorage.getItem('user'))?._id;
            const userId = sessionStorage.getItem("user")
            console.log(userId);
            // const {id} = useParams()
            // console.log(id);

          if(token && userId){
              console.log("api calling function");
              // alert("api call to be")
            const reqHeader = {
              "Content-Type" : "multipart/form-data",
              "Authorization" : `Bearer ${token}`
            };

            console.log("Request Headers:", reqHeader);
            console.log("Request Body:", reqBody);
            // alert("make api call")
            
            try {
              const result = await applyJobAPI(id,reqBody,reqHeader)
              console.log(result);
              console.log("line 70 inside try");
              
              if(result.status==200){
                  toast.success("Job Applied Successfully!")
                  setApplyResponse(result)
                  setAppliedJobs({
                    jobId: id,
                    title:applyResponse.title || "",
                    username:"",
                    email:"",
                    mobile:"",
                    resumeFile:null
                  })
                  navigate('/viewjobs')
              }else{
                // toast.warning("job already applied")
                  toast.warning(result.response.data)
              }
            }catch(error) { 
              console.log(error);
              console.error("Error applying for job:", error);
              // toast.error("Something went wrong. Please try again later.");
            
            }

            // try {
            //   const result =  await applyJobAPI(id,appliedJobs,reqHeader)
            //   if(result.status==200){
            //    toast.success("Job Applied Successfully!")
            //    setApplyResponse(result)
            //       setAppliedJobs({
            //         _id:id,
            //         title:applyResponse.title || "",
            //         username:"",
            //         email:"",
            //         mobile:"",
            //         resumeFile:null
            //       })
            //   }
            //   else{
            //    toast.warning("Job Already Applied")
            //   }
            //   } catch (error) {
            //    console.log(error);
            //   }
          }
      }else{
        alert("Please fill the form completely")
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

              <FloatingLabel controlId="floatingTitle" label="Job Name" className="mb-3">
                <Form.Control type="text" placeholder="Job Name"
                value={appliedJobs.title}
                readOnly
                // onChange={(e)=>setAppliedJobs({...appliedJobs,title:e.target.value})}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control type="text" placeholder="User name" 
                value={appliedJobs.username}
                onChange={(e)=>setAppliedJobs({...appliedJobs,username:e.target.value})}/>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" 
                value={appliedJobs.email}
                readOnly
                // onChange={(e)=>setAppliedJobs({...appliedJobs,email:e.target.value})}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingMobile" label="Mobile Number" className="mb-3">
                <Form.Control type="text" placeholder="Mobile Number"  
                value={appliedJobs.mobile}
                onChange={(e)=>setAppliedJobs({...appliedJobs,mobile:e.target.value})}/>
              </FloatingLabel>
              
              <FloatingLabel controlId="floating" label="Upload CV">
                <Form.Control type="file" placeholder="Upload CV" 
                // value={`${SERVER_URL}/uploads/${appliedJobs.resumeFile}`}
                onChange={(e)=>setAppliedJobs({...appliedJobs,resumeFile:e.target.files[0]})}/>
              </FloatingLabel>

              <div className="text-center my-3">
                <button type='button' onClick={handleApplyAJob} className="btn btn-info">APPLY</button>
              </div>
          </Form>
          </div>
          <div className="col-lg-3"></div>
        </div>
        </div>
        <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </>
  )
}

export default ApplyJobs

