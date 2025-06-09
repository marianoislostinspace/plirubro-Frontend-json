import { useEffect, useState } from 'react';
import '../styles/explorar.css';
import '../styles/carrito.css';
import '../styles/detalle.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";




export const Explorar = () => {



  // 💡 Esta es la estructura real según el JSON:
  interface Product {
    _id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number | null;
    size: string | null;
    color: string;
    material: string;
    stock: number;
    img: string; // CAMBIA ESTO desde 'imgURL'
  }

  // ESTADOS
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [dataApi, setDataApi] = useState<Product[]>([]);
  const [Items, setItems] = useState<Product[]>([]);

  const [cart, setcart] = useState<Product[]>(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });


  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [telefono, settelefono] = useState('')
  const [name, setname] = useState("")
  const [itemDetail, setItemDetail] = useState<Product | null>(null); // 👈 uno solo
  const [detailScreen, setdetailScreen] = useState<boolean>(false);
  //MOSTRAR TODOS LOS PRODUCTOS

  useEffect(() => {
    const fetchJson = async () => {
      const response = await fetch('./data/productos.json')
      const data = await response.json()

      const allItems = data.category.flatMap((categoria: { items: Product[] }) => categoria.items)
      setItems(allItems)
      setDataApi(allItems)
    }

    console.log(Items)
    fetchJson()
  }, [])




  // FILTRAR POR CATEGORIA
  const categoryFilter = async (categoria: string) => {
    const response = await fetch('./data/productos.json')
    const data = await response.json()

    // Reiniciar filtros
    setSelectedColor(null);
    setSelectedMaterial(null);

    const categoriaEncontrada = data.category.find(
      (cat: { name: string }) => cat.name.toLowerCase() === categoria.toLowerCase()
    );
    const items = categoriaEncontrada?.items || []
    setDataApi(items)
  }

  // FILTRAR POR COLOR
  const filtrarColor = async (color: string) => {
    const response = await fetch('./data/productos.json');
    const data = await response.json();

    // Reiniciar filtros
    setSelectedMaterial(null);

    const colorFiltrado = data.category.flatMap((categoria: { items: Product[] }) =>
      categoria.items.filter(item => item.color?.toLowerCase() === color.toLowerCase())
    );

    setDataApi(colorFiltrado); // ✅ Mostrar en pantalla
    setSelectedColor(color);   // opcional
    selectedColor
  };


  const filterbyMaterial = async (material: string) => {
    const response = await fetch('./data/productos.json')
    const data = await response.json()

    setSelectedColor(null)
    setSelectedMaterial(null)

    const materialFiltrado = data.category.flatMap((categoria: { items: Product[] }) =>
      categoria.items.filter(item => item.material?.toLocaleLowerCase() === material.toLocaleLowerCase())
    );

    setDataApi(materialFiltrado)
    selectedMaterial
  }

  const cleanFilters = () => {
    setSelectedColor(null)
    setSelectedMaterial(null)
    setDataApi(Items)
  }

  const handleAddCart = (Product: Product) => {
    setcart((prevCart) => [...prevCart, Product])
    alert(`${Product.name} agregado al carrito`)
  }


  useEffect(() => {
    console.log("Guardando carrito en localStorage:", cart);
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);


  const removeFromCart = (index: number) => {
    const updateCart = [...cart]
    updateCart.splice(index, 1)
    setcart(updateCart)
  }

  // Toggle para abrir/cerrar el carrito y cambiar la visibilidad del botón
  const handleCartToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const getTotal = () => {
    return cart.reduce((acc, item) => {
      const precio = item.discountPrice ?? item.price
      return acc + precio
    }, 0)
  }

  const realizarPedido = () => {
    if (!name.trim() || !telefono.trim()) {
      alert("Por favor, completá tu nombre y teléfono.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const itemsTexto = cart.map((item, index) => {
      const precio = item.discountPrice ?? item.price;
      return `${index + 1}. ${item.name} - $${precio} - \n ${item.img} \n\n`;
    }).join('\n');

    const total = getTotal().toFixed(2);

    const message = `Hola! Me gustaría realizar el siguiente pedido:\n\n${itemsTexto}\n\nTotal:$${total}\n\Nombre:${name}\nTeléfono:${telefono}:\n\nTransferencia a:\n\n Alias: graciela.162.pena.mp
CBU: 0000003100064769126418 :\n\n Por favor, enviame el comprobante de pago por este mismo medio para confirmar el pedido, una vez enviado el comprobante en caso de ser necesario especificar el color, talle o diseño del producto. ¡Gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = 3513484215;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    setcart([]);
  };

  const consultaMessage = (itemDetail: Product) => {
    const message = `Hola, me gustaria saber mas sobre los colores y diseños disponibles sobre el siguiente producto \n\n ${itemDetail.name}`
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = 3513484215;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

  }

  const getDetails = (product: Product) => {
    setItemDetail(product);
    setdetailScreen(true);  // Asegúrate de poner 'true' para mostrar los detalles
    console.log("detailScreen cambiado a: ", true);
  };


  const backToProducts = () => {
    setdetailScreen(false);  // Volver a la vista de productos
  };

  return (
    <>
      <div className="carritoLateral">
        {/* Botón que abre el Sidebar, solo visible si el menú está cerrado */}
        {!isMenuOpen && (
          <button
            className="btn btn-primary m-3 filtroButton"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            onClick={handleCartToggle} // Cambia el estado del menú
          >
            Mi Carrito 🛒
          </button>
        )}

        {/* Menú Lateral Offcanvas */}
        <div className={`offcanvas offcanvas-start ${isMenuOpen ? 'show' : ''}`} id="sidebarMenu" tabIndex={-1}>
          <div className="offcanvas-header carritoHeader">
            <h5 className="offcanvas-title">Carrito de Compras🛒</h5>
            <button className="btn-close" data-bs-dismiss="offcanvas" onClick={handleCartToggle}></button>
          </div>
          <div className="offcanvas-body">
            <div className='contenidoCarrito'>
              <h2 className='H1cart'>Carrito</h2>
              {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                cart.map((item, index) => (
                  <div className='itemContainer' key={item._id}>
                    <p className='itemsCarrito'>{item.name} - ${item.price}</p>
                    <button className='eliminar' onClick={() => removeFromCart(index)}>Eliminar</button>
                  </div>
                ))
              )}
              <p><strong className='Total'>Total:</strong> <strong className='TotalPrice'>${getTotal().toFixed(2)}</strong></p>


              <div className="pedidoContainer">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="text" id='nombre' placeholder='Nombre' required onChange={(e) => setname(e.target.value)} />
                  <input type="tel" id='telefono' placeholder='Telefono' required onChange={(e) => settelefono(e.target.value)} />
                  <button className='pedidoButton' type='submit' onClick={realizarPedido}>Realizar Pedido</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="filtrosContainer">
        <h1 className='filtroh1'>Filtros de Búsqueda</h1>

        <div className="filtrosGrupos">

          <div className="categorias">
            <div className="tituloGrupo">Categorías</div>
            <div className="botonesGrupo">
              <button className='filtros' onClick={() => categoryFilter('bazar')}>bazar</button>
              <button className='filtros' onClick={() => categoryFilter('electrónica')}>electrónica</button>
              <button className='filtros' onClick={() => categoryFilter('blanqueria')}>Blanqueria</button>
            </div>
          </div>

          <div className="colores">
            <div className="tituloGrupo">Colores</div>
            <div className="botonesGrupo">
              <button className='filtros' onClick={() => filtrarColor('Negro')}>Negro</button>
              <button className='filtros' onClick={() => filtrarColor('Blanco')}>Blanco</button>
              <button className='filtros' onClick={() => filtrarColor('Rojo')}>Rojo</button>
              <button className='filtros' onClick={() => filtrarColor('Azul')}>Azul</button>
              <button className='filtros' onClick={() => filtrarColor('Verde')}>Verde</button>
              <button className='filtros' onClick={() => filtrarColor('Gris')}>Gris</button>
              <button className='filtros' onClick={() => filtrarColor('Marrón')}>Marrón</button>
              <button className='filtros' onClick={() => filtrarColor('Amarillo')}>Amarillo</button>
              <button className='filtros' onClick={() => filtrarColor('rosa')}>rosa</button>
            </div>
          </div>

          <div className="material">
            <div className="tituloGrupo">Material</div>
            <div className="botonesGrupo">
              <button className='filtros' onClick={() => filterbyMaterial('vidrio')}>vidrio</button>
              <button className='filtros' onClick={() => filterbyMaterial('ceramica')}>ceramica</button>
              <button className='filtros' onClick={() => filterbyMaterial('Plastico')}>Plastico</button>
              <button className='filtros' onClick={() => filterbyMaterial('metal')}>metal</button>
              <button className='filtros' onClick={() => filterbyMaterial('vidrio')}>vidrio</button>
            </div>
          </div>

        </div>

        <button className='filtros' onClick={cleanFilters}>Limpiar filtros</button>
      </div>


      {detailScreen ? (
        // Vista de detalles del producto
        <div>
          {itemDetail && (
            <div className="detalleProducto">
              <button onClick={backToProducts} className='volver'>Volver a los productos</button>
              <h1>{itemDetail.name}</h1>
              <p><strong>Descripción:</strong> {itemDetail.description}</p>
              <p><strong>Precio:</strong> ${itemDetail.discountPrice ?? itemDetail.price}</p>
              <p><strong>Tamaño:</strong> {itemDetail.size}</p>
              <p><strong>Color:</strong> {itemDetail.color}</p>
              <p><strong>Material:</strong> {itemDetail.material}</p>
              <img src={itemDetail.img} alt={itemDetail.name} width="300" />
              <button className='casho' onClick={() => consultaMessage(itemDetail)}>consultar mas detalles sobre este producto</button>
              <button onClick={() => handleAddCart(itemDetail)} className='casho'>Agregar al Carrito</button>
            </div>
          )}
        </div>
      ) : (
        // Vista de lista de productos
        <div className="contenedor">
          {dataApi.length > 0 ? (
            dataApi.map((apiData, index) => (
              <div key={index} className="itemContainer" onClick={() => getDetails(apiData)}>
                <p><strong>Nombre:</strong> {apiData.name}</p>
                <p><strong>Precio:</strong> ${apiData.price}</p>
                <p><strong>Material:</strong> {apiData.material}</p>
                <p><strong>Color:</strong> {apiData.color}</p>
                <img src={apiData.img} alt={apiData.name} width="200" />
                {/* <button onClick={() => handleAddCart(apiData)}>Agregar al Carrito✅</button> */}
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}


    </>
  );
};
