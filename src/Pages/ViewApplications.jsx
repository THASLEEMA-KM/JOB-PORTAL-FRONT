import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { applyReponseContext, deleteAppliedJobResponseContext } from '../Contexts/ContextAPI'
import { getAllAppliedJobsAPI } from '../Services/allAPI'
import { useParams } from 'react-router-dom'

function ViewApplications() {

    const {applyResponse,setApplyResponse} = useContext(applyReponseContext)
    const {deleteAppliedJobResponse,setDeleteAppliedJobResponse} = useContext(deleteAppliedJobResponseContext)

    const [allApplications,setAllApplications] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getAllApplications()
    },[applyResponse,deleteAppliedJobResponse])

    const getAllApplications = async(req,res)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              }
            try {
                const result = await getAllAppliedJobsAPI(id,reqHeader)
                if(result.status==200){
                    // setDeleteAppliedJobResponse(result.data)
                    setAllApplications(result.data)
                }
            } catch (error) {
                console.log(error);
                
            } 
        }
    }

  return (
    <div style={{marginTop:"150px"}}>
        <AdminHeader insideDashboard={true}/>
        <h1 className="my-3 text-center">All Applicants</h1>
        <p className='text-center'>Total Count : {allApplications?.length}</p>
        <div className='row container-fluid mt-5'>
            <div className="col"></div>
           <div className='col-lg-8'>
                <table className='table border w-100 shadow'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>status</th>
                            <th>cv</th>
                            <th>action</th>
                            <th><i className="fa-solid fa-ellipsis"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             allApplications?.length>0 ?
                             allApplications?.map((items,index)=>(
                                 <tr key={items?.id}>

                                 <td>{index+1}</td>                        
                                 <td>{items?.username}</td>
                                 <td>{items.email}</td>
                                 <td>pending / ok/ reject</td>
                                 <td>{items.resumeFile}</td>
                                 <td>pass</td>
                                 <td>
                                 {/* <button onClick={()=>handleDeleteAppliedJob(items?._id)} className="btn  text-danger"> <i className="fa-solid fa-trash"></i> </button> */}
                                 <i className="fa-solid fa-trash  text-danger"></i> 
                                 </td>
                                 </tr>
                             )):
                             <div>
                                 no applications
                             </div>
                        }
                    </tbody>
                </table>
           </div>
           <div className="col"></div>

        </div>
    </div>
  )
}

export default ViewApplications