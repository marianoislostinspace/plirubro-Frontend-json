import { Navbar } from "./components/Navbar";
import { Link, Route, Routes, } from "react-router-dom";
import { Explorar } from "./components/Explorar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/Home.css";


export const Home = () => {
  return (
    <>
      <Navbar />

      {/* <sidebar /> */}
      <div className="d-flex">


        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={
              <>
                <div className="container">

                  <div className="imagen">
                    <h1>Indumentaria</h1>
                    <img src="img/ropa.jpg" alt="" />
                  </div>

                  <div className="imagen">
                    <h1>Bazar</h1>
                    <img src="img/bazar.webp" alt="" />

                  </div>

                  <div className="imagen">
                    <h1>Electronica</h1>
                    <img src="img/auris.jpg" alt="" />

                  </div>
                </div>


                <div className="textTitle">
                  <div className="text">
                    <h1>Polirubro Grace</h1>
                    <p>¡Bienvenido a nuestro polirubro! Aquí encontrarás una gran variedad de productos ideales para tu hogar y tu día a día. Desde artículos de bazar, blanquería, y electrónica, hasta accesorios prácticos y muchas otras opciones útiles.</p>
                    <p>Nos enfocamos en ofrecer calidad, buenos precios y un surtido diverso para que siempre encuentres lo que necesitás en un solo lugar. Visitanos y descubrí todo lo que tenemos para vos. ¡Te esperamos! 🎉</p>
                    <div className="boton">
                      <Link className="nav-link" to="Explorar">Ver Nuestros Productos</Link>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/Explorar" element={<Explorar />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
