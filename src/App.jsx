import { Route, Routes } from 'react-router-dom'
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



function App() {

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
        <Route path='/appliedjobs' element={<AppliedJobs/>}></Route>
        <Route path='/viewjobs/:id/applyAjob' element={<ApplyJobs/>}></Route>
        <Route path='/savedjobs' element={<SavedJobs/>}></Route>
        <Route path='/userdashboard' element={<UserDashboard/>}></Route>

        {/* admin */}
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/postjobs' element={<PostJobs/>} ></Route>
        <Route path='/viewJobsAdmin' element={<ViewJobAdmin/>}></Route>
        <Route path='/viewJobsAdmin/:id' element={<ViewAJobAdmin/>}></Route>
        <Route path='/viewJobsAdmin/:id/viewapplications' element={<ViewApplications/>}></Route>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
