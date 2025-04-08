import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../styles/Sidebar.css'

const Sidebar: React.FC = () => {
  return (
    <>
      {/* Botón que abre el Sidebar */}
      <button
        className="btn btn-primary m-3 filtroButton "
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        Mi Carrito 🛒
      </button>

      {/* Menú Lateral Offcanvas */}
      <div className="offcanvas offcanvas-start" id="sidebarMenu" tabIndex={-1}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Carrito de Compras🛒</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
         <div>
          {/* CONTENIDO DEL CARRITO */}
         </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
