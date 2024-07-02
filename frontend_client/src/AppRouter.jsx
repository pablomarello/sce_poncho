import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Inicio} from './pages/Inicio';
import { ProductoList } from './components/ProductoList';
import { Navbar } from './components/Navbar';

export const AppRouter = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='productos' element={<ProductoList/>} />
      </Routes>
    </>
    
  )
}
