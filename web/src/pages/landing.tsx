import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import LogoIMG from "../images/Logo.svg";
import '../styles/pages/landing.css';

function landing(){
  return(
    <div id="page-landing">
    <div className="content-wrapper">

    <img src={LogoIMG} alt="" />
    <main>
      <h1>Leve Felicidade ao Mundo</h1>
      <p>Visite orfanatos e mude o dia de muitas crianças.</p>
    </main>
    <div className="location">
      <strong>São Paulo</strong>
      <span>São Paulo</span>
    </div>
    <Link to="/app" className="enter-app">
    <FiArrowRight size={26} color="rgba (npm0,0,0,0.6)"/>
    </Link>
    </div>
  </div>
  )
}

export default landing;