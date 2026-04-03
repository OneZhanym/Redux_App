import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { logoutUser } from './authSlice';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  if (currentUser) {
    return (
      <div>
        <h2>Привет, {currentUser.username}!</h2>
        <button onClick={() => dispatch(logoutUser())}>Выйти</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setShowLogin(true)}>Вход</button>
        <button onClick={() => setShowLogin(false)}>Регистрация</button>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
