import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
function AdminHeader({insideDashboard}) {

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
              <Link to={'/dashboard'} style={{textDecoration:'none'}}>
                <i className="fa-solid fa-cube text-info fs-2 me-3"></i>
                  JOB PORTAL
              </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link  className='text-primary fw-bolder'><Link to={'/dashboard'} style={{textDecoration:"none"}}>HOME</Link></Nav.Link>
                  <Nav.Link  className='text-primary fw-bolder'><Link to={'/postjobs'} style={{textDecoration:"none"}} >POST JOBS</Link></Nav.Link>
                  <Nav.Link  className='text-primary fw-bolder'><Link to={'/viewJobsAdmin'} style={{textDecoration:"none"}}>VIEW JOBS</Link></Nav.Link>
                </Nav>
                <Nav className='ms-auto jusify-content-between'>
                  { insideDashboard &&
                  <button className='btn btn-info text-black rounded-5 mx-lg-2 my-2 my-lg-0' onClick={handleLogout}>
                  LOGOUT
                  </button> 
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
      </Navbar>
    </>
  )
}

export default AdminHeader