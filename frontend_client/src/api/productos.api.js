import axios from 'axios'

export const getAllProductos = () =>{
  return axios.get("http://localhost:8000/productos/api/productos")
}