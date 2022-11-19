import React, {useState} from 'react'
import { Button } from 'antd'
import { toast } from 'react-toastify'

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  })

  const validateUserDetails = () => {

  }
  const handleInputChange = (event) => {
    setUser((prevState) => ({
      prevState,
      [event.target.name]: event.target.value,
    }))
    console.log(event);
  } 
  const handleRegistration = (event)=>{
    toast.success("User Registered Successfully", {})    
    console.log(event);
  }
  return (
    <div>
      <form>
        <div className='form-group'>
          <input type="text" className='form-control' name="firstName" onChange={handleInputChange} placeholder="First Name" />
        </div>
        <div className='form-group'>
          <input type="text" className='form-control' name="lastName" onChange={handleInputChange} placeholder="Last Name" />
        </div>
        <div className='form-group'>
          <input type="email" className='form-control' name="email" onChange={handleInputChange} placeholder="Email" />
        </div>
        <div className='form-group'>
          <input type="file" className='form-control' name="profilePicture" onChange={handleInputChange}/>
        </div>
        <Button onClick={handleRegistration}>Register</Button>
      </form>
    </div>
  )
}

export default Register