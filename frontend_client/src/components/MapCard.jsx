import { useEffect, useRef, useState } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ZoomControl } from 'react-leaflet/ZoomControl'
import { exportaciones } from "/datamapa";
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet';
import { Card } from './Card';
import { Icon } from './Icon';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from './Modal';
import 'leaflet/dist/leaflet.css';
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';
import '@ansur/leaflet-pulse-icon';
import * as L from 'leaflet';
// import package from '../assets/img/package.png';



export const MapCard = () => {
  const [featureCollection, setFeatureCollection] = useState()
  const [zoom, setZoom] = useState(19)
  const mapRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDataMapa = () => {
    setFeatureCollection(exportaciones)
  }

  useEffect(()=>{
    getDataMapa()
  })

  useEffect(() => {
    if(featureCollection && featureCollection.features) {
      let coords = [];
      featureCollection.features.forEach((feature) => {
        coords.push([
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        ])
      })
      const bounds = L.latLngBounds(coords);
      mapRef.current.fitBounds(bounds);
      const zoom = mapRef.current.getBoundsZoom(coords);
      setZoom(zoom);
    }
  }, [featureCollection])
  
  const filterData = () => {
    if (selectedCountry) {
      const filteredData = exportaciones.features.filter(feature => {
        return feature.properties.pais === selectedCountry;
      });
      console.log('pais filtrado:', filteredData);
      setFeatureCollection({ ...exportaciones, features: filteredData });
    } else {
      console.log('se reestablecen todo los paises');
      setFeatureCollection(exportaciones);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  


  return (
    <>
    <div className="absolute top-20 left-4 z-10">
        <button className="p-2 bg-azulclaro text-white shadow-lg rounded-md flex items-center" onClick={toggleModal}>
        <span className="mr-2">
      <Icon icon={faFilter} />
    </span>
    <span>
      Filtros
    </span>
        </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="p-4">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="p-2 border border-gray-400 rounded"
          >
            <option value="">Todos los países</option>
            <option value="Brasil">Brasil</option>
            <option value="China">China</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Argelia">Argelia</option>
            {/* Añade más opciones según tus datos */}
          </select>
        </div>
      </Modal>
    </div>
    
      <div className="relative w-full h-[77vh] z-0" >
      
      <MapContainer className='h-full' center={[-28.46957, -65.78524]} zoom={zoom}  zoomControl={false} ref={mapRef}>
        <TileLayer

          /* attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */

          /* attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
          minZoom={0}
          maxZoom={20}
          ext="jpg" */

          /* attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          maxZoom={20} */

          attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"

          /* attribution='Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
          url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}" */
              
        />
        <ZoomControl position='bottomright'/>
        {
          featureCollection && featureCollection.features &&
          featureCollection.features.map((feature, index) => {
            const pulseIcon = L.icon.pulse({
              iconSize:[12,12],
              color:'blue'
            });
            return (
              <Marker
              key={index}
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
              icon={pulseIcon}
              >
                <Popup
                key={index}
                className='w-100'
                >
                <Card feature={feature}/>
                </Popup>
              </Marker>
            )
            
          })
        }
      </MapContainer>
      
    </div>
    </>
    
  )
}
