import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const [userData,setUserData] = useState({
    username:"",email:"",password:"",mobile:"",gender:"",location:"",skill:"",experience:""
  })
  console.log(userData);
  const navigate = useNavigate()

  const handleRegister = async(e)=>
    {
      e.preventDefault()
      if(userData.username && userData.email && userData.password && userData.mobile && userData.gender && userData.location && userData.skill && userData.experience)
        {
          try {
            const result = await registerAPI(userData)
            console.log(result.response);
            if(result.status==200)
              {
                toast.success(`Welcome ${result?.data?.username}.. Please Login`)
                setUserData({
                  username:"",
                  email:"",
                  password:"",
                  mobile:"",
                  gender:"",
                  location:"",
                  skill:"",
                  experience:""
                })
                  setTimeout(()=>{
                    navigate('/login')
                  },3000)
              }
              else{
                if(result.response.status==406)
                  {
                    toast.warning(result.response.data)
                    setUserData({
                      username:"",
                      email:"",
                      password:"",
                      mobile:"",
                      gender:"",
                      location:"",
                      skill:"",
                      experience:""
                    })
                  }
              }
          } catch (error) {
            console.log(error);
          }
        }
        else{
          toast.info("Please fill the form completely!!!")
        }
    }

  return (
    <>
      <div style={{marginTop:"100px"}}>
        <h1 className="text-center fw-bolder text-primary">REGISTER HERE</h1>
        <div className="row container-fluid d-flex justify-content-center align-items-center mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 p-5  shadow rounded w-50">
      <FloatingLabel
        controlId="floatingInputName"
        label="Your Name"
        className="mb-3"
        value={userData.username}
        onChange={(e)=>setUserData({...userData,username:e.target.value})}
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
       <FloatingLabel
        controlId="floatingInputEmail"
        label="Email address"
        className="mb-3"
        value={userData.email}
        onChange={(e)=>setUserData({...userData,email:e.target.value})}
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password"      className="mb-3"
        value={userData.password}
        onChange={(e)=>setUserData({...userData,password:e.target.value})}>
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputMobile"
        label="Mobile number"
        className="mb-3"
        value={userData.mobile}
        onChange={(e)=>setUserData({...userData,mobile:e.target.value})}
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
      <form className="mb-3">
                    <div value={userData.gender}
        onChange={(e)=>setUserData({...userData,gender:e.target.value})}>
                    <label>Gender</label>
                        <input className='ms-3' type="radio" value="Male" name="gender"  /> Male
                        <input className='ms-3' type="radio" value="Female" name="gender"/> Female
                        <input className='ms-3' type="radio" value="Other" name="gender"  /> Other
                    </div>
      </form>
      <FloatingLabel
        controlId="floatingInputLocation"
        label="Location"
        className="mb-3"
        value={userData.location}
        onChange={(e)=>setUserData({...userData,location:e.target.value})}
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputSkill"
        label="Skill"
        className="mb-3"
        value={userData.skill}
        onChange={(e)=>setUserData({...userData,skill:e.target.value})}
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
      <form>
        <select name="" id="" className='form-control' value={userData.experience}
        onChange={(e)=>setUserData({...userData,experience:e.target.value})}>
          <option hidden selected disabled value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1 to 3 years">1 to 3 years</option>
          <option value="3 - 5 yrs">3 - 5 yrs</option>
          <option value="Above 5 yrs">Above 5 yrs</option>
        </select>
      </form>
          <div className="pt-3 justify-content-center text-center">
                <button onClick={handleRegister} className="btn btn-success mb-3">REGISTER</button>
              <p className='mt-2 text-black text-center'>Already have an account? Please <Link to={'/login'}>Login</Link> </p>
          </div>
          <hr />
          <h5 className="text-center text-warning pt-2">Or signup with</h5>
          <div className="text-center justify-content-center d-flex py -3">
                  <p className='btn btn-secondary rounded-5 me-3'><i className="fa-brands fa-google text-danger"></i></p>
                  <p className='btn btn-secondary rounded-5 me-3'><i className="fa-brands fa-github text-dark"></i></p>
                  <p className='btn btn-secondary rounded-5 me-3'><i class="fa-brands fa-linkedin text-primary"></i></p>
                </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
    </>
  )
}

export default Register
