import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary barra">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Polirubro Grace</a>
                
                {/* Botón de hamburguesa */}
                <button 
                    className="navbar-toggler" 
                    onClick={toggleMenu} 
                    aria-expanded={isOpen ? "true" : "false"} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú de navegación */}
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Explorar" onClick={() => setIsOpen(false)}>Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Promociones" onClick={() => setIsOpen(false)}>Promociones</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
