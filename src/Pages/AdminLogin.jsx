import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { adminLoginAPI } from '../Services/allAPI';


const AdminLogin = () => {

  const [adminData,setAdminData] = useState({
    email:"",
    password:""
  })
console.log(adminData);
const navigate = useNavigate()
  const handleLogin = async(e)=>{
    console.log("Inside Admin Login");
    e.preventDefault()
    if(adminData.email && adminData.password){
      try {
        const result = await adminLoginAPI(adminData)
          if(result.status==200){
          sessionStorage.setItem("admin",JSON.stringify(result.data.admin))
          sessionStorage.setItem("token",result.data.token)
          setUserData({
            email:"",
            password:""})
            navigate('/dashboard')
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
    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    <>
    <div style={{marginTop:"100px",}}>
    <h1 className="text-center text-warning fw-bolder">LOGIN HERE</h1>
     <div className="row container-fluid d-flex justify-content-center align-items-center mt-5">
     <div className="col-lg-3"></div>
        <div className='col-lg-6  p-5  shadow rounded w-50'>
              <div className='row d-flex justify-content-between'>
                <div className="col-lg-6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                  value={userData.email}
        onChange={(e)=>setAdminData({...adminData,email:e.target.value})}>
                  <Form.Control type="email" placeholder="name@example.com" className='form-control rounded' />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password"
                value={userData.password}
                onChange={(e)=>setAdminData({...adminData,password:e.target.value})}>
                  <Form.Control type="password" placeholder="Password" className='form-control rounded'/>
                </FloatingLabel>
                <div className="pt-3 justify-content-center text-center">
                <button className="btn btn-success mb-3" onClick={handleLogin} >LOGIN</button>
              <p className='mt-2 text-black text-center'>New User ? Please <Link to={'/register'}>Register</Link> to create Account </p>
              </div>
                </div>
                
                <div className="col-lg-6 text-center d-grid">
                  <h5 className="text-center text-warning pt-3">Or signup with</h5>
                  <hr className='pb-4' />
                  <p className='btn btn-secondary rounded-5'><i className="fa-brands fa-google text-danger me-2"></i>Google</p>
                  <p className='btn btn-secondary rounded-5'><i className="fa-brands fa-github text-dark me-2"></i>Github</p>
                  <p className='btn btn-secondary rounded-5'><i class="fa-brands fa-linkedin text-primary me-2"></i>LinkedIn</p>
                </div>
              </div>
             
        </div>
        
        <div className="col-lg-3"></div>
        
     </div>
    </div>
    </>
  )
}

export default AdminLogin
