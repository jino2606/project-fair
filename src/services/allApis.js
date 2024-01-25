import { BASE_URL } from "./baseUrl"
import { commomAPI } from "./commonApi"


/* user register api*/
export const registerApi = async(reqBody)=>{
    return await commomAPI('POST', `${BASE_URL}/user/register`, reqBody, "")  
}

/* user login api*/
export const loginApi = async(reqBody)=>{
    return await commomAPI('POST', `${BASE_URL}/user/login`, reqBody, "")  
}

/* add project api*/
export const addProjects = async(reqBody, reqHeader)=>{
    return await commomAPI('POST', `${BASE_URL}/projects/add`, reqBody, reqHeader)  
}

/* get home project api*/
export const homeProjects = async()=>{
    return await commomAPI('GET', `${BASE_URL}/projects/homeProjects`)  
}

/* get all project api*/
export const allProjects = async(searchKey, reqHeader)=>{ /* passing a query param search key as param*/
    /* query parameter = path?key=value */
    return await commomAPI('GET', `${BASE_URL}/projects/allProjects?search=${searchKey}`, "", reqHeader)  
}

/* get user specified projects */
export const getUserProject = async(reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/projects/userProjects`, "", reqHeader)
}

/* edit user projects */
export const updateProject = async(projectId, reqBody, reqHeader)=>{
    console.log("bitchhm",projectId, reqBody, reqHeader);
    return await commomAPI('PUT', `${BASE_URL}/projects/updateProjects/${projectId}`, reqBody, reqHeader)
}

//delete user project
export const deleteProjectAPI = async(projectId, reqHeader)=>{
    return await commomAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}

//profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
    return await commomAPI("PUT",`${BASE_URL}/user/update`,reqBody,reqHeader)
}