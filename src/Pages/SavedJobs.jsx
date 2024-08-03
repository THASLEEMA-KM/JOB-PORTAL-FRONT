import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSavedJobsAPI } from '../Services/allAPI';

function SavedJobs() {



  return (
    <div>
             <Header  insideUserDashboard={true}/>   
     <div style={{marginTop:"180px"}}>
      <div className=' align-items-center container-fluid'>
        {/* this is to be dublicated part */}
          <Row className='container-fluid justify-content-center' >
            <Col sm={12} md={6} lg={4}>
            <Card className='ms-5 mt-3' style={{ width: '20rem' }}>
                <Card.Body style={{textAlign:"center"}}>
                  <Card.Title className='fs-3'>Job Title</Card.Title>
                  <Card.Subtitle className="my-2">Company Name : qwery</Card.Subtitle>
                  <Card.Text>Salary : 10000</Card.Text>
                  <Card.Text>Deadline : Date </Card.Text>
                  <div><Card.Link className='btn btn-outline-primary' ><Link to={'/viewjobdetails'}>View Details</Link> <i className="fa-solid fa-arrow-right"></i> </Card.Link></div>
                </Card.Body>
              </Card>
            </Col>  
          </Row>   
      </div>
      </div>
    </div>
  )
}

export default SavedJobs