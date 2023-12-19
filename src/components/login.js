import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


const  Login =(props)=> {
const [credentials , setCredentials]=useState({email: "",password: ""})
let history=useHistory();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', 
   
      headers: {
        'Content-Type': 'application/json',

      }, 
      body: JSON.stringify({email:credentials.email,password:credentials.password})       
    });
  const json=await response.json()
  console.log(json)
  if(json.success){
    //save token and redirect
    localStorage.setItem('token',json.authToken)
    props.showAlert("Logged in Successfully","success")
    history.push("/")
  }
  else{
    props.showAlert("Invalid Details","danger")

  }
}
const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className='container  mt-3'>
      <h2 className='my-3'>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group my-4">
    <label htmlFor="exampleInputEmail1 my-4">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="Enter email" required/>
    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputPassword1 my-4">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" required/>
  </div>
  <button type="submit" className="btn btn-primary my-2" >Submit</button>
</form>
    </div>
  )
}

export default Login
