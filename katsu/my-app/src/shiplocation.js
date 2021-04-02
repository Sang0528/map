import * as React from "react";
import { Marker } from "react-map-gl";

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function ShipLocationPins(props) {
  const { data, onClick } = props;

  return data.map((ship, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={ship.Coordinates[ship.Coordinates.length - 1][0]}
      latitude={ship.Coordinates[ship.Coordinates.length - 1][1]}
      offsetLeft = {-10}
      offsetTop = {-20}
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
