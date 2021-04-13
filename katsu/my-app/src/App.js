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
import ShipLocationPins from "./shiplocation.js";
import ShipInfo from "./ship-info.js";
import Shipdata from "./data/shipdata.json";
import { Editor, DrawLineStringMode, EditingMode } from "react-map-gl-draw";
import { getFeatureStyle, getEditHandleStyle } from "./style.js";
// import { Card, CardBody, Row, Col } from "reactstrap";
// import PanelHeader from "./data/asset/PanelHeader.js";

//import ControlPanel from './control-panel-draw.js';

// declare Mapbox API token
const TOKEN =
  "pk.eyJ1Ijoia2F0c3UxIiwiYSI6ImNrbWxudzNsaTFjb2gyb3Frc2puNWp2YWsifQ.huIA73MzdpMzWEKOUFBFcQ";

// Add attribution style
const attributionStyle = {
  right: 0,
  bottom: 0,
};

// Add fullscreenControl style
const fullscreenControlStyle = {
  position: "absolute",
  right: 0,
  bottom: 50,
  padding: "10px",
};

// Add geolocateControl style
const geolocateControlStyle = {
  right: 10,
  top: 10,
};

// Add Navigation style
const navControlStyle = {
  right: 10,
  top: 50,
};

// Add Scale style
const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

// Create a GeoJSON source with an empty lineString.
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-1.4294536, -26.9883361],
          [-1.5039534, -26.9525199],
          [-1.5786312, -26.9168309],
          [-1.6539039, -26.8814505],
          [-1.7295841, -26.8450293],
          [-1.8043775, -26.8078496],
          [-1.8783609, -26.7711352],
          [-1.9521666, -26.7343889],
          [-2.0257165, -26.6974736],
          [-2.0994113, -26.6605179],
          [-2.1738418, -26.6231857],
          [-2.2489621, -26.5856776],
          [-2.3240607, -26.549572],
          [-2.3988201, -26.5135736],
          [-2.4735965, -26.4767715],
          [-2.5477097, -26.4394244],
          [-2.6218833, -26.401859],
          [-2.6968816, -26.3641802],
          [-2.7718619, -26.3262071],
          [-2.8470407, -26.287836],
          [-2.9233446, -26.2490524],
          [-2.9996837, -26.2099221],
          [-3.075845, -26.1705836],
          [-3.1527979, -26.1311425],
          [-3.230304, -26.0922295],
          [-3.3081596, -26.0555424],
          [-3.3865562, -26.0194826],
          [-3.4655367, -25.9832705],
          [-3.5441027, -25.9465915],
        ],
      },
    },
  ],
};
// Add layer style
const layerStyle = {
  id: "route",
  type: "line",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "#ed6498",
    "line-width": 5,
    "line-opacity": 0.8,
  },
};

// Core function App
function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0.1,
    longitude: 0.1,
    // longitude: -122.45,
    // latitude: 37.78,
    //zoom: 8
    zoom: 1,
    bearing: 0,
    pitch: 0,
  });

  const [popupInfo, setPopupInfo] = useState(null);
  const [shippopupInfo, setshipPopupInfo] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const editorRef = useRef(null);

  const onSelect = useCallback((options) => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  }, []);

  const onDelete = useCallback(() => {
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex);
    }
  }, [selectedFeatureIndex]);

  const onUpdate = useCallback(({ editType }) => {
    if (editType === "addFeature") {
      setMode(new EditingMode());
    }
  }, []);

  const drawTools = (
    <div className="mapboxgl-ctrl-top-left">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button
          className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_line"
          title="Line tool (l)"
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
        minZoom={2}
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
        <ShipLocationPins data={Shipdata} onClick={setshipPopupInfo} />
        {shippopupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={
              shippopupInfo.Coordinates[shippopupInfo.Coordinates.length - 1][0]
            }
            latitude={
              shippopupInfo.Coordinates[shippopupInfo.Coordinates.length - 1][1]
            }
            closeOnClick={false}
            onClose={setshipPopupInfo}
          >
            <ShipInfo info={shippopupInfo} />
          </Popup>
        )}
        <Editor
          ref={editorRef}
          style={{ width: "100%", height: "100%" }}
          clickRadius={12}
          mode={mode}
          onSelect={onSelect}
          onUpdate={onUpdate}
          editHandleShape={"circle"}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
        {drawTools}
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {/* <Source id="my-ship" type="image" data={imgSource}>
                          <Layer {...imglayerStyle} />
                        </Source> */}
      </ReactMapGL>
    </>
  );
}

export default App;
