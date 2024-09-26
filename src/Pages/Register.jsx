import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: "", email: "", password: "", mobile: "", gender: "", location: "", skill: "", experience: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regular expressions for validation
  const regexPatterns = {
    username: /^[A-Za-z\s]{3,20}$/, // Username must be between 3-20 characters and letters only
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, // Password should be 6-20 characters with at least one digit, one lowercase, and one uppercase letter
    mobile: /^[0-9]{10}$/, // Mobile number must be exactly 10 digits
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!regexPatterns.username.test(value)) {
          error = "Username must be between 3 and 20 letters.";
        }
        break;
      case "email":
        if (!regexPatterns.email.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "password":
        if (!regexPatterns.password.test(value)) {
          error = "Password must be 6-20 characters, with at least one uppercase letter, one lowercase letter, and a number.";
        }
        break;
      case "mobile":
        if (!regexPatterns.mobile.test(value)) {
          error = "Mobile number must be exactly 10 digits.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";  // Returns true if no error
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Validate each field on change
    validateField(name, value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isFormValid = Object.keys(userData).every((key) => validateField(key, userData[key]));

    if(userData.username && userData.email && userData.password && userData.mobile && userData.gender && userData.location && userData.skill && userData.experience){
      if (isFormValid) {
        try {
          const result = await registerAPI(userData);
          if (result.status === 200) {
            toast.success(`Welcome ${result?.data?.username}.. Please Login`);
            setUserData({
              username: "", email: "", password: "", mobile: "", gender: "", location: "", skill: "", experience: ""
            });
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            toast.warning(result.response.data);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error("Please fix the validation errors.");
      }
    }else{
      toast.info("Please fill the form completely")
    }
  };

  return (
    <>
      <div style={{ marginTop: "100px", minHeight: "100vh" }} className="container-fluid">
        <h1 className="text-center fw-bolder text-primary">REGISTER HERE</h1>
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 p-5 shadow rounded" style={{ width: "auto" }}>
            
            <FloatingLabel controlId="floatingInputName" label="Your Name" className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Enter your name"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-danger">{errors.username}</p>}
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
              <Form.Control 
                type="email" 
                placeholder="name@example.com"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputMobile" label="Mobile number" className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Mobile Number"
                name="mobile"
                value={userData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
            </FloatingLabel>

            <form className="mb-3">
              <div onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                <label>Gender</label>
                <input className='ms-3' type="radio" value="Male" name="gender" /> Male
                <input className='ms-3' type="radio" value="Female" name="gender" /> Female
                <input className='ms-3' type="radio" value="Other" name="gender" /> Other
              </div>
            </form>

            <FloatingLabel controlId="floatingInputLocation" label="Location" className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Location"
                name="location"
                value={userData.location}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputSkill" label="Skill" className="mb-3">
              <Form.Control 
                type="text" 
                placeholder="Skill"
                name="skill"
                value={userData.skill}
                onChange={handleChange}
              />
            </FloatingLabel>

            <form>
              <select 
                className='form-control'
                name="experience"
                value={userData.experience}
                onChange={handleChange}
              >
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
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  );
};

export default Register;
