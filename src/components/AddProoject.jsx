import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { addProjects } from '../services/allApis';
import { addProjectResponseContext } from '../context/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProoject() {

    /* use context hook is used to access the context api */
    const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)

    
    /*  */
    const [show, setShow] = useState(false);

    /*  */
    const handleClose = () => {
        setShow(false);

        /* while closing the modal also call the handleClear to clear the input fields */
        handleClear()

    }

    const handleShow = () => setShow(true);

    const [projectData, setProjectData] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    const [token, setToken] = useState("")

    /* use useEffect to fetch token whenever page loads and save to state */
    useEffect(()=>{
        setToken(sessionStorage.getItem('token'))
    }, [])

    const handleClear = ()=>{

        /* Emptying the data */
        setProjectData({...projectData, title: "", language: "", github: "", website: "", overview: "", projectImage: "" })
    }

    /* to hold the url of the image to preview */
    const [previewUrl, setPreviewUrl] = useState("")
    
    /* use use effect to load the image url into a state when an image is uploaded , whenever aprojectInage cahanges*/
    useEffect(()=>{
        if(projectData.projectImage){
            /*  use the URL.createObjectURL() to get an url for the coosen ilage to dislay a preview */
            setPreviewUrl(URL.createObjectURL(projectData.projectImage))
        }
        else{
            /* this can be also done inside the handleclear function no need of this else function */
            setPreviewUrl("")
        }
    },[projectData.projectImage])

    /* Api / Adding  / To DataBase */
    const handleUpdate = async(e)=>{
        e.preventDefault()
        const {title, language, github, website, overview, projectImage} = projectData
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
            reqBody.append("projectImage", projectImage)

            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }

            }

            const result = await addProjects(reqBody, reqHeader)
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
        <Button variant="success" onClick={handleShow}>
            Add project
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg' 
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-6">
                        <label>
                            <input type="file" style={{display:'none'}} onChange={(e)=>{setProjectData({...projectData, projectImage:e.target.files[0]})}}/>
                            <img className='img-fluid' src={previewUrl?previewUrl:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" /></label>
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
                <Button variant="success" onClick={handleUpdate}>Add</Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </>
  )
}

export default AddProoject
