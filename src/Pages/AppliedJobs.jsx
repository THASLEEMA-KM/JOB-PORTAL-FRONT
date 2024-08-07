import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { applyReponseContext } from '../Contexts/ContextAPI'
import { getAppliedJobsAPI } from '../Services/allAPI'

function AppliedJobs() {

    const {applyResponse,setApplyResponse} = useContext(applyReponseContext)
    const [userAppliedJobs,setUserAppliedJobs] = useState([])
    console.log(userAppliedJobs);
    

    useEffect(()=>{
        getUserAppliedJobs()
    },[applyResponse])

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

  return (
    <>
     <Header insideUserDashboard={true}/>   
     <div style={{marginTop:"150px"}}>

        <h1 className="my-3 text-center">All Applications</h1>
        <p className='text-center'>Total Count :9</p>
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
                            <th>action</th>
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
                                <td>{items.email}</td>
                                <td>edrtfr</td>
                                <td>{items.resumeFile}</td>
                                <td>edrtfr</td>
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
    </>
  )
}

export default AppliedJobs