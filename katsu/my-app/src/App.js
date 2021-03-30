import * as React from "react";
import { useState, useRef, useCallback } from "react";
import ReactMapGL, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Popup,
  NavigationControl,
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

  const features = editorRef.current && editorRef.current.getFeatures();
  const selectedFeature =
    features && (features[selectedFeatureIndex] || features[features.length - 1]);

  return (
    <>
    <ReactMapGL
      {...viewport}
      maxZoom={15}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/katsu1/ckmmxp0ae1ikv17pn2hf0nv09"
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
    </ReactMapGL>
    {/* <ControlPanel line={selectedFeature} /> */}
    </>
  );
}

export default App;
