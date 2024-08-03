import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({insideUserDashboard}) => {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.clear()
    navigate('/')
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
                  <Nav.Link   className='text-primary fw-bolder'><Link style={{textDecoration:"none"}} to={'/'}>HOME</Link></Nav.Link>
                  <Nav.Link className='text-primary fw-bolder'><Link style={{textDecoration:"none"}} to={'/viewjobs'}>VIEW JOBS</Link></Nav.Link>
                  <Nav.Link  className='text-primary fw-bolder'><Link style={{textDecoration:"none"}} to={'/appliedjobs'}>APPLIED JOBS</Link></Nav.Link>
                  <Nav.Link  className='text-primary fw-bolder'><Link style={{textDecoration:"none"}} to={'/savedjobs'}>SAVED JOBS</Link></Nav.Link>
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
