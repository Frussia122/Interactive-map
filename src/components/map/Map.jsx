import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import CurrentLocationButton from "UI/currentLocationButton/CurrentLocationButton";


//UTILS
import initializeMap from "utils/mapUtils/initializeMap";
import getCurrentPosition from "utils/mapUtils/getCurrentPosition";
import calculateRadius from "utils/mapUtils/calculateRadius";
import MapSearchForm from "components/mapSearchForm/MapSearchForm";

// TOKEN
mapboxgl.accessToken = "pk.eyJ1IjoiYW1pZGdhcmQiLCJhIjoiY2xpdTU2YTl6MHY3ZjNubzdtN2szcHA4bSJ9.NSfezHJZVWpHKWKob-s4xg";





const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  


  useEffect(() => {
    mapRef.current = initializeMap(mapContainerRef);
    getCurrentPosition(mapRef);
    
    return () => {
      mapRef.current.remove();
    };
  }, []);
  
  


  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }}>
      <CurrentLocationButton mapRef={mapRef} />
      <MapSearchForm mapRef={mapRef}/>
    </div>
  );
};

export default Map;
