import { useEffect, useRef, useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { ZoomControl } from 'react-leaflet/ZoomControl';
import { Marker } from 'react-leaflet/Marker';
import { Popup, Polyline, GeoJSON } from 'react-leaflet';
import { Card } from './Card';
import { CardCatamarca } from './CardCatamarca';
import { Icon } from './Icon';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from './Modal';
import 'leaflet/dist/leaflet.css';
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';
import '@ansur/leaflet-pulse-icon';
import * as L from 'leaflet';
import '../libs/MovingMarker';
import containerIconAzul from '../assets/img/container_azul.png';
import provinciasData from '../data/provincia.json';
import { getAllExportaciones } from '../api/exportaciones.api';

export const MapCard = () => {
  const [exportaciones, setExportaciones] = useState([]);
  const [zoom, setZoom] = useState(19);
  const mapRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filteredCoords, setFilteredCoords] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const movingMarkerRef = useRef(null);
  const [totalFobDolar, setTotalFobDolar] = useState(0);
  const [totalPesoNeto, setTotalPesoNeto] = useState(0);



  const getDataMapa = () => {
    setFeatureCollection(exportaciones)
  }


  useEffect(() => {
    getAllExportaciones()
      .then((response) => {
        const exportacionesData = response.data;

        if (Array.isArray(exportacionesData)) {
          const validExportaciones = exportacionesData.filter(
            (exportacion) => exportacion.destino && exportacion.destino.coordenadas
          );

          // Calcular la suma total de FOB Dólar y Peso Neto
          const totalFob = validExportaciones.reduce((sum, exp) => sum + exp.fob_dolar, 0);
          const totalPeso = validExportaciones.reduce((sum, exp) => sum + exp.peso_neto, 0);

          setTotalFobDolar(totalFob);
          setTotalPesoNeto(totalPeso);

          setExportaciones(validExportaciones);

          if (validExportaciones.length > 0) {
            console.log('Datos recibidos y filtrados:', validExportaciones);
          } else {
            console.error('No se encontraron exportaciones válidas con coordenadas.');
          }
        } else {
          console.error('Los datos recibidos no son un array:', exportacionesData);
          setExportaciones([]);
        }
      })
      .catch((error) => {
        console.error('Error al obtener exportaciones:', error);
        setExportaciones([]);
      });
  }, []);



  useEffect(() => {
    const catamarcaData = provinciasData.features.filter(
      feature => feature.properties.nam === 'Catamarca'
    );
    const catamarcaGeoJson = {
      type: 'FeatureCollection',
      features: catamarcaData,
    };
    setGeoJsonData(catamarcaGeoJson);
  }, []);

  const geoJsonStyle = {
    color: 'red',
    weight: 2,
    fillOpacity: 0.2,
  };

  useEffect(() => {
    if (exportaciones.length > 0) {
      let coords = exportaciones.map(exp => [exp.destino.coordenadas[1], exp.destino.coordenadas[0]]);
      const bounds = L.latLngBounds(coords);
      mapRef.current.fitBounds(bounds);
      const zoom = mapRef.current.getBoundsZoom(coords);

      if (coords.length === 1) {
        mapRef.current.setZoom(5);
        const boundCoords = [fixedPoint, coords[0]];
        mapRef.current.fitBounds(L.latLngBounds(boundCoords));

      } else if (coords.length > 1) {

        mapRef.current.setZoom(zoom);
      }
    }
  }, [exportaciones]);

  const filterData = () => {
    if (selectedCountry) {
      const filteredData = exportaciones.filter(exp => exp.destino.nombre === selectedCountry);
      setExportaciones(filteredData);

      if (filteredData.length > 0) {
        setFilteredCoords([filteredData[0].destino.coordenadas[1], filteredData[0].destino.coordenadas[0]]);
      } else {
        setFilteredCoords(null);
      }
    } else {
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

  const movingMarkerIcon = L.icon({
    iconUrl: containerIconAzul,
    iconSize: [60, 80],
    iconAnchor: [30, 95]
  });

  useEffect(() => {
    if (filteredCoords) {
      if (movingMarkerRef.current) {
        movingMarkerRef.current.removeFrom(mapRef.current);
      }
      const movingMarker = L.Marker.movingMarker(
        [fixedPoint, filteredCoords],
        [5000],
        { icon: movingMarkerIcon }
      ).addTo(mapRef.current);
      movingMarker.start();
      movingMarkerRef.current = movingMarker;
    } else if (movingMarkerRef.current) {
      movingMarkerRef.current.removeFrom(mapRef.current);
      movingMarkerRef.current = null;
    }
  }, [filteredCoords]);

  // Extraer los países únicos de exportaciones cuando estén disponibles
  const uniqueCountries = exportaciones.length > 0 
    ? [...new Set(exportaciones.map(exp => exp.destino.nombre))].sort()
    : [];
    {exportaciones.map((exp, index) => {
      // Verifica si `exp.destino.coordinates` está definido y tiene al menos dos elementos
      if (exp.destino && Array.isArray(exp.destino.coordenadas) && exp.destino.coordenadas.length >= 2) {
        const pulseIcon = L.icon.pulse({
          iconSize: [12, 12],
          color: 'blue',
          fillColor: 'blue'
        });
        return (
          <Marker
            key={index}
            position={[exp.destino.coordenadas[1], exp.destino.coordenadas[0]]}
            icon={pulseIcon}
          >
            <Popup key={index} className="w-80">
            <Card nombre={exp.destino.nombre} coordenadas={exp.destino.coordenadas} fobDolar={exp.fob_dolar} pesoNeto={exp.peso_neto} producto={exp.producto.nombre} />
            </Popup>
          </Marker>
        );
      } else {
        console.error('Las coordenadas no están definidas o no tienen el formato correcto para la exportación:', exp);
        return null;
      }
    })}
  return (
    <>
      <div className="absolute bottom-36 left-4 z-10 p-2 bg-white text-black shadow-lg rounded-md">
        <span className="block">Total FOB Dólar: {totalFobDolar.toLocaleString()} USD</span>
        <span className="block">Total Peso Neto: {totalPesoNeto.toLocaleString()} Kg</span>
      </div>
      <div className="absolute top-20 left-4 z-10 font-neue">
        <button className="p-2 bg-azulclaro text-white shadow-lg rounded-md flex items-center" onClick={toggleModal}>
          <span className="mr-2">
            <Icon icon={faFilter} />
          </span>
          <span>Filtros</span>
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

      <div className="relative w-full h-[77.4vh] z-0">
        <MapContainer className="h-full" zoom={zoom} zoomControl={false} ref={mapRef}>
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          />
          <ZoomControl position='bottomright' />
          {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyle} />}
          <Marker

            position={fixedPoint}
            icon={fixedPulseIcon}
          >
            <Popup className="w-80">
              <CardCatamarca />
            </Popup>
          </Marker>
          {exportaciones.map((exp, index) => {
            const pulseIcon = L.icon.pulse({
              iconSize: [12, 12],
              color: 'blue',
              fillColor: 'blue'
            });
            return (
              <Marker
                key={index}
                position={[exp.destino.coordenadas[1], exp.destino.coordenadas[0]]}
                icon={pulseIcon}
              >
                <Popup key={index} className="w-80">
                  <Card feature={exp} />
                </Popup>
              </Marker>
            );
          })}
          {filteredCoords && (
            <Polyline
              positions={[fixedPoint, filteredCoords]}
              color="red"
            />
          )}
        </MapContainer>
      </div>
    </>
  );
};
