import React, { useEffect, useState } from 'react'
import "../Styles/Login-Register.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { LoginUser } from '../Redux/action';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (login.isAuth) {
      navigate('/dashboard');
    }
  }, [login, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password, toast));
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login
