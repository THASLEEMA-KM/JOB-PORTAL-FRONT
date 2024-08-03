import React from 'react'
import AdminHeader from '../Components/AdminHeader'

function ViewApplications() {
  return (
    <div style={{marginTop:"150px"}}>
        <AdminHeader insideDashboard={true}/>
        <h1 className="my-3 text-center">All Applicants</h1>
        <p className='text-center'>Total Count :9</p>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>jjh</td>
                            <td>gwj</td>
                            <td>se</td>
                            <td>edrtfr</td>
                            <td>vfre</td>
                        </tr>
                    </tbody>
                </table>
           </div>
           <div className="col"></div>

        </div>
    </div>
  )
}

export default ViewApplications