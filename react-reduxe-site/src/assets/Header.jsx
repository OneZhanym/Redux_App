
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { loginUser, logoutUser, registerUser } from '../features/auth/authSlice';
import "../styles/header.css";
import { useState } from "react";

const Header = () => {
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState("home");

    const navLinks = [
        { id: "home", label: "Главная", href: "/" },
        { id: "about", label: "О проекте", href: "/about" },
        { id: "catalog", label: "Каталог", href: "/catalog" },
        { id: "blog", label: "Блог", href: "/blog" },
        { id: "contacts", label: "Контакты", href: "/contacts" }
    ];

    const currentUser = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.auth.error);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginForm));
    };
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(registerForm));
    };

    return(
        <header className="header">
            <div className="header-inner-container">
                <div className="logo">Redux App</div>
                <nav className="nav">
                    {navLinks.map((link) => (
                        <a 
                            key={link.id}
                            href={link.href}
                            className={`nav-link ${activeLink === link.id ? "active" : ""}`}
                            onClick={() => setActiveLink(link.id)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <button className="theme-btn" onClick={ ()=> dispatch(toggleTheme()) }>
                    🌙 Тема
                </button>
                <div style={{ marginLeft: 20 }}>
                    {currentUser ? (
                        <>
                            <span style={{ marginRight: 10 }}>Вошёл: <b>{currentUser.username}</b></span>
                            <button onClick={()=>dispatch(logoutUser())}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <button onClick={()=>{setShowLogin(v=>!v); setShowRegister(false);}}>Вход</button>
                            <button onClick={()=>{setShowRegister(v=>!v); setShowLogin(false);}}>Регистрация</button>
                        </>
                    )}
                </div>
            </div>
            {/* Модальные формы */}
            {showLogin && !currentUser && (
                <form onSubmit={handleLogin} style={{ background: '#fff', padding: 16, border: '1px solid #ccc', position: 'absolute', right: 20, top: 60, zIndex: 100 }}>
                    <h4>Вход</h4>
                    <input name="username" placeholder="Логин" value={loginForm.username} onChange={e=>setLoginForm(f=>({...f, username: e.target.value}))} required />
                    <input name="password" type="password" placeholder="Пароль" value={loginForm.password} onChange={e=>setLoginForm(f=>({...f, password: e.target.value}))} required />
                    <button type="submit">Войти</button>
                    <button type="button" onClick={()=>setShowLogin(false)}>Закрыть</button>
                    {error && <div style={{color:'red'}}>{error}</div>}
                </form>
            )}
            {showRegister && !currentUser && (
                <form onSubmit={handleRegister} style={{ background: '#fff', padding: 16, border: '1px solid #ccc', position: 'absolute', right: 20, top: 60, zIndex: 100 }}>
                    <h4>Регистрация</h4>
                    <input name="username" placeholder="Логин" value={registerForm.username} onChange={e=>setRegisterForm(f=>({...f, username: e.target.value}))} required />
                    <input name="password" type="password" placeholder="Пароль" value={registerForm.password} onChange={e=>setRegisterForm(f=>({...f, password: e.target.value}))} required />
                    <button type="submit">Зарегистрироваться</button>
                    <button type="button" onClick={()=>setShowRegister(false)}>Закрыть</button>
                    {error && <div style={{color:'red'}}>{error}</div>}
                </form>
            )}
        </header>
    )
}

export default Header