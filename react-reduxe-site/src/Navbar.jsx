import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Музыкальный Магазин</Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/">Каталог</Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites">Избранное</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;