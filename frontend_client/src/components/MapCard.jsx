import { useEffect, useRef, useState } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ZoomControl } from 'react-leaflet/ZoomControl'
import { exportaciones } from "/datamapa";
import { Marker } from 'react-leaflet/Marker'
import { Popup, Polyline  } from 'react-leaflet';
import { Card } from './Card';
import { CardCatamarca } from './CardCatamarca';
import { Icon } from './Icon';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from './Modal';
import 'leaflet/dist/leaflet.css';
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';
import '@ansur/leaflet-pulse-icon';
import * as L from 'leaflet';
import packageIcon from '../assets/img/package.png';



export const MapCard = () => {
  const [featureCollection, setFeatureCollection] = useState()
  const [zoom, setZoom] = useState(19)
  const mapRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filteredCoords, setFilteredCoords] = useState(null);

  console.log(featureCollection);


  const getDataMapa = () => {
    setFeatureCollection(exportaciones)
  }


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
      
      if (coords.length == 1) {
        mapRef.current.setZoom(5);
      } else if (coords.length > 1 ) {
        mapRef.current.setZoom(zoom);
      }
    } else {
      getDataMapa()
    }
  }, [featureCollection])
  
  const filterData = () => {
    if (selectedCountry) {
      const filteredData = exportaciones.features.filter(feature => {
        return feature.properties.pais === selectedCountry;
      });
      console.log('pais filtrado:', filteredData);
      setFeatureCollection({ ...exportaciones, features: filteredData });

      if (filteredData.length > 0) {
        setFilteredCoords([filteredData[0].geometry.coordinates[1], filteredData[0].geometry.coordinates[0]]);
      } else {
        setFilteredCoords(null);
      }
    } else {
      console.log('se reestablecen todo los paises');
      setFeatureCollection(exportaciones);
      setFilteredCoords(null);
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

  const fixedPoint = [-28.46957, -65.78524];

 
  const fixedPulseIcon = L.icon.pulse({
    iconSize: [12, 12],
    color: 'red'
  });

  // Extraer los países únicos
  const uniqueCountries = [...new Set(exportaciones.features.map(feature => feature.properties.pais))];

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
              {uniqueCountries.map((pais, index) => (
                <option key={index} value={pais}>{pais}</option>
              ))}
            </select>
          </div>
        </Modal>
    </div>
    
      <div className="relative w-full h-[77vh] z-0" >
      

      <MapContainer className='h-full'  zoom={zoom}  zoomControl={false} ref={mapRef}>

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
        <Marker
            position={fixedPoint}
            icon={fixedPulseIcon}
          >
            <Popup className='w-100'>
              <CardCatamarca />
            </Popup>
          </Marker>
        {
          featureCollection && featureCollection.features &&
          featureCollection.features.map((feature, index) => {
            const pulseIcon = L.icon.pulse({
              iconSize:[12,12],
              color:'blue',
              fillColor: 'blue'
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
        {
            filteredCoords && (
              <Polyline
                positions={[fixedPoint, filteredCoords]}
                color="red"
              />
            )
          }
      </MapContainer>
      
    </div>
    </>
    
  )
}
