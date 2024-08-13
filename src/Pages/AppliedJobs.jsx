import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { applyReponseContext, deleteAppliedJobResponseContext, updateJobStatusResponseContext } from '../Contexts/ContextAPI'
import { getAppliedJobsAPI, removeAppliedJobAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppliedJobs() {

    const {applyResponse,setApplyResponse} = useContext(applyReponseContext)
    const {deleteAppliedJobResponse,setDeleteAppliedJobResponse} = useContext(deleteAppliedJobResponseContext)
    const {updateJobStatus} = useContext(updateJobStatusResponseContext)
    
    const [userAppliedJobs,setUserAppliedJobs] = useState([])
    console.log(userAppliedJobs);
    
    const getUserAppliedJobs = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              }
              try {
                const result = await getAppliedJobsAPI(reqHeader)
                if(result.status==200){
                 setUserAppliedJobs(result.data)   
                }
              } catch (error) {
                console.log(error);
                
              }
        }
    }
    const handleDeleteAppliedJob = async(jid)=>{
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
          try {
            const result = await removeAppliedJobAPI(jid,reqHeader)
            if(result.status==200){
              setDeleteAppliedJobResponse(result.data)
              // setDeleteAppliedJobResponse(prev => !prev)
                getUserAppliedJobs()
            }
            else{
              console.log(result);
            }
          } catch (error) {
            console.log(error);
          }
        }
    }
    const getStatusClassName = (status) => {
      switch(status) {
          case 'Approved':
              return 'text-success'; // Green for accepted
          case 'Rejected':
              return 'text-danger'; // Red for rejected
          case 'Pending':
              return 'text-warning'; // Yellow for pending
          default:
              return 'text-secondary'; // Default for unknown status
      }
  }
    useEffect(()=>{
      getUserAppliedJobs()
  },[applyResponse,deleteAppliedJobResponse,updateJobStatus])

  return (
    <>
     <Header insideUserDashboard={true}/>   
     <div style={{marginTop:"150px"}}>

        <h1 className="my-3 text-center">All Applications</h1>
        <p className='text-center'>Total Count :{userAppliedJobs?.length}</p>
        <div className='row container-fluid mt-5'>
            <div className="col"></div>
           <div className='col-lg-8'>
                <table className='table border w-100 shadow'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Name</th>
                            <th>User Name</th>
                            <th>email</th>
                            <th>status</th>
                            <th>cv</th>
                            {/* <th>action</th> */}
                            <th><i className="fa-solid fa-ellipsis"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userAppliedJobs?.length>0 ?
                            userAppliedJobs?.map((items,index)=>(
                                <tr key={items?.id}>
                                <td>{index+1}</td>
                                <td>{items?.title}</td>
                                <td>{items?.username}</td>
                                <td>{items?.email}</td>
                                <td className={getStatusClassName(items?.status)}>{items?.status}</td>
                                {/* <td className="items.status=='Approved'?'text-success'">{items?.status}</td> */}

                                <td>{items?.resumeFile}</td>

                                {/* <td>edrtfr</td> */}
                                <td>
                                {/* <button onClick={()=>handleDeleteAppliedJob(items?._id)} className="btn  text-danger"> <i className="fa-solid fa-trash"></i> </button> */}
                                <i onClick={()=>handleDeleteAppliedJob(items?._id)} className="fa-solid fa-trash  text-danger"></i> 
                                </td>
                                </tr>
                            )):
                            <div>
                                no applied jobs
                            </div>
                            }
                    </tbody>
                </table>
           </div>
           <div className="col"></div>

        </div>
    </div>
    <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
    </>
  )
}

export default AppliedJobs

