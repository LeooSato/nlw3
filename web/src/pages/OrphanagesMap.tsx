import React, {useEffect, useState} from 'react';
import MapMarker from '../images/map-marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'; 
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../services/api';
import mapIcon from '../utils/mapicon';
import "../styles/pages/orphanages-map.css";

interface Orphanage{
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}


function OrphanagesMap(){
  
const [orphanage, setOrphanages] = useState<Orphanage[]>([]);

useEffect(()  => {
api.get('orphanages').then(response => {
  
  setOrphanages(response.data);
} )
}, [] );




  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Marcador"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
<Map
  center={[-23.6554971,-46.6415725]}
  zoom={15}
  style={
    {  width: '100%', height : '100%'}}
    >

    {orphanage.map(orphanage =>{ 
      return(
      <Marker position={[orphanage.latitude,orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
      <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
    {orphanage.name}
      <Link to={`/orphanages/${orphanage.id}`}><FiArrowRight/></Link>
      </Popup></Marker>
    )})}
   
    <TileLayer  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
    </Map>

    <Link to="/orphanages/create">
    <FiPlus size='32'  color="#FFF" className="create-orphanage"/>
    </Link>
    
    </div>
  )
}
export default OrphanagesMap;