import React, { useEffect, useRef, useState } from 'react'
import { images } from '../assets/images';
import { Trivia } from '../pages/Trivia';
import { faTrophy, faLocationDot, faGamepad, faEarthAmericas, faGlobe, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';
import { Link } from 'react-router-dom';


export const Slider = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  
  useEffect(() => {
    const listNode= listRef.current;
    const imgNode =listNode.querySelectorAll("li > img")[currentIndex];

    if(imgNode){
      imgNode.scrollIntoView({
        behavior: "smooth",
        inline: "center"
      })
    }
  
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="relative w-full h-[85vh]">
      <div className="text-3xl">
        <button onClick={prevImage} className=" bg-transparent absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-6 py-6 rounded-full"><Icon className="w-8 h-8" icon={faChevronLeft} size="3x"/></button>
      </div>
      <div className="text-3xl">
        <button onClick={nextImage} className=" bg-transparent absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-6 py-6 rounded-full"><Icon icon={faChevronRight} className="text-3xl" style={{ fontSize: '3rem', width: '3rem', height: '3rem', border: '1px solid red' }} /></button>
      </div>
      
      <ul ref={listRef} className="flex list-none p-0 m-0 overflow-hidden w-full h-full">
        {
          images.map((item) => {
            return <li key={item.id} className="w-full flex-shrink-0" >
              <img src={item.imgUrl} className="w-full h-full bg-cover " alt="" />
            </li>
          })
        }
      </ul>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 flex space-x-16">
              <Link to="/trivia">
                <button className="bg-amarillo text-white text-2xl px-20 py-3 rounded-2xl mr-16 font-bold italic hover:shadow-lg hover:scale-105 bg-opacity-60">Juego de Preguntas<Icon icon={faGamepad}/></button>
                {/* <button className='text-white bg-amarillo font-bold rounded-lg italic text-6xl mr-16'>Trivia</button> */}
              </Link>
              <Link to="/mapa">
                <button className="bg-amarillo text-white text-2xl px-20 py-3 rounded-2xl font-bold italic hover:shadow-lg hover:scale-105 bg-opacity-60">Mapa de Exportaciones<Icon icon={faEarthAmericas}/></button>
                {/* <button className='text-white bg-amarillo font-bold rounded-lg italic text-6xl'>Mapa</button> */}
              </Link>
                
      </div>
    </div>
  )
}
