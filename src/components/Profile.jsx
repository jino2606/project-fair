import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import { updateProfileAPI } from '../services/allApis';
import { BASE_URL } from '../services/baseUrl';

function Profile() {
    const [open, setOpen] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false)

    //state to hold the value
    const [userProfile,setUserProfile] = useState({
      username:"",email:"",password:"",profile:"",github:"",linkedin:""
    })
    //to hold the existing image(once there is profile photo uploaded)
    const [existingImage,setExistingImage] = useState("")
    //to convert into url
    const [preview,setPreview]=useState("")

    useEffect(()=>{
       //getting the existingUser then converting the string into object using JSON.parse
       const user = JSON.parse(sessionStorage.getItem("loggedInUser"))
       //changing the state
       //profile is empty why because only update when upload happens
      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
      //if not uploads existingimage is used
      setExistingImage(user.profile)
    },[isUpdate])

    useEffect(()=>{
      if(userProfile.profile){
        console.log(URL.createObjectURL(userProfile.profile));
        setPreview(URL.createObjectURL(userProfile.profile))
      }
      else{
         setPreview("")
        
      }
    },[userProfile.profile])


    const handleProfileUpdate = async()=>{
      const {username,email,password,profile,github,linkedin} = userProfile

      if(!github || !linkedin){
        alert('please fill the form completely')
      }
      else{
        const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

        const token = sessionStorage.getItem("token")

        if(preview){
          const reqHeader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }
        const result = await updateProfileAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status ==200){
          alert('profile updated successfully')
          setIsUpdate(true)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
          console.log(result.response.data);
        }
        }
        else{
          const reqHeader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        } 
        const result = await updateProfileAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status ==200){
          alert('profile updated successfully')
          setIsUpdate(true)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
          console.log(result.response.data);
        }
        }

      }

    }

  return (
    <div className='card shadow p-5'>
        <div className="d-flex justify-content-between ">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className="btn btn-outline-info"><i class="fa-solid fa-arrow-up-from-bracket fa-rotate-180"></i></button>
        </div>
        <Collapse in={open}>
            <div className="row justify-content-center mt-3">
                {/* upload picture */}
                <label htmlFor="profile" className='text-center'>
                    <input id='profile' style={{display:'none'}} type="file" onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                    { existingImage==""?
                   <img width={'200px'} height={'200px'} src={preview?preview:"https://www.freeiconspng.com/uploads/female-user-icon-clip-art--30.png"} alt="no image" className='rounded-circle' />:
                    <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle' />}
                </label>
                <div className="mt-5">
                        <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
                </div>
                <div className="mt-3">
                        <input type="text" className='form-control' placeholder='LinkedIn'  value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
                </div>
                <div className="mt-4 ">
                    <button onClick={handleProfileUpdate} className='btn btn-success rounded w-100'>Update</button>
                </div>
            </div>
        </Collapse>
    </div>
  )
}

export default Profile
