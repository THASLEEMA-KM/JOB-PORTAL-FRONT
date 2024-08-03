import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import homeimage from '../assets/homeimg1.png'
import './home.css'
import Header from '../Components/Header';
const Home = () => {
  return (
   <>
   <Header/>
      <div style={{height:"100vh",marginTop:"150px"}} className='bg-white'>
       <div className="row container-fluid justify-content-between align-items-center">
          <div className="col-lg-7 ">
            <h1 className='homehead text-dark '><strong>To Choose</strong> <br />
            <span className='fw-bolder homehead'>Right Jobs.</span></h1>
              <div className='row mt-3 px-4'>
                <div className="col-lg-2"></div>
                
                <div className='col-lg-8 mt-3 pb-3 py-4 px-3  border border-1 rounded'>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Your job"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      className='rounded bg-light w-50 p-2'
                    />
                    <Button variant="primary" id="button-addon2" className='rounded ms-3'>
                      Search
                    </Button>
                  </InputGroup>
                  <p className='text-black'>
                  <i className="fa-solid fa-bookmark mx-3 text-primary"></i>
                    Suggested Tags : <span style={{color:"GrayText",fontSize:"17px"}}>Software/Marketing/UI-UX Developer...</span></p>
  
                </div>
                <div className="col-lg-2"></div>
              </div>
          </div>
          <div className="col-lg-5">
            <img className='img-fluid' src={homeimage} alt="" />
          </div>
       </div>
      </div>
   </>
  )
}

export default Home

