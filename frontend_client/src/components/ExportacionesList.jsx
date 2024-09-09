import { useEffect, useState } from "react"
import { getAllExportaciones } from "../api/exportaciones.api"

export function ExportacionesList() {
  const [exportaciones, setExportaciones] = useState([])

  useEffect(() =>{
    
    async function loadExportaciones() {
      const res = await getAllExportaciones();
      setExportaciones(res.data);
    }
    loadExportaciones()
  }, [])
  
  return (
    <div>
      {exportaciones.map(exportacion => (
        <div key={exportacion.id}>
          <h1>{exportacion.destino}</h1>
          <p>{exportacion.producto}</p>
        </div>
      ))}
    </div>
  )
}

