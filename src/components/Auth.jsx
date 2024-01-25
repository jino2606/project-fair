import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginApi, registerApi } from '../services/allApis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({register}) {

  /* to set login is made or not */
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  /* storing the register data */
  const isRegisterForm = register ? true : false
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    username:"",
    email:"",
    password:""
  })

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleRegister = async(e)=>{
    e.preventDefault()

    const {username, email, password} = registerData
    if(!username || !email || !password){
      toast.warning("Please Fill the form first")
    }
    else{
      const result = await registerApi(registerData)
      if(result.status === 200){
        // ${response.data.caption}
        toast.success(`User Registered Successfully`)

        /* Empty the form */
        setRegisterData({
          username:"",
          email:"",
          password:""
        })

        /* navigate to login after successful register */
        navigate('/login')
      }
      else{
        toast.error(result.response.data)
      }
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()

    const {email, password} = loginData
    if(!email || !password){
      toast.warning("Please Fill the form first")
    }
    else{
      const result = await loginApi(loginData)
      if(result.status === 200){
        // ${response.data.caption}
        toast.success(`Logged in Successfully`)
        // alert(`Logged in Successfully`)

        /* saving the session and token in to the session storage. Create a key and value*/
        sessionStorage.setItem("loggedInUser", JSON.stringify(result.data.loggedInUser)) /* covert it to a string format while storing */
        sessionStorage.setItem("token", result.data.token)

        /* Empty the form */
        setLoginData({
          email:"",
          password:""
        })

        /* setting the is auth to true for */
        setIsAuthToken(true)

        /* setting a timeout to show and make work the toast messge to work */
        /*  introducing artificial delays using setTimeout is generally not considered a best practice, as it may lead to unpredictable behavior and is more of a workaround than a solution.
            Using a state management solution, such as passing state through the router, is a cleaner and more maintainable approach */
        // setTimeout(()=>{
          /* navigate to home */
          navigate('/')
        // }, 2000)
        
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  
  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className='w-75 container'>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><i class="fa-solid fa-arrow-left me-3"></i>Back to Home</Link>
        <div className='card shadow p-5 bg-success mb-5'>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png"
                alt="login"
                className="rounded-start w-100"
              />
            </div>
            <div className="col-lg-6 p-5">
              <div className='d-flex align-items-center flex-column'>
                <h1 className='fw-bolder text-light mt-2'><i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h1>
                <h5 className='fw-bolder mt-4 pb-3 text-light'>
                  {
                    register ? 'Sign up to your Account' : 'Sign In to your Account'
                  }
                </h5>
                <Form className='text-light w-100 mt-4'>
                  { 
                  register &&
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>{setRegisterData({...registerData, username:e.target.value})}} value={registerData.username} type="text" placeholder="Username"  />
                  </Form.Group>}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>{ register?setRegisterData({...registerData, email:e.target.value}):setLoginData({...loginData, email:e.target.value}) }} value={register?registerData.email:loginData.email} type="email" placeholder="Enter your Email Id"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>{ register?setRegisterData({...registerData, password:e.target.value}):setLoginData({...loginData, password:e.target.value}) }} value={register?registerData.password:loginData.password} type="password" placeholder="Enter your password"/>
                  </Form.Group>
                   {
                    register ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-warning mt-3'>Register</button>
                      <p>Already have account? Click here to <Link style={{color:'blue'}} to={'/login'}> Login</Link></p>
                    </div> :
                    <div>
                    <button onClick={handleLogin} className='btn btn-warning mt-3'>Login</button>
                    <p>New User? Click here to <Link to={'/register'} style={{color:'blue'}} > Register</Link></p>
                  </div> 
                   }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </div>
  )
}

export default Auth
