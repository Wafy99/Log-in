import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRouter';
function Register() {
  const[values,setValues] =useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",  
  })
  const toastOptions ={
    position:"bottom-right",
    autoClose:5000,
    pauseOnHover:true,
    theme:"dark",
  }
    
  
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation()){
      const {password,confirmPassword,email,username}= values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
    }
  }
  const handleValidation = ()=>{
    const {password,confirmPassword,email,username}= values;
    if(password!==confirmPassword){
      toast.error("Both passwords must match.",toastOptions)
      return false;
    }else if(username.length<=3){
      toast.error("Username must be more than three characters long.",toastOptions)
      return false;
    }else if(password.length<8){
      toast.error("Password must be  at least 8 characters.",toastOptions)
      return false;
    }else if(email===""){
      toast.error("Email adress is required.",toastOptions)
      return false;
    }
    return true;
  }
  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='logo'/>
            <h1>Register</h1>
          </div>
          <input 
          type="text" 
          placeholder='Username' 
          name='username'
          onChange={(e)=> handleChange(e) }
          />
          <input 
          type="email" 
          placeholder='Email' 
          name='email'
          onChange={(e)=> handleChange(e) }
          />
          <input 
          type="password" 
          placeholder='Password' 
          name='password'
          onChange={(e)=> handleChange(e) }
          />
          <input 
          type="password" 
          placeholder='Confirm password' 
          name='confirmPassword'
          onChange={(e)=> handleChange(e) }
          />
          <button type='submit'>Create User</button>
          <span>You already have an account?<Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
height:100vh;
width: 100vw;
display: flex;
justify-content: center;
gap:1rem;
align-items: center;
background-color:#131324;
.brand{
  display: flex;
  align-items: center;
  gap:1rem;
  justify-content: center;
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform:uppercase;
  }
}
form{
  display: flex;
  flex-direction:column;
  gap:2rem;
  background-color: #00000076;
  border-radius:2rem;
  padding:3rem 5rem;
  input{
    background-color: transparent;
    padding:1rem;
    border:.1rem solid #4e0eff;
    border-radius:.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border:0.1rem solid #997af0;
      outline:none;
    }
  }
  button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor: pointer;
    border-radius:.4rem;
    font-size:1rem;
    text-transform:uppercase;
    transition:.5s ease-in-out;
    &:hover{
      background-color:#4e0eff
    }
  }
  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0eff;
      font-weight:bold;
      text-decoration:none;
    }
  }
}
`;







export default Register
