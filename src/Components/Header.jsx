import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'

const Header = ({insideUserDashboard}) => {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.clear()
    navigate('/')
  }
  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("user")

  const handlehome =()=>{
    navigate('/')
  }
  const handleviejob =()=>{
    navigate('/viewjobs')
  }
  const handleAppliedjob = ()=>{
    if(token && userId){
      navigate('/appliedjobs')
    }
    else{
      alert("Please login first")
      navigate('/login')
    }
  }
  const handleSavedjob = ()=>{
    if(token && userId){
      navigate('/savedjobs')
    }
    else{
      alert("Please login first")
      navigate('/login')
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-white navbar  mb-3 " fixed="top">
            <Container className='justify-content-between align-items-center'>
              <Navbar.Brand className='fw-bolder text-info'>
              <Link to={'/'} style={{textDecoration:'none'}}>
                <i className="fa-solid fa-cube text-info fs-2 me-3"></i>
                  JOB PORTAL
              </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link   className='text-primary fw-bolder'><button onClick={handlehome} className='btn btn-link  fw-bolder' style={{textDecoration:"none"}} >HOME</button></Nav.Link>
                  <Nav.Link className='text-primary fw-bolder'><button onClick={handleviejob} className='btn btn-link  fw-bolder' style={{textDecoration:"none"}} >VIEW JOBS</button></Nav.Link>
                  <Nav.Link  className='text-primary fw-bolder'><button className='btn btn-link  fw-bolder' style={{textDecoration:"none"}} onClick={handleAppliedjob} > APPLIED JOBS</button></Nav.Link>
                  <Nav.Link className='text-primary fw-bolder'><button className='btn btn-link  fw-bolder' style={{textDecoration:"none"}} onClick={handleSavedjob} >SAVED JOBS</button></Nav.Link>
                </Nav>
                <Nav className='ms-auto jusify-content-between'>
                {
                    insideUserDashboard ?
                    <Link className='btn btn-primary text-black rounded-5 mx-lg-2 my-2 my-lg-0'>
                      <i className="fa-solid fa-user"></i>
                  </Link>
                  :
                  <Link className='btn btn-info text-black rounded-5 mx-lg-2 my-2 my-lg-0' to={'/login'}>
                    LOGIN
              </Link>
                  }
                  {
                    insideUserDashboard ?
                    <button onClick={handleLogout} className='btn btn-info text-black rounded-5 mx-lg-2 my-2 my-lg-0' >
                  <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  :
                  <Link className='btn btn-primary text-black rounded-5 mx-lg-2 my-2 my-lg-0' to={'/register'}>
                     SIGNUP
                  </Link>
                  }
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
      </Navbar>
    </>
  )
}

export default Header
