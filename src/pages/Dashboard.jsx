import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import UploadProject from '../components/UploadProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // This effect runs when the component mounts
    // setCurrentUser(JSON.parse(sessionStorage.getItem('loggedInUser')).username);
    const user = sessionStorage.getItem('loggedInUser')
    setCurrentUser(JSON.parse(user)); // Set isLoggedin based on whether the token exists
  }, []); // Empty dependency array means this effect runs only once on mount

  // console.log(currentUser.username);
  return (
    <>
      <Header dashboard />
      <Container style={{minHeight: '100vh'}}>
          <h2 className='ms-3' style={{marginTop:'100px'}}>Welcome <span className='text-warning'>{currentUser.username}</span></h2>
    
          <Row className='container-fluid mt-5'>
            <Col sm={12} md={8}>
              {/* my project  */}
              <UploadProject/>
            </Col>

            <Col sm={12} md={4}>
              {/* profile */}
              <Profile/>
            </Col>
          </Row>
      </Container>
    </>
  )
}

export default Dashboard
