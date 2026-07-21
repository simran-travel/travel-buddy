import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ latitude, longitude, name }) {
  return (
    <MapContainer
  center={[latitude, longitude]}
  zoom={10}
  className="map-container"
>
      <TileLayer
  url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
  attribution='&copy; OpenStreetMap contributors'
/>

      <Marker position={[latitude, longitude]}>
        <Popup>
          {name}
        </Popup>
      </Marker>

    </MapContainer>
  );
}

export default Map;