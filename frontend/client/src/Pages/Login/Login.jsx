import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import './Login.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { login } from '../../auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const { register, handleSubmit, reset, formState:{errors}} = useForm();
  const navigate = useNavigate()

  const LoginUser = (data) => {
    
    console.log(data)


    const requestOptions={
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(data)
    }

    fetch('/auth/login', requestOptions)
  .then(res => {
    if (!res.ok) {
      throw new Error(`API returned status code ${res.status}`);
    }
    return res.json();
  })
  .then(data => {console.log(data)
    console.log("API Response:", data); // Log the response to see if access_token exists
    if (data.access_token) {
      login(data.access_token);
      navigate('/');
    } else {
      console.error('Access token is missing in the response');
      // Handle missing access_token scenario (e.g., show error message)
    }
    
  })
  .catch(error => {
    console.error('Error during login:', error); // Log any network or server errors
  });

reset();


  };

  return (
    <>
    <Navbar/>
    <div className="login">
      <div className="form-login">
        <h1 className="text-uppercase">Login</h1>
        <form action="form" className="form">
          <label htmlFor="username" className="text-black-50">Username*</label>
          <input type="text" 
            {...register("username", { required: true, maxLength: 25})}
          />
          {errors.username && <p><small style={{color:'red'}}>Username is required</small></p>}
          {errors.username?.type==="maxLength"&&<p><small style={{color:'red'}}>Max characters should be 25</small></p>}

          <label htmlFor="password" className="text-black-50">Password*</label>
          <input type="password"
            {...register("password", { required: true, minLength: 8})}
          />
          {errors.password && <p><small style={{color:'red'}}>Password is required</small></p>}
          {errors.password?.type==="minLength"&&<p><small style={{color:'red'}}>Min characters should be 8</small></p>}

          <button className="login-btn m-3" type="submit" onClick={handleSubmit(LoginUser)}>Login</button>
          <p>Do not have an account ! <Link to="/signup">Create One</Link>.</p>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
