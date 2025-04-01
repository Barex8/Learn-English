import React from "react";
import { ObtenerDatos } from './FireStoreManager'

export const Home = () =>{
    return <button onClick={ObtenerDatos} > Obten los datos</button>

}

export const News = () => {
    return <h2>Noticias</h2>;
  };