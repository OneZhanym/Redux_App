import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input name="username" placeholder="Логин" value={form.username} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
      <button type="submit">Войти</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default LoginForm;
