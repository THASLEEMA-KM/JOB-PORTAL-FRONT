import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

export const registerAPI = async (reqBody)=>
    {
        return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
        
    }
export const loginAPI = async(reqBody)=>
    {
        return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
    }
// export const adminLoginAPI = async(reqBody)=>
//     {
//         return await commonAPI("POST",`${SERVER_URL}/adminlogin`,reqBody)
//     }

// get user details 
export const getUserDetailsAPI = async(reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/userProfile`,"",reqHeader)
}

//edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/userProfile/edit`,reqBody,reqHeader)
}

export const postjobAPI = async(reqBody,reqHeader)=>
    {
        return await commonAPI("POST",`${SERVER_URL}/postjob`,reqBody,reqHeader)
    }

// edit a job
export const editAJobAPI = async(id,reqBody,reqHeader)=>
    {
        return await commonAPI("PUT",`${SERVER_URL}/viewjob/${id}/edit`,reqBody,reqHeader)
    } 

// viewjob
export const viewAllJobAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/viewjob`,"")
}

// view a job
 export const viewAJobAPI =  async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/viewjob/${id}`,"")
 }
 
//  remove a job
export const removeJobAPI = async(id,reqHeader)=>{
return await commonAPI("DELETE",`${SERVER_URL}/viewjob/${id}/remove`,{},reqHeader)
}

//  save job
export const saveJobAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/viewjob/${id}/savejob`,reqBody,reqHeader)
}
//  get saved jobs
export const getSavedJobsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/savedjob`,"",reqHeader)
}

//  remove saved job
export const removeSavedJobAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/savedjob/${id}/remove`,{},reqHeader)
    }
    
// apply to job
export const applyJobAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/viewjob/${id}`,reqBody,reqHeader)
}
// get applied jobs to user
export const getAppliedJobsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/appliedjob`,"",reqHeader)
}

// remove applied jobs
export const removeAppliedJobAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/appliedjob/${id}/remove`,{},reqHeader)
    }

// get applied jobs
export const getAllAppliedJobsAPI = async(id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/viewjob/${id}/viewApplication`,"",reqHeader)
}  

// get all applications to amin
export const getAllApplicationsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/allApplications`,"",reqHeader)
}  


// update job status 
export const updateJobStatusAPI = async(id,applicationId,data,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/viewjob/${id}/viewApplication/${applicationId}/status`,data,reqHeader)
}

// remove an user application
export const removeAnApplicationAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/viewjob/${id}/viewApplication/${id}/remove`,{},reqHeader)
}