import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg barra">
            <div className="container-fluid">
                {/* Marca del sitio como Link (evita recargar) */}
                <Link className="navbar-brand" to="/" onClick={closeMenu}>
                    Polirubro Grace
                </Link>

                {/* Botón hamburguesa */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú de navegación */}
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeMenu}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Explorar" onClick={closeMenu}>
                                Productos
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
