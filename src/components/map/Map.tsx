import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import IconLocation from "../../assets/icon-location.svg";
import { MapProps } from "../../interfaces";
import "./map.css";

const Map = ({ mapPosition }: MapProps) => {
  const locationIcon = L.icon({
    iconUrl: IconLocation,
    iconRetinaUrl: IconLocation,
    iconSize: [46, 55],
    iconAnchor: [20, 55],
  });

  const [lat, lng] = mapPosition;
  return (
    <MapContainer
      zoomControl={false}
      className="map-container"
      center={[lat, lng]}
      zoom={20}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={locationIcon} position={[lat, lng]}></Marker>
    </MapContainer>
  );
};

export default Map;
