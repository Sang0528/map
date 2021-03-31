import * as React from "react";
import { useState, useRef, useCallback } from "react";
import ReactMapGL, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Popup,
  NavigationControl,
  Source, 
  Layer,
} from "react-map-gl";
import Pins from "./pins.js";
import CityInfo from "./city-info.js";
import CITIES from "./data/cities.json";
import {Editor, DrawLineStringMode, EditingMode} from 'react-map-gl-draw';
import {getFeatureStyle, getEditHandleStyle} from './style.js';
//import ControlPanel from './control-panel-draw.js';



const TOKEN =
  "pk.eyJ1Ijoia2F0c3UxIiwiYSI6ImNrbWxudzNsaTFjb2gyb3Frc2puNWp2YWsifQ.huIA73MzdpMzWEKOUFBFcQ";

const attributionStyle = {
  right: 0,
  bottom: 0,
};

const fullscreenControlStyle = {
  right: 10,
  bottom: 50,
};

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const navControlStyle = {
  right: 10,
  top: 50,
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
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
    pitch: 0,
  });
    // Create a GeoJSON source with an empty lineString.
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature', 
          geometry: {
            type: 'LineString', 
            coordinates:  [
              [135.384521484375, 34.63320791137959],
              [135.384521484375, 34.63320791137959],
              [135.0439453125, 34.334364487026306],
              [134.923095703125,33.96158628979907],
              [134.989013671875,33.6420625047537],
              [135.28564453125,33.422272258866045],
              [135.736083984375,33.33970700424026],
              [136.1865234375,33.33970700424026],
              [136.91162109374997,33.44060944370356],
              [137.57080078125,33.60546961227188],
              [138.021240234375,33.815666308702774],
              [138.4716796875,33.988918483762156],
              [138.84521484374997,34.225429015241396],
              [139.075927734375,34.44315867450577],
              [139.2626953125,34.786739162702524],
              [139.449462890625,34.93097858831627],
              [139.691162109375,35.06597313798418], 
              [139.81201171874997,35.31736632923788],
              [139.844970703125,35.51434313431818],
              [139.844970703125,35.63051198300061]
            ]
          }
        }
      ]
    };
    // Add layer style
    const layerStyle = {
      id: 'route',
      type: 'line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#ed6498',
        'line-width': 5,
        'line-opacity': 0.8
      }
    };


  const [popupInfo, setPopupInfo] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const editorRef = useRef(null);

  const onSelect = useCallback(options => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  }, []);

  const onDelete = useCallback(() => {
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex);
    }
  }, [selectedFeatureIndex]);

  const onUpdate = useCallback(({editType}) => {
    if (editType === 'addFeature') {
      setMode(new EditingMode());
    }
  }, []);
  
  const drawTools = (
    <div className="mapboxgl-ctrl-top-left">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button
          className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_line"
          title="Polygon tool (p)"
          onClick={() => setMode(new DrawLineStringMode())}
        />
        <button
          className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );

  // const features = editorRef.current && editorRef.current.getFeatures();
  // const selectedFeature =
  //   features && (features[selectedFeatureIndex] || features[features.length - 1]);

  return (
    <>
    <ReactMapGL
      {...viewport}
      maxZoom={15}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      attributionControl={false}
    >
      <AttributionControl compact={true} style={attributionStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
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
      <Editor
          ref={editorRef}
          style={{width: '100%', height: '100%'}}
          clickRadius={12}
          mode={mode}
          onSelect={onSelect}
          onUpdate={onUpdate}
          editHandleShape={'circle'}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
        {drawTools}
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source> 
    </ReactMapGL>
    {/* <ControlPanel line={selectedFeature} /> */}
    </>
  );
}

export default App;
