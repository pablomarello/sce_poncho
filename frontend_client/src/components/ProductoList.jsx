import { useEffect, useState } from "react"
import { getAllProductos } from "../api/productos.api";


export function ProductoList() {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    
    async function LoadProductos(){
      const res = await getAllProductos()
      setProductos(res.data)
    }
    LoadProductos()
  }, []);

  return (
    <div>ProductoList
      {productos.map(producto =>(
        <div key={producto.id}>
          <h1>{producto.nombre}</h1>
        </div>
      )
      )}
    </div>
  )
}
