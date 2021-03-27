import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {AttributionControl, FullscreenControl, GeolocateControl,Marker, Popup, NavigationControl} from 'react-map-gl';

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

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.6895,
    longitude: 139.69171,
    // longitude: -122.45,
    // latitude: 37.78,    
    //zoom: 8
    zoom: 8
  });  

  const [showPopup, togglePopup] = useState(null);

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
      <Marker latitude={35.6895} longitude={139.69171} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
      </Marker>
      {showPopup && <Popup
          latitude={35.6895}
          longitude={139.69171}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top"
          tipSize={30}
           >
          <div>You are here</div>
        </Popup>}
      </ReactMapGL>
    );
  }

export default App;