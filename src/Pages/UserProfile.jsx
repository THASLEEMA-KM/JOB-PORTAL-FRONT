import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { editProfileAPI, getUserDetailsAPI } from '../Services/allAPI';
import { Offcanvas } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SERVER_URL from '../Services/serverURL';
import { updateProfileResponseContext } from '../Contexts/ContextAPI';
import userPic from '../assets/profilePic.png'
function UserProfile() {

    const [show, setShow] = useState(false);

    const {updateProfileResponse,setUpdateProfileResponse} = useContext(updateProfileResponseContext)

    const [userDetails,setUserDetails] = useState([])
    console.log(userDetails);
    
    // const getUserDetails = async ()=>{
    //     const result = await getUserDetailsAPI()
    //     if(result.status==200){
    //         setUserDetails(result.data)
    //     }
    // }
    const [updatedProfile,setUpdatedProfile] = useState({
        id:userDetails._id,
        username:userDetails.username,
        email:userDetails.email,
        password:userDetails.password,
        mobile:userDetails.mobile,
        gender:userDetails.gender,
        location:userDetails.location,
        skill:userDetails.skill,
        experience:userDetails.experience,
        resumeFile:userDetails.resumeFile
    })
    console.log(updatedProfile);
    // const [existingResume,setExistingResume] = useState("")

    const handleClose = () => {
        setShow(false);
        setUpdatedProfile({
            id:userDetails._id,
            username:userDetails.username,
            email:userDetails.email,
            password:userDetails.password,
            mobile:userDetails.mobile,
            gender:userDetails.gender,
            location:userDetails.location,
            skill:userDetails.skill,
            experience:userDetails.experience,
            resumeFile:userDetails.resumeFile
        })
    }

    const handleShow = (id) =>{ 
        setShow(true);
        console.log(id);
        
        setUpdatedProfile({
            id:userDetails._id,
            username:userDetails.username,
            email:userDetails.email,
            password:userDetails.password,
            mobile:userDetails.mobile,
            gender:userDetails.gender,
            location:userDetails.location,
            skill:userDetails.skill,
            experience:userDetails.experience,
            resumeFile:userDetails.resumeFile
        })
    }
    const handleUpdateProfile = async()=>{
        const {username,email,password,mobile,gender,location,skill,experience,resumeFile} = updatedProfile
        if(updatedProfile.username && updatedProfile.email && updatedProfile.password && updatedProfile.mobile && updatedProfile.gender && updatedProfile.location && updatedProfile.skill && updatedProfile.experience && updatedProfile.resumeFile){
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("mobile",mobile)
            reqBody.append("gender",gender)
            reqBody.append("location",location)
            reqBody.append("skill",skill)
            reqBody.append("experience",experience)
            reqBody.append("resumeFile",resumeFile)

            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader = {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : `Bearer ${token}`
                  }
                  try {
                    const result = await editProfileAPI(reqBody,reqHeader)
                    if(result.status==200){
                        alert("profile updated successfully")
                        setUpdatedProfile(result.data)
                        setUpdateProfileResponse(result)
                        handleClose()
                    }
                    else
                    {
                        alert("updation failed")
                    }

                  } catch (error) {
                    console.log(error);
                  }
            }
        }
        else
        {
            alert("Please complete the form!!")
        }
    }
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file && file.type === 'application/pdf') {
            setUpdatedProfile({...updatedProfile, resumeFile: file});
        } else {
            alert('Please upload a PDF file.');
        }
    };
    // useEffect(()=>{
    //     if(sessionStorage.getItem("user")){
    //         const existingUserDetails = sessionStorage.getItem("user")
    //         setUserDetails({...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,mobile:existingUserDetails.mobile,gender:existingUserDetails.gender,location:existingUserDetails.location,skill:existingUserDetails.skill,experience:existingUserDetails.experience})
    //     }
    // },[])
    
    useEffect(()=>{
        getUserDetails()

    },[updateProfileResponse])

    return (
    <>
        <Header insideUserDashboard={true}/>
        <div style={{marginTop:"180px"}} className="justify-content-center align-items-center container-fluid">
            <h1 className="text-center text-primary my-3">WELCOME<span style={{color:"red", letterSpacing:'5px', textTransform:'uppercase'}}> {userDetails.username} !</span></h1>
            <div className="d-flex justify-content-center row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 border rounded-5 shadow d-flex flex-column">
                    <div className='text-center mt-5'>
                        <img src={userPic} alt="user profile pic" width={'150px'} height={'150px'} className='img-fluid rounded-circle'/>
                    </div>
                    <div className='pt-3 mb-4 d-flex row'>
                        <div className="col-lg-3"></div>
                       <div className='col-lg-6 ' style={{textAlign:'justify',width:"auto"}}>
                           <h3> <i className="fa-solid fa-circle-user text-primary me-3"></i> {userDetails.username}</h3>
                           <h3><i className="fa-solid fa-envelope text-info me-3"></i>{userDetails.email}</h3>
                           {/* <h3>{userDetails.password}</h3> */}
                           <h3> <i className="fa-solid fa-phone text-success me-3"></i> {userDetails.mobile}</h3>
                           {/* <h3>{userDetails.gender}</h3> */}
                           <h3><i className="fa-solid fa-location-dot text-danger me-3"></i>{userDetails.location}</h3>
                           <h3><i className="fa-solid fa-code me-3 text-warning"></i>{userDetails.skill}</h3>
                           <h3><i className="fa-solid fa-circle-check text-success me-3"></i>{userDetails.experience}</h3>
                           {/* <h3>{userDetails.resumeFile}</h3>
                           <h3>{userDetails.profilePic}</h3> */}

                           <div className="d-flex justify-content-center mt-3">
                            <button onClick={()=>handleShow(userDetails?._id)} className="btn btn-outline-warning rounded-5 ">
                                EDIT
                            </button>
                           </div>
                       </div>
                       <div className="col-lg-3"></div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>

        </div>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-bolder fs-2 text-primary' style={{textTransform:"uppercase"}}>{userDetails.username}</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
        <FloatingLabel
        controlId="floatingInputName"
        label="Your Name"
        className="mb-3"
        
       >
        <Form.Control type="text" placeholder="name@example.com"  value={updatedProfile?.username}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,username:e.target.value})}/>
      </FloatingLabel>
       <FloatingLabel
        controlId="floatingInputEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" value={updatedProfile?.email}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,email:e.target.value})}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" value={updatedProfile.password}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,password:e.target.value})}
/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputMobile"
        label="Mobile number"
        className="mb-3"
              >
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.mobile}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,mobile:e.target.value})}
/>
      </FloatingLabel>
      <form className="mb-3">
                    <div 
        >
                    <label>Gender</label>
                        <input className='ms-3' type="radio" value="Male" name="gender" checked={updatedProfile.gender === 'Male'} 
                            onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})} /> Male
                        <input className='ms-3' type="radio" value="Female" name="gender" checked={updatedProfile.gender === 'Female'} 
                            onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})}/> Female
                        <input className='ms-3' type="radio" value="Other" name="gender"  checked={updatedProfile.gender === 'Other'} 
                            onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})}
/> Other
                    </div>
      </form>
      <FloatingLabel
        controlId="floatingInputLocation"
        label="Location"
        className="mb-3"        
      >
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.location}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,location:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputSkill"
        label="Skill"
        className="mb-3"  >
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.skill}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,skill:e.target.value})}/>
      </FloatingLabel>
      <form>
        <select name="" id="" className='form-control' value={updatedProfile.experience}
        onChange={(e)=>setUpdatedProfile({...updatedProfile,experience:e.target.value})}
        >
          <option hidden selected disabled value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1 to 3 years">1 to 3 years</option>
          <option value="3 - 5 yrs">3 - 5 yrs</option>
          <option value="Above 5 yrs">Above 5 yrs</option>
        </select>
      </form>
      {/* <FloatingLabel controlId="floating" label="Upload CV">
                <Form.Control type="file" placeholder="Upload CV" 
                // value={updatedProfile.resumeFile}
                // value={`${SERVER_URL}/uploads/${appliedJobs.resumeFile}`}
                onChange={(e)=>setUpdatedProfile({...updatedProfile,resumeFile:e.target.files[0]})}/>
              </FloatingLabel> */}
               {userDetails.resumeFile ? (
            <div className="mb-3">
                <label>Uploaded Resume:</label>
                <a 
                    href={`${SERVER_URL}/uploads/${userDetails.resumeFile}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-link"
                >
                    View/Download Resume
                </a>
            </div>
        ) : (
            <p>No resume uploaded.</p>
        )}
              <FloatingLabel controlId="floating" label="Upload CV">
                <Form.Control 
                    type="file" 
                    placeholder="Upload CV" 
                    accept=".pdf"  
                    onChange={(e) => handleFileChange(e)}
                />
            </FloatingLabel>
      <div className="d-flex justify-content-between my-3">
        <button className="btn btn-outline-dark" onClick={handleClose}>CANCEL</button>
        <button className="btn btn-outline-success" onClick={handleUpdateProfile}>UPDATE</button>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default UserProfile