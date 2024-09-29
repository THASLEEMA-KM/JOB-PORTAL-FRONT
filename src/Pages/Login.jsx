import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { loginAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from '../Contexts/AuthContext';

// import { signInWithPopup } from 'firebase/auth';
// import { auth , googleProvider , signInWithPopup } from '../Firebase/firebase';
// import app from '../Firebase/firebase';
// import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
// import { getAuth } from "firebase/auth";


const Login = () => {
  const {setIsAuthorised} = useContext(tokenAuthContext)

  const [userData,setUserData] = useState({
    email:"",
    password:""
  })
console.log(userData);
const navigate = useNavigate()

// const googleProvider = new GoogleAuthProvider();
// const auth = getAuth();

  // const handleLogin = async(e)=>{
  //   console.log("Inside Login");
  //   e.preventDefault()
  //   if(userData.email && userData.password){
  //     try {
  //       const result = await loginAPI(userData)

  //         if(result.status==200){
  //         sessionStorage.setItem("user",JSON.stringify(result.data.user))
  //         sessionStorage.setItem("token",result.data.token)
  //         setUserData({
  //           email:"",
  //           password:""})
  //           navigate('/')
  //       }

  //       else{
  //         if(result.response.status==404)
  //           {
  //             alert(result.response.data)
  //           }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }else{
  //     alert("Please fill the form completely")
  //   }
  // }

  // const handleLogin = async(e)=>{
  //   console.log("Inside Login");
  //   e.preventDefault()
  //   if(userData.email && userData.password){
  //     try {
  //       const result = await loginAPI(userData)
        
  //         if(result.status==200){
  //           if(result.data.admin.email=="adminjobPortal@gmail.com" && result.data.admin.password=="adminjobportal"){
  //             sessionStorage.setItem("admin",JSON.stringify(result.data.admin))
  //             sessionStorage.setItem("token",result.data.token)
  //             setUserData({
  //               email:"",
  //               password:""})
  //               navigate('/dashboard')
  //           }else{
  //             sessionStorage.setItem("user",JSON.stringify(result.data.user))
  //             sessionStorage.setItem("token",result.data.token)
  //             setUserData({
  //               email:"",
  //               password:""})
  //               navigate('/')
  //           }
          
  //       }

  //       else{
  //         if(result.response.status==404)
  //           {
  //             alert(result.response.data)
  //           }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }else{
  //     alert("Please fill the form completely")
  //   }
  // }

  const handleLogin = async(e)=>{
    console.log("Inside Login");
    e.preventDefault()
    if(userData.email=="adminjobPortal@gmail.com" && userData.password=="adminjobportal"){
      try {
        const result = await loginAPI(userData)
          if(result.status==200)
            {
              sessionStorage.setItem("admin",JSON.stringify(result.data.admin))
              sessionStorage.setItem("token",result.data.token)
              setIsAuthorised(true)
              setUserData({
                email:"",
                password:""})
                toast.success("Login Successfull, Welcome Admin!")
                setTimeout(()=>{
                  navigate('/dashboard')
                },3000)
            }
          else
          {
            if(result.response.status==404)
              {
                toast.warning(result.response.data)
              }
          }
      } catch (error) {
        console.log(error);
      }
    }
    else if(userData.email && userData.password){
      try {
        const result = await loginAPI(userData)
        if(result.status==200){
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setIsAuthorised(true)
              setUserData({
                email:"",
                password:""})
                toast.success(`Welcome ${result.data.user.username}..!`)
                setTimeout(()=>{
                  navigate('/userdashboard')
                },3000)
                
        }
        else{
          if(result.response.status==404)
            {
              alert(result.response.data)
            }
        }
      } catch (error) {
        console.log(error);
      }
    }
    else{
      toast.info("Please fill the form completely")
    }
  }

  // const handleGoogleLogin = async () => {
  //   // try {
  //   //   const result = await signInWithPopup(auth, googleProvider);
  //   //   const user = result.user;
      
  //   //   // Save the user info and token (if necessary)
  //   //   sessionStorage.setItem("user", JSON.stringify(user));
  //   //   toast.success(`Welcome ${user.displayName}!`);
  
  //   //   // Redirect user to dashboard or home
  //   //   setTimeout(() => {
  //   //     navigate('/userdashboard');
  //   //   }, 3000);
  //   // } catch (error) {
  //   //   console.error("Google login error", error);
  //   //   toast.error("Failed to sign in with Google");
  //   // }
  //   signInWithPopup(auth, googleProvider)
  //   .then((result) => {
  //     // // This gives you a Google Access Token. You can use it to access the Google API.
  //     // const credential = GoogleAuthProvider.credentialFromResult(result);
  //     // const token = credential.accessToken;
  //     // // The signed-in user info.
  //     const user = result.user;
  //     console.log(user);
  //        sessionStorage.setItem("user", JSON.stringify(user));
  //     toast.success(`Welcome ${user.displayName}!`);
  
  //     // Redirect user to dashboard or home
  //     setTimeout(() => {
  //       navigate('/userdashboard');
  //     }, 3000);
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...

  //   }).catch((error) => {
  //     // Handle Errors here.
  //     // const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // };
 
  return (
    <>
    <div style={{marginTop:"100px",minHeight:"100vh"}} className='container-fluid'>
    <h1 className="text-center text-warning fw-bolder">LOGIN HERE</h1>
     <div className="row  d-flex justify-content-center align-items-center mt-5">
     <div className="col-lg-2"></div>
        <div className='col-lg-8  p-5  shadow rounded ' style={{width:"auto"}}>
              <div className='row d-grid justify-content-between'>
                <div >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                  value={userData.email}
        onChange={(e)=>setUserData({...userData,email:e.target.value})}>
                  <Form.Control type="email" placeholder="name@example.com" className='form-control rounded' />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password"
                value={userData.password}
                onChange={(e)=>setUserData({...userData,password:e.target.value})}>
                  <Form.Control type="password" placeholder="Password" className='form-control rounded'/>
                </FloatingLabel>
                <div className="pt-3 justify-content-center text-center">
                <button className="btn btn-success mb-3" onClick={handleLogin} >LOGIN</button>
              <p className='mt-2 text-black text-center'>New User ? Please <Link to={'/register'}>Register</Link> to create Account </p>
              </div>
                </div>
                
                {/* <div className="text-center d-grid">
                  <h5 className="text-center text-warning pt-3">Or signup with</h5>
                  <hr className='pb-4' />
                  <p onClick={handleGoogleLogin} className='btn btn-secondary rounded-5'><i className="fa-brands fa-google text-danger me-2"></i>Google</p>
                  <p className='btn btn-secondary rounded-5'><i className="fa-brands fa-github text-dark me-2"></i>Github</p>
                  <p className='btn btn-secondary rounded-5'><i class="fa-brands fa-linkedin text-primary me-2"></i>LinkedIn</p>
                </div> */}
              </div>
             
        </div>
        <div className="col-lg-2"></div> 
     </div>
    </div>
    <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </>
  )
}

export default Login
