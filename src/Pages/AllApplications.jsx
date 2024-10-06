import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllApplicationsAPI, removeAppliedJobAPI } from '../Services/allAPI';
import { applyReponseContext, deleteAppliedJobResponseContext } from '../Contexts/ContextAPI';
import { Link } from 'react-router-dom';

function AllApplications() {

  const [allUserApplications, setAllUserAppliedJobs] = useState([]);
  // console.log(allUserApplications);
  const { applyResponse, setApplyResponse } = useContext(applyReponseContext);
  const { deleteAppliedJobResponse, setDeleteAppliedJobResponse } = useContext(
    deleteAppliedJobResponseContext
  );
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const jobsPerPage = 10; // Jobs to display per page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentAppliedJobs = allUserApplications.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

    // Change page
    const paginate = (pageNumber) => {
      if (
        pageNumber >= 1 &&
        pageNumber <= Math.ceil(allUserApplications?.length / jobsPerPage)
      ) {
        setCurrentPage(pageNumber);
      }
    };
    
    const getAllUserApplications = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await getAllApplicationsAPI(reqHeader);
          if (result.status == 200) {
            // setAllUserAppliedJobs(result.data);
            setAllUserAppliedJobs((prevData) => {
              if (JSON.stringify(prevData) !== JSON.stringify(result.data)) {
                return result.data;
              }
              return prevData;
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    
// useEffect(() => {
//   if (applyResponse) {
//     getAllUserApplications();
//   }
// }, [applyResponse]);

// useEffect(() => {
//   if (deleteAppliedJobResponse) {
//     getAllUserApplications();
//   }
// }, [deleteAppliedJobResponse]);

// // Call this once on initial mount to fetch all applications
// useEffect(() => {
//   getAllUserApplications();
// }, []);

    useEffect(() => {
      getAllUserApplications();
    }, [applyResponse,deleteAppliedJobResponse]);



  return (
    <>
     <AdminHeader insideDashboard={true}/> 
     <div
        style={{ marginTop: "150px", minHeight: "100vh" }}
        className="container-fluid"
      >
        <h1 className="my-3 text-center">All Applications</h1>
        <p className="text-center">Total Count :{allUserApplications?.length}</p>
        <div className="row mt-5 d-flex">
          <div className="col"></div>
          <div className="col-lg-10">
            <div className="table-responsive">
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentAppliedJobs?.length > 0 &&
                    currentAppliedJobs?.map((items, index) => (
                      <tr key={items?.id}>
                        <td>{index + 1}</td>
                        <td>{items?.title} 
                          <Link to={`/viewJobsAdmin/${items?.jobId}`}><i className="fa-solid fa-eye ms-2 text-warning" ></i></Link>
                        </td>
                        <td>{items?.username}</td>
                        <td>{items?.email}</td>
                        <td>
                          {items?.status}
                        </td>
                        <td>
                          <a
                            style={{ textDecoration: "none" }}
                            href={items?.resumeFile}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View CV
                          </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            {currentAppliedJobs?.length == 0 && (
              <div className="fw-bolder text-center text-danger">
                NO APPLICATIONS YET!!!
              </div>
            )}
            {/* pagination for user applied jobs listing if grtr than 10 */}
            {allUserApplications.length > 10 && (
              <div className="d-flex justify-content-center my-5">
                <Pagination>
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                  {Array.from(
                    { length: Math.ceil(allUserApplications.length / jobsPerPage) },
                    (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                </Pagination>
              </div>
            )}
          </div>
          <div className="col"></div>
        </div>
      </div>
      <ToastContainer theme="colored" autoClose={3000} position="top-center" />
    </>
  )
}

export default AllApplications