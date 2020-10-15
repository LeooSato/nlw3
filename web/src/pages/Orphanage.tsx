import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams } from 'react-router-dom'
import Sidebar from '../components/sidebar';  
import mapIcon from '../utils/mapicon';
import '../styles/pages/orphanage.css';
import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";

interface Orphanage{
  instructions:string;
  latitude:number;
  longitude:number;
  name:string;
  about: string;
  opening_hours: string;
  open_on_weekends:boolean;
  images:Array<{
    url:string;
    id:number;
  }>;
}

interface Orphanagesparams{
  id:string;
}

export default function Orphanage() {


  
  const params = useParams<Orphanagesparams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  


useEffect(()  => {
api.get(`orphanages/${params.id}`).then(response => {
  
  setOrphanage(response.data);
} )
}, [] );

if(!orphanage){
  return <p>Carregando...</p>
}
/*if (orphanage.open_on_weekends == true) {
   var owaw = 'Segunda a Segunda';
}
else {var owaw ='Segunda a Sexta'};
*/




  return (
    <div id="page-orphanage">
  <Sidebar></Sidebar>

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[0].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map(image =>{
                    return(
                      <button className="active" key={image.id}type="button">
                      <img src={image.url} alt={orphanage.name} />
                    </button>
                    )
                  }
            )}
           
            </div>
          
          <div className="orphanage-details-content">
  <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com.br/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
               Horarios de atendimentos  <br />
                {orphanage.opening_hours}
              </div>
{orphanage.open_on_weekends ? (              <div className="open-on">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>) : (              <div className="dont-open">
                <FiInfo size={32} color="#ff6e55" />
                Não Atendemos <br />
                fim de semana
              </div>) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}