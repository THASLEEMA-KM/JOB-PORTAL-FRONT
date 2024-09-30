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
    setPostJob({ ...postJob, [name]: value });

    // Validate each field on change
    validateField(name, value);
  };

  const handlePostJob = async () => {
    // Validate all fields before submitting the form
    const isFormValid = Object.keys(postJob).every((key) => validateField(key, postJob[key]));
    if(postJob.title && postJob.salary && postJob.email && postJob.company && postJob.location && postJob.description && postJob.category && postJob.jobType && postJob.experience && postJob.vacancy && postJob.deadline
    ){
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
    }
    else{
        toast.error("Please fill the form completely")
    }
    
  };
const handleCancel = ()=>{
    setPostJob({
        title: "", salary: "", email: "", company: "", location: "", description: "", category: "", jobType: "", experience: "", vacancy: "", deadline: ""
      });
}
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

              <div className="d-flex justify-content-evenly">
                <button className="btn btn-primary px-4 py-2 me-2" onClick={handlePostJob} type="button">Post Job</button>
                <button className="btn btn-warning px-4 py-2" onClick={handleCancel} type="button">Cancel</button>
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
