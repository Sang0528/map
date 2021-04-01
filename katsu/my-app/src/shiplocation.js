import * as React from "react";
import { Marker } from "react-map-gl";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function ShipLocationPins(props) {
  const { data, onClick } = props;

  return data.map((ship, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={ship.longitude}
      latitude={ship.latitude}
      offsetLeft = {-10}
      offsetTop = {-30}
    >
      <img 
        width = {30}
        src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emojione_1F6A2.svg/120px-Emojione_1F6A2.svg.png" 
        alt = "" 
        onClick={() => onClick(ship)}/>
    </Marker>
  ));
}

export default React.memo(ShipLocationPins);
