import React, { useContext, useEffect, useState } from 'react'
import AddProoject from './AddProoject'
import { addProjectResponseContext } from '../context/ContextShare'
import { deleteProjectAPI, getUserProject } from '../services/allApis'
import EditProject from './EditProject'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadProject() {

  /* use context hook is used to access the context api */
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)

  const token = sessionStorage.getItem('token')

  const [projects, setProjects] = useState([])

  var reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` /* send token back as authorization */
  }

  const userProjects = async()=>{
    const result = await getUserProject(reqHeader)
    // console.log(result);
    setProjects(result.data)
  }

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
  } 
     const result = await deleteProjectAPI(id, reqHeader)
     if(result.status===200){
      //call getUserProject
      userProjects()
      toast.success("Project Removed Successfully")
     }
     else{
      toast.error(result.response.data)
     }
  }

  useEffect(()=>{
    userProjects()
  }, [addProjectResponse])

  return (
    <div className='card shadow p-3 ms-3 me-3'>
        
        <div className='d-flex'>
           <h3 className='text-success ms-3'> My projects</h3>
           <div className="ms-auto">
            <AddProoject/>
           </div>

        </div>
        <div className="mt-4">
            {/* collection of user project */}
            {
              projects?.length>0?
              projects?.map((item)=>(
                <div className="border d-flex align-items-center rounded p-2">
                <h5>{item.title}</h5>
                <div className="icon ms-auto">
                    {/* <button className="btn"><i class="fa-solid fa-pen-to-square text-info"></i></button> */}
                    <EditProject curretProject={item}/>
                    <a href={item.github} target='_blank' className="btn"><i class="fa-brands fa-github text-success"></i></a>
                    <button onClick={(e)=>handleDelete(item._id)} className="btn"><i class="fa-solid fa-trash text-danger"></i></button>
                </div>
              </div> 
              )):<p className='text-danger fw-bolder fs-3'>No project uploaded yet !!</p>
            }
            
        </div>
        <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </div>
  )
}

export default UploadProject
