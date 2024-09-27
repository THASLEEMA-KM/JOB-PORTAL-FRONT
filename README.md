# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

register
---------------
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

   register
-----------------------------     
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

post jobs
--------------------------
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


user profile - validation
-----------------------------------------------
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { editProfileAPI, getUserDetailsAPI } from '../Services/allAPI';
import { Offcanvas } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SERVER_URL from '../Services/serverURL';
import { updateProfileResponseContext } from '../Contexts/ContextAPI';
import userPic from '../assets/profilePic.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    // validation section
    const [errors, setErrors] = useState({});
    const regexPatterns = {
        username: /^[A-Za-z\s]{3,20}$/, // Username must be between 3-20 characters and letters only
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, // Password should be 6-20 characters with at least one digit, one lowercase, and one uppercase letter
        mobile: /^[0-9]{10}$/, // Mobile number must be exactly 10 digits
        gender: /^[A-Za-z\s]+$/, // Numbers for experience
        skill: /^[A-Za-z\s0-9]+$/, // Numbers for experience
        experience: /^[A-Za-z\s0-9]+$/, // Numbers for experience
        location: /^[A-Za-z\s]+$/, // Numbers for experience
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
            case "gender":
            if (!regexPatterns.gender.test(value)) {
              error = "Please select the gender.";
            }
            break;
            case "location":
            if (!regexPatterns.location.test(value)) {
              error = "Please Enter your Location.";
            }
            break;
            case "skill":
            if (!regexPatterns.skill.test(value)) {
              error = "Please enter a valid skill.";
            }
            break;
            case "experience":
            if (!regexPatterns.experience.test(value)) {
              error = "please enter your experience.";
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
        setUpdatedProfile({ ...updatedProfile, [name]: value });
        validateField(name, value); // Validate on each change
    };
    
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
        if(updatedProfile.username && updatedProfile.email && updatedProfile.password && updatedProfile.mobile && updatedProfile.gender && updatedProfile.location && updatedProfile.skill && updatedProfile.experience && updatedProfile.resumeFile)
        {
            const isFormValid = Object.keys(updatedProfile).every((key) => validateField(key, updatedProfile[key]));
            if(isFormValid){
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
                        toast.success("profile updated successfully")
                        setUpdatedProfile(result.data)
                        setUpdateProfileResponse(result)
                        handleClose()
                    }
                    else
                    {
                        toast.error("updation failed")
                    }

                  } catch (error) {
                    console.log(error);
                  }
            }
            }else{
                toast.error("Please fix the errors")
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
        <div style={{marginTop:"180px",minHeight:"100vh"}} className="justify-content-center align-items-center container-fluid">
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
        className="mb-3">
        <Form.Control type="text" placeholder="name@example.com"  value={updatedProfile?.username}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,username:e.target.value})}
        onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </FloatingLabel>

       <FloatingLabel
        controlId="floatingInputEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" value={updatedProfile?.email}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,email:e.target.value})}
        onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        {/* {errors.email && <p className="text-danger">{errors.email}</p>} */}
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" value={updatedProfile.password}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,password:e.target.value})}
        onChange={handleChange}/>   
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>     
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInputMobile"
        label="Mobile number"
        className="mb-3">
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.mobile}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,mobile:e.target.value})}
        onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
      </FloatingLabel>

      <form className="mb-3">
        <div>
            <label>Gender</label>
                <input className='ms-3' type="radio" value="Male" name="gender" checked={updatedProfile.gender === 'Male'} 
                            // onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})}
                            onChange={handleChange}/> Male
                <input className='ms-3' type="radio" value="Female" name="gender" checked={updatedProfile.gender === 'Female'} 
                            // onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})}
                            onChange={handleChange}/> Female
                <input className='ms-3' type="radio" value="Other" name="gender"  checked={updatedProfile.gender === 'Other'} 
                            // onChange={(e)=>setUpdatedProfile({...updatedProfile,gender:e.target.value})}
                            onChange={handleChange}/> Other
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>

        </div>
      </form>

      <FloatingLabel
        controlId="floatingInputLocation"
        label="Location"
        className="mb-3">
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.location}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,location:e.target.value})}
        onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInputSkill"
        label="Skill"
        className="mb-3"  >
        <Form.Control type="text" placeholder="name@example.com" value={updatedProfile.skill}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,skill:e.target.value})}
        onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">{errors.skill}</Form.Control.Feedback>
      </FloatingLabel>

      <form>
        <select name="" id="" className='form-control' value={updatedProfile.experience}
        // onChange={(e)=>setUpdatedProfile({...updatedProfile,experience:e.target.value})}
        onChange={handleChange} >
          <option hidden selected disabled value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1 to 3 years">1 to 3 years</option>
          <option value="3 - 5 yrs">3 - 5 yrs</option>
          <option value="Above 5 yrs">Above 5 yrs</option>
        </select>
        <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
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
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </>
  )
}

export default UserProfile

orignl user profile
----------------------------------------------------------------
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { editProfileAPI, getUserDetailsAPI } from '../Services/allAPI';
import { Offcanvas } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SERVER_URL from '../Services/serverURL';
import { updateProfileResponseContext } from '../Contexts/ContextAPI';
import userPic from '../assets/profilePic.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                        toast.success("profile updated successfully")
                        setUpdatedProfile(result.data)
                        setUpdateProfileResponse(result)
                        handleClose()
                    }
                    else
                    {
                        toast.error("updation failed")
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
        <div style={{marginTop:"180px",minHeight:"100vh"}} className="justify-content-center align-items-center container-fluid">
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
      <ToastContainer theme='colored' autoClose={3000} position='top-center'/>

    </>
  )
}

export default UserProfile

view job validation
---------------------------------------------------------------------------------
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import { editAJobAPI, viewAJobAPI } from '../Services/allAPI';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { editJobResponseContext } from '../Contexts/ContextAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewAJobAdmin() {
  const {editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

    const [jobDetails,setJobDetails] = useState([])

    console.log(jobDetails);
    const {id} = useParams()

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    const getJobDetails = async(id)=>{
    try {
        const result = await viewAJobAPI(id)
        console.log(result);
        if(result.status==200){
          const formattedJobDetails = {
            ...result.data,
            deadline: formatDate(result.data.deadline)
          }
          setJobDetails(formattedJobDetails)
          // const job = result.data
          // job.deadline = new Date(job.deadline).toLocaleDateString(); 
          //   setJobDetails(job)
            
        }
    } catch (error) {
        console.log(error);
    }
    }

    const [updatedJob,setUpdatedJob] = useState({
      id:jobDetails._id,
      title:jobDetails.title,
      company:jobDetails.company,
      location:jobDetails.location,
      category:jobDetails.category,
      email:jobDetails.email,
      description:jobDetails.description,
      jobType:jobDetails.jobType,
      salary:jobDetails.salary,
      deadline:jobDetails.deadline,
      experience:jobDetails.experience,
      vacancy:jobDetails.vacancy
    })
    // console.log(updatedJob);
    
    const handleShow = async (id) => {
      setShow(true);
      console.log(id);
      setUpdatedJob({
        id:jobDetails._id,
        title:jobDetails.title,
        company:jobDetails.company,
        location:jobDetails.location,
        category:jobDetails.category,
        email:jobDetails.email,
        description:jobDetails.description,
        jobType:jobDetails.jobType,
        salary:jobDetails.salary,
        deadline:jobDetails.deadline,
        experience:jobDetails.experience,
        vacancy:jobDetails.vacancy
      })
    }
    const handleClose = () => {
      setShow(false);
      setUpdatedJob({
        id:jobDetails._id,
        title:jobDetails.title,
        company:jobDetails.company,
        location:jobDetails.location,
        category:jobDetails.category,
        email:jobDetails.email,
        description:jobDetails.description,
        jobType:jobDetails.jobType,
        salary:jobDetails.salary,
        deadline:jobDetails.deadline,
        experience:jobDetails.experience,
        vacancy:jobDetails.vacancy
      })
    }

    const [errors, setErrors] = useState({});
    const regexPatterns = {
      title: /^[A-Za-z\s]+$/, // Letters and spaces
      salary: /^\d+$/, // Numbers
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email pattern
      company: /^[A-Za-z\s]+$/, // Letters and spaces
      location: /^[A-Za-z\s0-9]+$/, // Letters, numbers, and spaces
      description: /^.{10,}$/, // Minimum 10 characters for description
      category: /^[A-Za-z\s]+$/, // Letters and spaces
      jobType: /^[A-Za-z\s]+$/, // Letters and spaces
      experience: /^[A-Za-z\s0-9]+$/, // Numbers for experience
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
      setUpdatedJob({ ...updatedJob, [name]: value });
  
      // Validate each field on change
      validateField(name, value);
    };
    const handleUpdateJob = async()=>{
      const {title,salary,email,company,location,description,category,jobType,experience,vacancy,deadline} = updatedJob
      if(updatedJob.title && updatedJob.salary && updatedJob.email && updatedJob.company && updatedJob.location && updatedJob.description && updatedJob.category && updatedJob.jobType && updatedJob.experience && updatedJob.vacancy && updatedJob.deadline){

        const token = sessionStorage.getItem("token")
        if(token){
          try {
            const reqHeader = {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
            }
            const result = await editAJobAPI(id,updatedJob,reqHeader)
            console.log(result);
            
            if(result.status==200){
              setEditJobResponse(result)
              toast.success("Job Updation success")
              // setEditJobResponse(result)
              handleClose()
              setTimeout(()=>{
              navigate('/viewJobsAdmin')
              },3000)
            }
            else{
              console.log(result.response);              
            }
          } catch (error) {
            console.log(error);
            
          }
        }
      }
      else{
        toast.error("Please fill the form completely!!")
      }
    }
    useEffect(()=>{
        getJobDetails(id)
    },[editJobResponse])

  return (
    <>
        <AdminHeader insideDashboard={true}/>
      <div style={{marginTop:"150px",minHeight:"100vh"}} className="container-fluid justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center d-flex">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 p-5 border rounded-5 shadow justify-content-center">
              <h1 className='text-center'>{jobDetails?.title}</h1>
                <h3>Company Name:{jobDetails?.company}</h3>
                <h3>Location : {jobDetails?.location}</h3>
                <h3>Category : {jobDetails?.category}</h3>
                <h3>Email : {jobDetails?.email}</h3>
                <h3>Description : {jobDetails?.description}</h3>
                <h3>Job type : {jobDetails?.jobType}</h3>
                <h3>Salary : {jobDetails?.salary} PA</h3>
                <h3>Deadline : {jobDetails?.deadline}</h3>
                <h3>Experience : {jobDetails?.experience}</h3>
                <h3>Vacancies : {jobDetails?.vacancy}</h3>
                
                <div className="d-flex mt-5 justify-content-evenly">
                  <button onClick={()=>handleShow(jobDetails?._id)} className="btn btn-warning me-2">Edit</button>
                  <button className="btn btn-outline-primary"><Link style={{textDecoration:"none"}} to={`/viewJobsAdmin/${jobDetails?._id}/viewapplications`}>View Applications</Link></button>
                </div>
            </div>
            <div className="col-lg-2"></div>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg">
            <Modal.Header closeButton>
              <Modal.Title className='fw-bolder text-info'>Edit Job Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                   <div className='d-flex justify-content-between'>
                      <Form.Group className="mb-3 me-2" controlId="formGroupTitle">
                          <Form.Label className='text-black'>Title : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter title of job"
                          value={updatedJob?.title}
                          // onChange={(e)=>setUpdatedJob({...updatedJob,title:e.target.value})}
                          onChange={handleChange} />
                          {errors.title && <p className="text-danger">{errors.title}</p>}

                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupSalary">
                          <Form.Label  className='text-black'>Salary : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Salary" 
                          value={updatedJob?.salary}
                          // onChange={(e)=>setUpdatedJob({...updatedJob,salary:e.target.value})}
                          onChange={handleChange} />
                          {errors.salary && <p className="text-danger">{errors.salary}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupEmail">
                          <Form.Label  className='text-black'>Email : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="email" placeholder="Enter Email"
                           value={updatedJob?.email}
                          //  onChange={(e)=>setUpdatedJob({...updatedJob,email:e.target.value})}
                          onChange={handleChange} />
                          {errors.email && <p className="text-danger">{errors.email}</p>}

                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupCompany">
                          <Form.Label  className='text-black'>Company : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company name" 
                          value={updatedJob?.company}
                          // onChange={(e)=>setUpdatedJob({...updatedJob,company:e.target.value})}
                          onChange={handleChange} />
                          {errors.company && <p className="text-danger">{errors.company}</p>}

                      </Form.Group>
                   </div>

                    <div className='d-flex justify-content-between'>
                      <Form.Group className="mb-3 me-2" controlId="formGroupLocation">
                          <Form.Label  className='text-black'>Location : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Company Location" 
                          value={updatedJob?.location}
                          // onChange={(e)=>setUpdatedJob({...updatedJob,location:e.target.value})}
                          onChange={handleChange} />
                          {errors.location && <p className="text-danger">{errors.location}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupCategory">
                          <Form.Label className='text-black'>Category : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Category" 
                         value={updatedJob?.category}
                        //  onChange={(e)=>setUpdatedJob({...updatedJob,category:e.target.value})}
                        onChange={handleChange} />
                        {errors.category && <p className="text-danger">{errors.category}</p>}

                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupExperience">
                          <Form.Label  className='text-black'>Experience : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter Experience" 
                         value={updatedJob?.experience}
                        //  onChange={(e)=>setUpdatedJob({...updatedJob,experience:e.target.value})}
                        onChange={handleChange} />
                        {errors.experience && <p className="text-danger">{errors.experience}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3 me-2" controlId="formGroupVacancy">
                          <Form.Label  className='text-black'>Vacancy : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="text" placeholder="Enter job Vacancy"
                           value={updatedJob?.vacancy}
                          //  onChange={(e)=>setUpdatedJob({...updatedJob,vacancy:e.target.value})}
                          onChange={handleChange} />
                         {errors.vacancy && <p className="text-danger">{errors.vacancy}</p>}
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupJobtype">
                          <Form.Label  className='text-black'>Job type : </Form.Label>
                              <select name="" id="" className='form-control mb-3 border p-3 w-100 rounded'
                            
                            value={updatedJob?.jobType}
                            // onChange={(e)=>setUpdatedJob({...updatedJob,jobType:e.target.value})}
                            onChange={handleChange} 
                            >
                                  <option selected disabled hidden value="">Select job type</option>
                                  <option value="Part Time">Part Time</option>
                                  <option value="Full Time">Full Time</option>
                                  <option value="Intern">Intern</option>
                                  <option value="Contract">Contract</option>
                              </select>
                              {errors.jobType && <p className="text-danger">{errors.jobType}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDeadline">
                          <Form.Label className='text-black'>Deadline : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Enter job Deadline" 
                          value={updatedJob?.deadline}
                          // onChange={(e)=>setUpdatedJob({...updatedJob,deadline:e.target.value})}
                          onChange={handleChange} 
/>                {errors.deadline && <p className="text-danger">{errors.deadline}</p>}
                      </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label  className='text-black'>Description : </Form.Label>
                        <Form.Control
                        className='border rounded p-3 text-black'
                            as="textarea"
                            placeholder="Enter A description about the job"
                            // style={{ height: '100px' }}
                            style={{height: '100px'}}
                            value={updatedJob?.description}
                            // onChange={(e)=>setUpdatedJob({...updatedJob,description:e.target.value})}
                            onChange={handleChange} />
                            {errors.description && <p className="text-danger">{errors.description}</p>}
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formGroupDeadline">
                          <Form.Label className='text-black'>Deadline : </Form.Label>
                          <Form.Control className='border rounded p-3 text-black' type="date" placeholder="Entar job Deadline" 
                          />
                      </Form.Group> */}


                    </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleUpdateJob} variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer theme='colored' autoClose={3000} position='top-center'/>
      </div>
    </>
  )
}

export default ViewAJobAdmin