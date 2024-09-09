export const Card = ({ dataExportacion }) => {
  // Loguear para depurar los datos que están llegando
  console.log("Exportación recibida:", exportacion);

  // Validar que exportacion esté definido y contenga destino y producto
  const destino = exportacion?.destino || {};
  const producto = exportacion?.producto || {};

  // Verificar si falta algún dato clave y mostrar mensajes más detallados
  if (!exportacion) {
    return (
      <div className="w-full p-4 bg-red-200 rounded-lg shadow-lg font-neue">
        <h2 className="text-lg font-semibold mb-2 text-red-700">
          No se ha proporcionado ninguna exportación.
        </h2>
      </div>
    );
  }

  if (!destino.nombre && !producto.nombre) {
    return (
      <div className="w-full p-4 bg-red-200 rounded-lg shadow-lg font-neue">
        <h2 className="text-lg font-semibold mb-2 text-red-700">
          Faltan tanto el destino como el producto. No se puede mostrar la exportación.
        </h2>
      </div>
    );
  }

  if (!destino.nombre) {
    return (
      <div className="w-full p-4 bg-red-200 rounded-lg shadow-lg font-neue">
        <h2 className="text-lg font-semibold mb-2 text-red-700">
          Falta el nombre del destino. No se puede mostrar la exportación.
        </h2>
      </div>
    );
  }

  if (!producto.nombre) {
    return (
      <div className="w-full p-4 bg-red-200 rounded-lg shadow-lg font-neue">
        <h2 className="text-lg font-semibold mb-2 text-red-700">
          Falta el nombre del producto. No se puede mostrar la exportación.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-300 rounded-lg shadow-lg font-neue">
      {/* Mostrar el nombre del destino */}
      <h2 className="text-lg font-semibold mb-2">Destino: {destino.nombre}</h2>

      {/* Imagen del producto, usa una imagen por defecto si no hay imagen */}
      <img 
        src={producto.imagen || "default_image.png"} 
        alt={`Imagen de producto exportado a ${destino.nombre}`} 
        className="w-full h-40 object-cover rounded-lg mb-4" 
      />
      
      {/* Mostrar el nombre del producto */}
      <h2 className="text-md font-bold mb-2">Producto exportado:</h2>
      <div className="text-sm text-black">
        <div className="flex justify-between font-bold">
          <span>{producto.nombre}</span>
        </div>
      </div>
    </div>
  );
};

