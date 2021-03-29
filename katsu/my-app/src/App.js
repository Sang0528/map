import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {
  AttributionControl, 
  FullscreenControl, 
  GeolocateControl,
  ScaleControl, 
  Popup,
  NavigationControl} from 'react-map-gl';
import Pins from './pins.js';
import CityInfo from './city-info.js';
import CITIES from './data/cities.json';

const TOKEN = 'pk.eyJ1Ijoia2F0c3UxIiwiYSI6ImNrbWxudzNsaTFjb2gyb3Frc2puNWp2YWsifQ.huIA73MzdpMzWEKOUFBFcQ'

const attributionStyle= {
  right: 0,
  bottom: 0
};

const fullscreenControlStyle= {
  right: 10,
  bottom: 50
};

const geolocateControlStyle= {
  right: 10,
  top: 10
};

const navControlStyle= {
  right: 10,
  top: 50
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};


function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.6895,
    longitude: 139.69171,
    // longitude: -122.45,
    // latitude: 37.78,    
    //zoom: 8
    zoom: 8,
    bearing: 0,
    pitch: 0
  });  

  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      maxZoom = {15}
      mapboxApiAccessToken = {TOKEN}
      mapStyle= 'mapbox://styles/katsu1/ckmmxp0ae1ikv17pn2hf0nv09'
      onViewportChange={nextViewport => 
        setViewport(nextViewport)}
      attributionControl={false}
      >
      <AttributionControl compact={true} style={attributionStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto={false}
      />
      <NavigationControl style={navControlStyle} />
      <ScaleControl style={scaleControlStyle} />
      <Pins data={CITIES} onClick={setPopupInfo} />
      {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <CityInfo info={popupInfo} />
          </Popup>
        )}

      </ReactMapGL>
    );
  }

export default App;