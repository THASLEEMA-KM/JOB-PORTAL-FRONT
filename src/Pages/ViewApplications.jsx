import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { applyReponseContext, deleteAppliedJobResponseContext, updateJobStatusResponseContext } from '../Contexts/ContextAPI'
import { getAllAppliedJobsAPI, removeAnApplicationAPI, updateJobStatusAPI } from '../Services/allAPI'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from 'react-bootstrap'

function ViewApplications() {

    const {applyResponse,setApplyResponse} = useContext(applyReponseContext)
    const {deleteAppliedJobResponse,setDeleteAppliedJobResponse} = useContext(deleteAppliedJobResponseContext)
    const {updateJobStatus,setUpdateJobStatus} = useContext(updateJobStatusResponseContext)

    // const [statusChange,setStatusChange] = useState({
    //     status:''
    // })
    const [allApplications,setAllApplications] = useState([])
    // const [allApplications,setAllApplications] = useState({
    //     username:"",
    //     email:"",
    //     resumeFile:"",
    //     status:"",
    // })
console.log(allApplications);


    const {id} = useParams()

    const [currentPage, setCurrentPage] = useState(1); 
    const jobsPerPage = 6; 
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentapplications = allApplications.slice(indexOfFirstJob, indexOfLastJob);
     const paginate = (pageNumber) =>{
      if (
        pageNumber >= 1 &&
        pageNumber <= Math.ceil(searchedjobs?.length / jobsPerPage)
      ) {
        setCurrentPage(pageNumber);
      }
      }

    const getAllApplications = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              }
            try {
                const result = await getAllAppliedJobsAPI(id,reqHeader)
                if(result.status==200){
                    setAllApplications(result.data)
                }
            } catch (error) {
                console.log(error);
                
            } 
        }
    }
    const handleStatusChange = async (e,applicationId)=>
    {
        const newStatus = e.target.value;
        console.log(newStatus,applicationId);
        const token = sessionStorage.getItem("token")
        if(token){
            try {
                const reqHeader = {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                  }
                const result = await updateJobStatusAPI(id,applicationId, { status: newStatus },reqHeader)
                if(result.status==200){
                    setAllApplications(prev => 
                        prev.map(application => 
                            application._id === applicationId 
                            ? { ...application, status: newStatus } 
                            : application
                        )
                    );
                    setUpdateJobStatus(result)
                    toast.info("job status updated")

                }
            } catch (error) {
                console.log(error);               
            }
        }
        
    }

    // const handleDeleteApplication = async(applicationId)=>{
    //     console.log("deleting application id" , applicationId);
    //     const token = sessionStorage.getItem("token")
    //     if(token){
    //       const reqHeader = {
    //         "Content-Type" : "application/json",
    //         "Authorization" : `Bearer ${token}`
    //       }
    //       try {
    //         const result = await removeAnApplicationAPI(applicationId,reqHeader)
    //         if(result.status==200){
            
    //             getAllApplications()
    //         }
    //         else{
    //           console.log(result);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    // }
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
        getAllApplications()
    },[applyResponse,deleteAppliedJobResponse,updateJobStatus])

  return (
    <div style={{marginTop:"150px",minHeight:"100vh"}}>
        <AdminHeader insideDashboard={true}/>
        <h1 className="my-3 text-center">All Applicants</h1>
        <p className='text-center'>Total Count : {allApplications?.length}</p>
        <div className='row container-fluid mt-5 d-flex'>
            <div className="col"></div>
           <div className='col-lg-8'>
                <div className='table-responsive'>
                    <table className='table border w-100 shadow'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>CV</th>
                                <th>Action</th>
                                {/* <th><i className="fa-solid fa-ellipsis"></i></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                 currentapplications?.length>0 &&
                                 currentapplications?.map((items,index)=>(
                                     <tr key={items?._id}>
    
                                     <td>{index+1}</td>                        
                                     <td>{items?.username}</td>
                                     <td>{items?.email}</td>
                                     <td className={getStatusClassName(items?.status)}>
                                        {items?.status}
                                     </td>
                                     <td>
                                     <a style={{textDecoration:"none"}} href={items.resumeFile} download target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
                                     </td>
                                     <td>
                                     <select name="" id="" className='form-control '
                                        value={items?.status}
                                        onChange={(e)=>handleStatusChange(e,items._id)}
                                        // onChange={(e)=>setStatusChange({...statusChange,status:e.target.value})}
                                        >
                                            <option value="" selected disabled hidden> Select one</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                     </td>
    
                                     {/* <td>
                                     <button onClick={()=>handleDeleteAppliedJob(items?._id)} className="btn  text-danger"> <i className="fa-solid fa-trash"></i> </button>
                                     <i onClick={()=>handleDeleteApplication(items?._id)} className="fa-solid fa-trash text-danger"></i> 
                                     </td> */}
                                     
                                     </tr>
                                 ))
                                //  :
                                //  <div>
                                //      no applications
                                //  </div>
                            }
                        </tbody>
                    </table>
                </div>
                {
                            currentapplications?.length==0 &&
                        <div className='fw-bolder text-center text-danger'>
                            NO APPLICATIONS YET!!!
                        </div>
                        }
                {
                    currentapplications.length>10 &&
                    <div className='d-flex justify-content-center my-5'>
                    <Pagination>
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(allApplications.length / jobsPerPage) }, (_, i) => (
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
        <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </div>
  )
}

export default ViewApplications

