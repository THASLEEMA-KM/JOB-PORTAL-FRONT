import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { applyReponseContext, deleteAppliedJobResponseContext, updateJobStatusResponseContext } from '../Contexts/ContextAPI'
import { getAppliedJobsAPI, removeAppliedJobAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from 'react-bootstrap';

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

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const jobsPerPage = 10; // Jobs to display per page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentAppliedJobs = userAppliedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) =>{
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(userAppliedJobs?.length / jobsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
    //  setCurrentPage(pageNumber);
    }

    useEffect(()=>{
      getUserAppliedJobs()
  },[applyResponse,deleteAppliedJobResponse,updateJobStatus])

  return (
    <>
     <Header insideUserDashboard={true}/>   
     <div style={{marginTop:"150px",minHeight:"100vh"}}>

        <h1 className="my-3 text-center">All Applications</h1>
        <p className='text-center'>Total Count :{userAppliedJobs?.length}</p>
        <div className='row container-fluid mt-5 d-flex'>
            <div className="col"></div>
           <div className='col-lg-8'>
                <table className='table border w-100 shadow'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>CV</th>
                            {/* <th>action</th> */}
                            <th><i className="fa-solid fa-ellipsis"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentAppliedJobs?.length>0 &&
                            currentAppliedJobs?.map((items,index)=>(
                                <tr key={items?.id}>
                                <td>{index+1}</td>
                                <td>{items?.title}</td>
                                <td>{items?.username}</td>
                                <td>{items?.email}</td>
                                <td className={getStatusClassName(items?.status)}>{items?.status}</td>
                                {/* <td className="items.status=='Approved'?'text-success'">{items?.status}</td> */}

                                {/* <td>{items?.resumeFile}</td> */}
                                <td>
                                 <a style={{textDecoration:"none"}}  href={items?.resumeFile} download target="_blank" rel="noopener noreferrer">
            View CV
          </a>
                                 </td>

                                {/* <td>edrtfr</td> */}
                                <td>
                                {/* <button onClick={()=>handleDeleteAppliedJob(items?._id)} className="btn  text-danger"> <i className="fa-solid fa-trash"></i> </button> */}
                                <i onClick={()=>handleDeleteAppliedJob(items?._id)} className="fa-solid fa-trash  text-danger"></i> 
                                </td>
                                </tr>
                            ))
                            // :
                            // <div>
                            //     no applied jobs
                            // </div>
                            }
                    </tbody>
                </table>
                {
                            currentAppliedJobs?.length==0 &&
                        <div className='fw-bolder text-center text-danger'>
                            NO APPLICATIONS YET!!!
                        </div>
                        }
                {
                  userAppliedJobs.length>10 &&
                  <div className='d-flex justify-content-center my-5'>
                  <Pagination>
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(userAppliedJobs.length / jobsPerPage) }, (_, i) => (
                      <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} />

                  </Pagination>
                </div>}
           </div>
           <div className="col"></div>

        </div>
    </div>
    <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
    </>
  )
}

export default AppliedJobs

