import { useEffect, useRef, useState } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { ZoomControl } from 'react-leaflet/ZoomControl'
import { exportaciones } from "/datamapa";
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet';
import { Card } from './Card';
import * as L from 'leaflet';

export const MapCard = () => {
  const [featureCollection, setFeatureCollection] = useState()
  const [zoom, setZoom] = useState(19)
  const mapRef = useRef(null)

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
  

  return (
    <div className="relative w-full h-[85vh] z-0" >
      <MapContainer className='h-full' center={[-28.46957, -65.78524]} zoom={zoom}  zoomControl={false} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position='bottomright'/>
        {
          featureCollection && featureCollection.features &&
          featureCollection.features.map((feature, index) => {
            return (
              <Marker
              key={index}
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
              >
                <Popup
                key={index}
                className='w-72'
                >
                <Card feature={feature}/>
                </Popup>
              </Marker>
            )
            
          })
        }
      </MapContainer>
    </div>
  )
}
