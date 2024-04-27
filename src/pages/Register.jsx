import React, { useEffect, useState } from 'react'
import "../Styles/Login-Register.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { RegisterUser } from '../Redux/action';

const Register = () => {
  const [form, setForm] = useState({ fullname: "", email: "", password: ""});
  const register = useSelector(state => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (register.success) {
      navigate('/login')
    }
    else if (register.isError || register.isData) {
      navigate('/register');
    }
  }, [register])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(form, toast))
  }

  return (
    <form className="form" onSubmit={handleSubmit} >
      <h2>Register</h2>
      <div>
        <label>Fullname</label>
        <input type="text" value={form.fullname} onChange={(e)=>setForm({...form,fullname:e.target.value})} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
      </div>
      <div>
        <label>Password</label>
        <input  type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register
