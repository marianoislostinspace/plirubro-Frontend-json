import { useEffect, useState } from 'react';
import '../styles/explorar.css';

type Props = {}

export const Explorar = (props: Props) => {
  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    size: string;
    color: string;
    material: string;
    stock: number;
    imgURL: string;
    categoryId: {
      _id: string;
      name: string;
    };
  }

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [dataApi, setDataApi] = useState<Product[]>([]);

  const urlApi = 'https://backend-tienda-listo-production.up.railway.app/graceStore/items';

  const fetchApi = async (
    color?: string,
    size?: string,
    material?: string
  ) => {
    try {
      const queryParams = new URLSearchParams();

      if (color) queryParams.append('color', color);
      if (size) queryParams.append('size', size);
      if (material) queryParams.append('material', material);

      const response = await fetch(`${urlApi}?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Error al obtener datos');

      const data: Product[] = await response.json();
      setDataApi(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateFilters = (
    color: string | null = selectedColor,
    size: string | null = selectedSize,
    material: string | null = selectedMaterial
  ) => {
    fetchApi(color || undefined, size || undefined, material || undefined);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    updateFilters(color, selectedSize, selectedMaterial);
  };

  const handleMaterialClick = (material: string) => {
    setSelectedMaterial(material);
    updateFilters(selectedColor, selectedSize, material);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    updateFilters(selectedColor, size, selectedMaterial);
  };

  useEffect(() => {
    fetchApi(); // carga inicial
  }, []);

  return (
    <>
      <div className="opcionesDeFiltrado">
        <div className="filtro">
          <h2>Colores</h2>
          <ul>
            {['rojo', 'azul', 'verde', 'naranja', 'amarillo', 'negro', 'blanco', 'gris', 'rosa', 'marrón'].map(color => (
              <li key={color}>
                <button onClick={() => handleColorClick(color)}>{color}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="filtro">
          <h2>Talles</h2>
          <ul>
            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
              <li key={size}>
                <button onClick={() => handleSizeClick(size)}>{size}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="filtro">
          <h2>Material</h2>
          <ul>
            {['Algodón', 'Licra', 'Poliéster', 'Denim', 'Lana', 'metal'].map(material => (
              <li key={material}>
                <button onClick={() => handleMaterialClick(material)}>{material}</button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => {
          setSelectedColor(null);
          setSelectedSize(null);
          setSelectedMaterial(null);
          fetchApi();
        }}>Limpiar filtros</button>

      </div>

      <div className="contenedor">
        {dataApi.length > 0 ? (
          dataApi.map((apiData) => (
            <div key={apiData._id} className="itemContainer">
              <p><strong>Nombre:</strong> {apiData.name}</p>
              <p><strong>Precio:</strong> ${apiData.price}</p>
              <p><strong>Precio de descuento:</strong> ${apiData.discountPrice}</p>
              <p><strong>Talle:</strong> {apiData.size}</p>
              <p><strong>Material:</strong> {apiData.material}</p>
              <p><strong>Color:</strong> {apiData.color}</p>
              <p><strong>Stock:</strong> {apiData.stock}</p>
              <p><strong>Descripción:</strong> {apiData.description}</p>
              <img src={apiData.imgURL} alt={apiData.name} width="200" />
            </div>
          ))
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </>
  );
};
