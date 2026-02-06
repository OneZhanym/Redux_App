import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
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
            </div>
        </header>
    )
}

export default Header