import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { addProjects, updateProject } from '../services/allApis';
import { addProjectResponseContext } from '../context/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/baseUrl';

function EditProject({curretProject }) {

  
     /* use context hook is used to access the context api */
    const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)

    /*  */
    const [show, setShow] = useState(false);

    /*  */
    const handleClose = () => {
        setShow(false);

        // /* while closing the modal also call the handleClear to clear the input fields */
        // handleClear()
        setPreview("")

    }

    const handleShow = () => setShow(true);

    const [projectData, setProjectData] = useState({
        id: curretProject._id,
        title: curretProject.title,
        language: curretProject.language,
        github: curretProject.github,
        website: curretProject.website,
        overview: curretProject.overview,
        projectImage: ""
    })

    // console.log("this is the image url", `${BASE_URL}/uploads/${encodeURIComponent(curretProject.projectImage)}`);

    console.log("Project data", projectData);
    
    const [preview,setPreview] = useState("")

    const [token, setToken] = useState("")

    /* use useEffect to fetch token whenever page loads and save to state */
    useEffect(()=>{
        setToken(sessionStorage.getItem('token'))
    }, [])

    useEffect(()=>{
        if(projectData.projectImage){
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
    },[projectData.projectImage])

    const handleClear = ()=>{

        /* Emptying the data */
        setProjectData({...projectData, id: "", title: "", language: "", github: "", website: "", overview: "", projectImage: "" })

    }

    /* Api / Adding  / To DataBase */
    const handleAdd = async(e)=>{
        e.preventDefault()
        const {id, title, language, github, website, overview, projectImage} = projectData
        if(!title || !language || !github || !website || !overview || !projectImage){
            toast.warning("Please fill the form completely")
        }
        else{
            /* if there is any uploading comtents from the system we should send the body in the for of form data */

            /* create object for form data */
            const reqBody = new FormData()

            /* add data to the form data */
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview? reqBody.append("projectImage",projectImage):reqBody.append("projectImage",curretProject.projectImage)

            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }

            }

            const result = await updateProject(id, reqBody, reqHeader)
            console.log("Update results", result);
            if(result.status === 200){
                toast.success("Project Succesfully added")
                handleClose()
                setAddProjectResponse(result.data)
            }
            else{
                toast.error(result.response.data)
            }
            // if
        }
    }


  return (
    <>
        <button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square text-info"></i></button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg' 
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-6">
                        <label>
                            <input type="file" style={{display:'none'}} onChange={(e)=>{setProjectData({...projectData, projectImage:e.target.files[0]})}}/>
                            <img className='img-fluid' src={projectData.projectImage?`${BASE_URL}/uploads/${encodeURIComponent(curretProject.projectImage)}`:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" /></label>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                        <div className='mb-3 mt-3 w-100'>
                            <input onChange={(e)=>{setProjectData({...projectData, title:e.target.value})}} value={projectData.title} type="text" className="form-control" placeholder='project Title'/>
                        </div>
                        <div className='mb-3 w-100'>
                            <input onChange={(e)=>{setProjectData({...projectData, language:e.target.value})}} value={projectData.language} type="text" className="form-control" placeholder='Language used'/>
                        </div>             
                        
                        <div className='mb-3 w-100'>
                            <input onChange={(e)=>{setProjectData({...projectData, github:e.target.value})}} value={projectData.github} type="text" className="form-control" placeholder='Github Link'/>
                        </div>
                        <div className='mb-3 w-100'>
                            <input onChange={(e)=>{setProjectData({...projectData, website:e.target.value})}} value={projectData.website} type="text" className="form-control" placeholder='Website Link'/>
                        </div>
                        <div className='mb-3 w-100'>
                            <textarea onChange={(e)=>{setProjectData({...projectData, overview:e.target.value})}} value={projectData.overview} type="text" className="form-control" placeholder='Project OverView'/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClear}>
                    Clear
                </Button>
                <Button variant="success" onClick={handleAdd}>Add</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditProject
