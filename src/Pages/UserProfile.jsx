import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { getUserDetailsAPI } from '../Services/allAPI';

function UserProfile() {
    const username = JSON.parse(sessionStorage.getItem("user"))?.username;  
    const [userDetails,setUserDetails] = useState({})

    // const getUserDetails = async ()=>{
    //     const result = await getUserDetailsAPI()
    //     if(result.status==200){
    //         setUserDetails(result.data)
    //     }
    // }
    const getUserDetails = async () => {
        console.log('inside get User Details');

        if (sessionStorage.getItem("token")) {

            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization":` Bearer ${token}`
            };

            try {

                const result = await getUserDetailsAPI(reqHeader);
                console.log(result.data);
                setUserDetails(result.data);


            } catch (error) {
                console.log(error);
                
            }
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[])

    return (
    <>
        <Header insideUserDashboard={true}/>
        <div style={{marginTop:"180px"}} className="justify-content-center align-items-center container-fluid">
            <h1 className="text-center text-primary my-3">WELCOME<span style={{color:"red", letterSpacing:'5px', textTransform:'uppercase'}}> {userDetails.username} !</span></h1>
            <div className="d-flex justify-content-center row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 border rounded-5 shadow d-flex flex-column">
                    <div className='text-center mt-5'>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user profile pic" width={'150px'} height={'150px'} className='img-fluid rounded-circle'/>
                    </div>
                    <div className='pt-3 mb-4 d-flex row'>
                        <div className="col-lg-3"></div>
                       <div className='col-lg-6 ' style={{textAlign:'justify'}}>
                           <h3> <i className="fa-solid fa-circle-user me-3"></i> {userDetails.username}</h3>
                           <h3><i className="fa-solid fa-envelope me-3"></i>{userDetails.email}</h3>
                           {/* <h3>{userDetails.password}</h3> */}
                           <h3> <i className="fa-solid fa-phone me-3"></i> {userDetails.mobile}</h3>
                           <h3>{userDetails.gender}</h3>
                           <h3><i className="fa-solid fa-location-dot me-3"></i>{userDetails.location}</h3>
                           <h3><i className="fa-solid fa-code me-3"></i>{userDetails.skill}</h3>
                           <h3><i className="fa-solid fa-circle-check me-3"></i>{userDetails.experience}</h3>
                           {/* <h3>{userDetails.resumeFile}</h3>
                           <h3>{userDetails.profilePic}</h3> */}
                       </div>
                       <div className="col-lg-3"></div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>

        </div>
    </>
  )
}

export default UserProfile