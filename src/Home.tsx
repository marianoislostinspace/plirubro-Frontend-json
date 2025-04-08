import React from "react";
import { Navbar } from "./components/Navbar";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Explorar } from "./components/Explorar";
import { Promociones } from "./components/Promociones";
import Sidebar from "./components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/Home.css";
import "./styles/CardsHome.css";


export const Home = () => {
  const location = useLocation();

  // Definimos en qué rutas SÍ queremos el Sidebar
  const showSidebarRoutes = ["/Explorar"];

  return (
    <>
      {/* <Navbar /> */}
      <div className="d-flex">
        {showSidebarRoutes.includes(location.pathname) && <Sidebar />}


        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={
              <>
                <div className="container">
                  <div className="card">
                    <img src="img/ropa.jpg" alt="" />
                    <div className="intro">
                      <h1>Ropa</h1>
                      <p>Pijamas, Acolchados y mas.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <img src="img/bazar.webp" alt="" />
                    <div className="intro">
                      <h1>Bazar</h1>
                      <p>Botellas, Fuentes, Accesorios, etc...
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <img src="img/auris.jpg" alt="" />
                    <div className="intro">
                      <h1>Electronica</h1>
                      <p>Fundas, Cargadores, Adaptadores, Relojes, etc...
                      </p>
                    </div>
                  </div>
                </div>


                <div className="textTitle">
                  <h1>Polirubro Grace</h1>
                  <ul><p>¡Bienvenido a nuestro polirubro! Aquí encontrarás una amplia variedad de productos para todas tus necesidades diarias. Desde artículos de limpieza, alimentos y bebidas, hasta herramientas, accesorios para el hogar y mucho más.</p></ul>
                  <ul><p>Nos especializamos en ofrecer calidad, buenos precios y un surtido diverso para que siempre encuentres lo que buscas en un solo lugar. Visítanos y descubre todo lo que tenemos para ti. ¡Te esperamos! 🎉</p></ul>
                  <div className="divButton">
                    <Link className="nav-link" to="Explorar">Ver Nuestros Productos</Link>
                  </div>
                </div>
              </>
            } />
            <Route path="/Explorar" element={<Explorar />} />
            <Route path="/Promociones" element={<Promociones />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
