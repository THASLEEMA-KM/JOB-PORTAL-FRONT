import axios from "axios";

const commonAPI = async(httpMethod,url,reqBody,reqHeader)=>
{
    // const token = sessionStorage.getItem("token")
    const reqConfig = {
        method :httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{
            "Content-Type":"application/json",
            // 'Authorization': `Bearer ${token}`
        }

    }
    return await axios(reqConfig).then(res=>{
        return res;
    
    }).catch(err=>{
        return err;
    })
}
export default commonAPI