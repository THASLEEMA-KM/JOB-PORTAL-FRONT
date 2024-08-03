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
export const postjobAPI = async(reqBody,reqHeader)=>
    {
        return await commonAPI("POST",`${SERVER_URL}/postjob`,reqBody,reqHeader)
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
export const getSavedJobsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/savedjob`,"")
}