import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSavedJobsAPI, removeSavedJobAPI } from '../Services/allAPI';
import { editJobResponseContext, saveReponseContext } from '../Contexts/ContextAPI';

function SavedJobs() {
const {saveResponse,setSaveResponse} = useContext(saveReponseContext)
const {editJobResponse,setEditJobResponse} = useContext(editJobResponseContext)
const [savedJobs,setSavedJobs] = useState([])
console.log(savedJobs);

const getSavedJobs = async()=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }
  try {
    const result = await getSavedJobsAPI(reqHeader)
    console.log(result);
    if(result.status==200){
      const jobs = result.data.map(job => ({
        ...job,
        deadline: new Date(job.deadline).toLocaleDateString(),
      }));
      setSavedJobs(jobs);
    }
    
  } catch (error) {
    console.log(error);
    
  }
  }

}

const handledeleteSavedJob = async (jid)=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }
    try {
      const result = await removeSavedJobAPI(jid,reqHeader)
      if(result.status==200){
        getSavedJobs()
      }
      else{
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  }

useEffect(()=>{
  getSavedJobs()
},
[saveResponse,editJobResponse])

  return (
    <div>
             <Header  insideUserDashboard={true}/>   
     <div style={{marginTop:"180px",minHeight:"100vh"}}>
      <div className=' align-items-center container-fluid'>
        {/* this is to be dublicated part */}
          <Row className='container-fluid justify-content-center' >
            {
              savedJobs.length>0?
              savedJobs.map(item=>(
                    <Col key={item?._id} sm={12} md={6} lg={4}>
                <Card className='ms-2 mt-3 ' style={{ width: '20rem' }}>
                    <Card.Body style={{textAlign:"center"}}>
                      <Card.Title className='fs-3'>{item?.title}</Card.Title>
                      <Card.Subtitle className="my-2">Company Name : {item?.company.split(" ")[0]}</Card.Subtitle>
                      <Card.Text>Salary : {item?.salary}</Card.Text>
                      <Card.Text>Deadline : {item?.deadline} </Card.Text>
                      <div className='justify-content-between d-flex'>
                        <Card.Link className='btn btn-outline-primary' ><Link to={`/viewjobs/${item?.id}`}>View Details</Link> <i className="fa-solid fa-arrow-right"></i> </Card.Link>
                        <button onClick={()=>handledeleteSavedJob(item?._id)} className="btn btn-secondary text-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>

                      </div>
                    </Card.Body>
                  </Card>
                </Col> 
              ))
              :
              <div className="text-danger text-center fw-bolder">
                no saved jobs
              </div>
             }
          </Row>   
      </div>
      </div>
    </div>
  )
}

export default SavedJobs