import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { SearchField } from "./SeacrchField";
import "leaflet-geosearch/dist/geosearch.css";

const MapTest = (props) => {
  const [position, setPosition] = useState({ lat: 33.492021, lng: 36.332652 });
  console.log(position);
  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    console.log(marker);
    const newPosition = marker.getLatLng();
    // setPosition(newPosition);
    setPosition({ lat: newPosition.lat, lng: newPosition.lng });
    console.log("Marker new position:", newPosition);
    props.setLatLng(newPosition);
  };
  return (
    <div className="d-flex justify-content-center m-5">
      <MapContainer
        center={{ lat: 33.492021, lng: 36.332652 }}
        zoom={13}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        <Marker
          position={position}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
        >
          {/* <Popup>
            Latitude: {searchResult.lat}, Longitude: {searchResult.lng}
          </Popup> */}
        </Marker>
        <SearchField
          setPosition={(e1, e2) => setPosition({ lat: e1, lng: e2 })}
          apiKey={"38ab25a725154cf192acbe16aa4624e4"}
        />
      </MapContainer>
    </div>
  );
};

export default MapTest;
