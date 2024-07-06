export const Card = ({ feature }) => {
  return (
    <div className="w-full p-4 bg-gray-300 rounded-lg shadow-lg font-neue">
      <h2 className="text-lg font-semibold mb-2">Destino: {feature.properties.pais}</h2>
      <img src="https://via.placeholder.com/300x150" alt="IMAGEN" className="w-full h-40 object-cover rounded-lg mb-4" />
      
      <h2 className="text-md font-bold mb-2">Principales productos exportados:</h2>
      <div className="text-sm">
        <div className="flex justify-between font-bold">
          {/* <span>Producto</span>
          <span>Fob Dólar</span>
          <span>Peso Neto(kg)</span> */}
        </div>
        {feature.properties.productos.map((producto, index) => (
          <div className="flex justify-between" key={index}>
            <span>{index + 1}. {producto.nombre}</span>
            {/* <span>{producto.fob_dolar}</span>
            <span>{producto.peso_neto}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};
