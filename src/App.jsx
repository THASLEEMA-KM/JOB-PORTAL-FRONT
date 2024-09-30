import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import PostJobs from './Pages/PostJobs'
import ViewJob from './Pages/ViewJob'
import AppliedJobs from './Pages/AppliedJobs'
import ApplyJobs from './Pages/ApplyJobs'
import ViewAJob from './Pages/ViewAJob'
import ViewApplications from './Pages/ViewApplications'
import ViewJobAdmin from './Pages/ViewJobAdmin'
import ViewAJobAdmin from './Pages/ViewAJobAdmin'
import SavedJobs from './Pages/SavedJobs'
import UserDashboard from './Pages/UserDashboard'
import UserProfile from './Pages/UserProfile'
import { useContext } from 'react'
import { tokenAuthContext } from './Contexts/AuthContext'
// import AllApplications from './Pages/AllApplications'




function App() {

const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

        {/* user  */}
        <Route path='/viewjobs' element={<ViewJob/>}></Route>
        <Route path='/viewjobs/:id' element={<ViewAJob/>}></Route>
        <Route path='/appliedjobs' element={isAuthorised && <AppliedJobs/>  } ></Route>
        <Route path='/viewjobs/:id/applyAjob' element={isAuthorised && <ApplyJobs/> }></Route>
        <Route path='/savedjobs' element={isAuthorised && <SavedJobs/>  }></Route>
        <Route path='/userdashboard' element={isAuthorised && <UserDashboard/>}></Route>
        <Route path='/userProfile' element={isAuthorised && <UserProfile/> }></Route>

        {/* admin */}
        <Route path='/dashboard' element={isAuthorised && <Dashboard/> }></Route>
        <Route path='/postjobs' element={isAuthorised && <PostJobs/> } ></Route>
        <Route path='/viewJobsAdmin' element={isAuthorised && <ViewJobAdmin/> }></Route>
        <Route path='/viewJobsAdmin/:id' element={isAuthorised && <ViewAJobAdmin/> }></Route>
        <Route path='/viewJobsAdmin/:id/viewapplications' element={isAuthorised && <ViewApplications/> }></Route>
        {/* <Route path='/allApplications' element={ isAuthorised && <AllApplications/>}></Route> */}

      </Routes>
      <Footer/>
    </>
  )
}

export default App
