# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
    gender: '',
    location: '',
    skill: '',
    experience: '',
  });

  const navigate = useNavigate();

  // Improved validation logic using regular expressions and error messages
  const validateForm = () => {
    const errors = {};

    if (!userData.username) {
      errors.username = 'Please enter your name.';
    } else if (userData.username.length < 3) {
      errors.username = 'Name must be at least 3 characters long.';
    }

    if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!userData.password || userData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (!userData.mobile || !/^\d{10}$/.test(userData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!userData.gender) {
      errors.gender = 'Please select your gender.';
    }

    if (!userData.location) {
      errors.location = 'Please enter your location.';
    }

    if (!userData.skill) {
      errors.skill = 'Please enter your skill.';
    }

    if (!userData.experience) {
      errors.experience = 'Please select your experience level.';
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    // Display validation errors to the user in a clear and informative way
    if (Object.keys(errors).length > 0) {
      let errorMessage = 'Please fix the following errors:\n';
      Object.values(errors).forEach((error) => (errorMessage += `- ${error}\n`));
      toast.error(errorMessage, { autoClose: 3000 });
      return;

    if (userData.username && userData.email && userData.password && userData.mobile && userData.gender && userData.location && userData.skill && userData.experience) {
      try {
        const result = await registerAPI(userData);
        console.log(result.response);
        if (result.status === 200) {
          toast.success(`Welcome ${result?.data?.username}.. Please Login`);
          setUserData({
            username: '',
            email: '',
            password: '',
            mobile: '',
            gender: '',
            location: '',
            skill: '',
            experience: '',
          });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          if (result.response.status === 406) {
            toast.warning(result.response.data);
            setUserData({
              username: '',
              email: '',
              password: '',
              mobile: '',
              gender: '',
              location: '',
              skill: '',
              experience: '',
            });
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again later.', { autoClose: 3000 });
      }
    } else {
      toast.info('Please fill the form completely!!!');
    }
  };

  return (
    <>
      <div style={{ marginTop: '100px', minHeight: '100vh' }} className='container-fluid'>
        <h1 className="text-center fw-bolder text"></h1>
        </>
        )
        
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

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailPattern.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      case "mobile":
        const mobilePattern = /^[0-9]{10}$/;
        if (!value.trim()) {
          error = "Mobile number is required";
        } else if (!mobilePattern.test(value)) {
          error = "Invalid mobile number";
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
      toast.error("Please fix the validation errors");
    }
  };
userData.username && userData.email && userData.password && userData.mobile && userData.gender && userData.location && userData.skill && userData.experience
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
                placeholder="name@example.com"
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
              <div name="gender" onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
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

postJob.title && postJob.salary && postJob.email && postJob.company && postJob.location && postJob.description && postJob.category && postJob.jobType && postJob.experience && postJob.vacancy && postJob.deadline

import React, { useContext, useState } from 'react';
import AdminHeader from '../Components/AdminHeader';
import Form from 'react-bootstrap/Form';
import { postjobAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addjobResponseContext } from '../Contexts/ContextAPI';
import { useNavigate } from 'react-router-dom';

function PostJobs() {
  const { addJobResponse, setAddJobResponse } = useContext(addjobResponseContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [postJob, setPostJob] = useState({
    title: "", salary: "", email: "", company: "", location: "", description: "", category: "", jobType: "", experience: "", vacancy: "", deadline: ""
  });
  
  console.log(postJob);

  // Regular expressions for validation
  const regexPatterns = {
    title: /^[A-Za-z\s]+$/, // Letters and spaces
    salary: /^\d+$/, // Numbers
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email pattern
    company: /^[A-Za-z\s]+$/, // Letters and spaces
    location: /^[A-Za-z\s0-9]+$/, // Letters, numbers, and spaces
    description: /^.{10,}$/, // Minimum 10 characters for description
    category: /^[A-Za-z\s]+$/, // Letters and spaces
    jobType: /^[A-Za-z\s]+$/, // Letters and spaces
    experience: /^\d+$/, // Numbers for experience
    vacancy: /^\d+$/, // Numbers for vacancy
    deadline: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format for deadline
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!regexPatterns.title.test(value)) {
          error = "Please enter a valid title.";
        }
        break;
      case "salary":
        if (!regexPatterns.salary.test(value)) {
          error = "Please enter a valid salary and should be annual income.";
        }
        break;
      case "email":
        if (!regexPatterns.email.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "company":
        if (!regexPatterns.company.test(value)) {
          error = "Please enter a valid company name.";
        }
        break;
      case "location":
        if (!regexPatterns.location.test(value)) {
          error = "Please enter a valid location.";
        }
        break;
      case "description":
        if (!regexPatterns.description.test(value)) {
          error = "Description must be at least 10 characters long.";
        }
        break;
      case "category":
        if (!regexPatterns.category.test(value)) {
          error = "Please enter a valid category.";
        }
        break;
      case "jobType":
        if (!regexPatterns.jobType.test(value)) {
          error = "Please select a valid job type.";
        }
        break;
      case "experience":
        if (!regexPatterns.experience.test(value)) {
          error = "Please enter a valid experience number.";
        }
        break;
      case "vacancy":
        if (!regexPatterns.vacancy.test(value)) {
          error = "Please enter a valid vacancy number.";
        }
        break;
      case "deadline":
        if (!regexPatterns.deadline.test(value)) {
          error = "Please select a valid deadline.";
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
    setPostJob({ ...postJob, [name]: value });

    // Validate each field on change
    validateField(name, value);
  };

  const handlePostJob = async () => {
    // Validate all fields before submitting the form
    const isFormValid = Object.keys(postJob).every((key) => validateField(key, postJob[key]));
    if(){}
    else{
        toast.error("Please fill the form completely")
    }
    if (isFormValid) {
      console.log("Inside post job");
      const { title, salary, email, company, location, description, category, jobType, experience, vacancy, deadline } = postJob;

      const token = sessionStorage.getItem("token");
      const adminUser = sessionStorage.getItem("admin");

      if (token && adminUser) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        try {
          // API call
          const result = await postjobAPI(postJob, reqHeader);

          if (result.status === 200) {
            toast.success("Job added successfully");
            setPostJob({
              title: "", salary: "", email: "", company: "", location: "", description: "", category: "", jobType: "", experience: "", vacancy: "", deadline: ""
            });
            setAddJobResponse(result);
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          } else {
            alert(result.response);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.warn("Please login as admin");
      }
    } else {
      toast.error("Please fix the errors");
    }
  };

  return (
    <>
      <AdminHeader insideDashboard={true} />
      <div style={{ marginTop: "180px", minHeight: "100vh" }} className="justify-content-center align-items-center container-fluid">
        <h1 className="text-center text-primary my-3">ENTER JOB DETAILS</h1>
        <div className="row d-flex mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 border p-3 rounded shadow">
            <Form>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label className='text-black'>Title :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter title of job"
                  value={postJob.title}
                  name="title"
                  onChange={handleChange}
                />
                {errors.title && <p className="text-danger">{errors.title}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupSalary">
                <Form.Label className='text-black'>Salary :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job salary"
                  value={postJob.salary}
                  name="salary"
                  onChange={handleChange}
                />
                {errors.salary && <p className="text-danger">{errors.salary}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className='text-black'>Email :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="email" placeholder="Enter email"
                  value={postJob.email}
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupCompany">
                <Form.Label className='text-black'>Company :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter company name"
                  value={postJob.company}
                  name="company"
                  onChange={handleChange}
                />
                {errors.company && <p className="text-danger">{errors.company}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupLocation">
                <Form.Label className='text-black'>Location :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter location"
                  value={postJob.location}
                  name="location"
                  onChange={handleChange}
                />
                {errors.location && <p className="text-danger">{errors.location}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label className='text-black'>Description :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' as="textarea" placeholder="Enter a description about the job"
                  style={{ height: '100px' }}
                  value={postJob.description}
                  name="description"
                  onChange={handleChange}
                />
                {errors.description && <p className="text-danger">{errors.description}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupCategory">
                <Form.Label className='text-black'>Category :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job category"
                  value={postJob.category}
                  name="category"
                  onChange={handleChange}
                />
                {errors.category && <p className="text-danger">{errors.category}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupJobtype">
                <Form.Label className='text-black'>Job Type :</Form.Label>
                <select name="jobType" className='form-control w-100 mb-3 border p-3 rounded' value={postJob.jobType} onChange={handleChange}>
                  <option value="" disabled>Select job type</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Intern">Intern</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.jobType && <p className="text-danger">{errors.jobType}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupExperience">
                <Form.Label className='text-black'>Experience :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter experience required"
                  value={postJob.experience}
                  name="experience"
                  onChange={handleChange}
                />
                {errors.experience && <p className="text-danger">{errors.experience}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupVacancy">
                <Form.Label className='text-black'>Vacancy :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter vacancy count"
                  value={postJob.vacancy}
                  name="vacancy"
                  onChange={handleChange}
                />
                {errors.vacancy && <p className="text-danger">{errors.vacancy}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupDeadline">
                <Form.Label className='text-black'>Deadline :</Form.Label>
                <Form.Control className='border rounded p-3 text-black' type="date"
                  value={postJob.deadline}
                  name="deadline"
                  onChange={handleChange}
                />
                {errors.deadline && <p className="text-danger">{errors.deadline}</p>}
              </Form.Group>

              <div className="d-flex justify-content-center">
                <button className="btn btn-primary px-4 py-2" onClick={handlePostJob} type="button">Post Job</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PostJobs;
