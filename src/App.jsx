import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
// import Header from './Components/Header'
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




function App() {

const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
    {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>


        {/* user  */}
        <Route path='/viewjobs' element={<ViewJob/>}></Route>
        <Route path='/viewjobs/:id' element={<ViewAJob/>}></Route>
        {/* <Route path='/appliedjobs' element={ <AppliedJobs/> } ></Route> */}
        <Route path='/appliedjobs' element={isAuthorised ? <AppliedJobs/> : <Navigate to={'/login'}/> } ></Route>

        <Route path='/viewjobs/:id/applyAjob' element={isAuthorised ? <ApplyJobs/> : <Navigate to={'/login'}/> }></Route>
        <Route path='/savedjobs' element={isAuthorised ? <SavedJobs/> : <Navigate to={'/login'}/> }></Route>
        <Route path='/userdashboard' element={isAuthorised ? <UserDashboard/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/userProfile' element={isAuthorised ? <UserProfile/> : <Navigate to={'/login'}/>}></Route>

        {/* admin */}
        <Route path='/dashboard' element={isAuthorised ? <Dashboard/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/postjobs' element={isAuthorised ? <PostJobs/> : <Navigate to={'/login'}/>} ></Route>
        <Route path='/viewJobsAdmin' element={isAuthorised ? <ViewJobAdmin/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/viewJobsAdmin/:id' element={isAuthorised ? <ViewAJobAdmin/> : <Navigate to={'/login'}/>}></Route>
        <Route path='/viewJobsAdmin/:id/viewapplications' element={isAuthorised ? <ViewApplications/> : <Navigate to={'/login'}/>}></Route>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
