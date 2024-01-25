import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap';
import projectimage from '../Assests/videoPlayer.png'
import { BASE_URL } from '../services/baseUrl';

function ProjectCard({data}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Card className='shadow mb-5 btn ' onClick={handleShow}>
        <Card.Img variant="top" src={`${BASE_URL}/uploads/${data.projectImage}`}/>
        <Card.Body>
            <Card.Title>{data.title}</Card.Title> 
        </Card.Body>
        </Card>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col md={6}>
                <img src={`${BASE_URL}/uploads/${data.projectImage}`} alt="no image"  style={{height:'200px'}} className='img-fluid'/>
                </Col>
                <Col md={6}>
                    <h2>Description</h2>
                    <p>{data.overview}</p>
                    <p>Language Used : <span className='fw-bolder'>{data.language}</span></p>
                </Col>
            </Row>
            <div className='mt-3'>
                <a href={data.github} target='-blank' className='btn me-5'><i class="fa-brands fa-github fa-2x"></i></a>
                <a href={data.website} target='-blank'  className='btn me-5'><i class="fa-solid fa-link fa-2x"></i></a>
            </div>
            </Modal.Body> 
        </Modal>
    </>
  )
}

export default ProjectCard
