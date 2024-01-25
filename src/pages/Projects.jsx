import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjects } from '../services/allApis'
import { Link } from 'react-router-dom'

function Projects() {

    /* to store the api data */
    const [projectsData, setProjectsData] = useState([])

    /* search box */
    const [searchKey, setSearchKey] = useState("")

    /* to save the token */
    const [token, setToken] = useState()

    console.log(searchKey);

    /* api call */
    const getAllProject = async()=>{

        /* getting token from session */
        if(sessionStorage.getItem('token')){
            const token = sessionStorage.getItem('token')
            setToken(token)
            var reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` /* send token back as authorization */
            }
            const result = await allProjects(searchKey, reqHeader)
            setProjectsData(result.data)
            console.log("The results", result);
        }
        else{
            
        }


    }

    useEffect(()=>{
        getAllProject()
    }, [searchKey])

if(!token){
    return(
        <div>
            <p className='text-danger fs-3 text-center'>Sorry No Project Currently Avaliable</p>:
            <div className='d-flex justify-content-center align-items-center flex-column' >
                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" height={'200px'} width={'200px'} />
                <p className='text-danger fs-3 mt-4' >Please <Link style={{textDecoration: 'none', color: 'blue' }} to={'/login'}>login</Link> to view more Project</p>
            </div>
        </div>
    )
}
else{
    return (
        <>
            <Header/>
            <div className='text-center' style={{marginTop:'150px'}}>
                <h1>All Project</h1>
    
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex w-25 mt-5">
                    <input onChange={(e)=>{setSearchKey(e.target.value)}} className='form-control' type="text" placeholder='Search the project using technologies' />
                    <i style={{marginLeft:'-40px', color:'grey'}} class="fa-solid fa-magnifying-glass  fa-rotate-90"></i>
                    </div>
                    
                </div>
                <Row className='mt-5 container-fluid'>
                    {
                        projectsData?.length>0?
                        projectsData.map((item)=>(
                            <Col sm={12} md={6} lg={4}>
                                <ProjectCard data={item}/>
                            </Col>
                        )):
                        <h4>No projects to display</h4>
                    }
    
                </Row>
            </div>
        
        </>
      )
}


}

export default Projects
