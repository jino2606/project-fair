import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BannerImage from '../Assests/designer.svg'
import ProjectCard from '../components/ProjectCard'
import { homeProjects } from '../services/allApis'

function Home() {

    /* Get if the token is present if present then it is considered as logged in */
    // const isLoggedin = sessionStorage.getItem("token")
    
    // console.log("isLiafasfgggED IN", isLoggedin);

    /* using use state and use effect to get and store the token whenever the page loads */
    const [isLoggedin, setIsLoggedin] = useState(false);

    /* creating astate to store the api data */
    const [projects, setProjects] = useState([])

    /* Api call */
    const getHomeProjects = async()=>{
        const result = await homeProjects()
        console.log("The Heome resultes", result);
        setProjects(result.data)
    }

    useEffect(()=>{
        getHomeProjects()
    }, [])

    useEffect(() => {
      // This effect runs when the component mounts
      const token = sessionStorage.getItem('token');
      setIsLoggedin(!!token); // Set isLoggedin based on whether the token exists
    }, []); // Empty dependency array means this effect runs only once on mount


    return (
        <>
            <div style={{width:'100%', height:'100vh'}} className='bg-success' >
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6}>
                        <h1 style={{fontSize:'50px'}} className='fw-bolder text-light mb-5'> <i class="fa-brands fa-stack-overflow"></i>Project Fair</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt amet doloribus minus soluta itaque </p>
                        
                        {
                            /* Based on is loggedin sashow manage project or get started button */
                            isLoggedin?
                            <Link to={'/dashboard'} className='btn btn-warning rounded'>Manage your project</Link>:
                            <Link to={'/login'} className='btn btn-warning rounded'>Get started</Link>
                        }
                        

                        </Col>
                        <Col sm={12} md={6}>
                        <img src={BannerImage} alt="" style={{marginTop:'100px'}} className='w-75' />
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='all-project mt-5'>
                <h1 className='text-center'>Explore Our Project</h1>
                <marquee scrollAmount={25} className=" mt-5">
                    <div className='d-flex'>
                        {
                            projects?.length>0?
                            projects.map((item)=>(
                                <div className='ms-5' style={{width:'500px'}}>
                                    <ProjectCard data={item}/>
                                </div>
                            )):
                            <h3>Nop Found</h3>
                        }
                    </div>
                </marquee>
                <div className='text-center mt-5'>
                    <Link to={'/projects'}>View more project</Link>
                </div>
            </div>
        </>
    )
}

export default Home
