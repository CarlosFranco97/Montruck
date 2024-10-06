import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Map.css";

import { useEffect, useState } from "react";

interface Map {
  _id: string;
  vehiculo_id: number;
  datetime: string;
  latitude: number;
  longitude: number;
}

// Icono personalizado para el marcador (opcional)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Map = () => {
  const [mapa, setsensores] = useState<Map[]>([]); // Almacena los datos de los vehículos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1880/data/gps"); // Ajustar la URL según tu backend
      if (!response.ok) {
        throw new Error("Error en la solicitud de la API");
      }
      const data: Map[] = await response.json();
      setsensores(data);
      setLoading(false); // Los datos se cargaron con éxito
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  if (mapa.length === 0) {
    return <p>No hay datos de GPS disponibles.</p>;
  }

  // Obtener el último registro GPS
  const ultimoGPS = mapa[0]; // Supone que hay al menos un vehículo en los datos

  // Verificar si las coordenadas son válidas
  let latGPS = ultimoGPS.latitude;
  let lonGPS = ultimoGPS.longitude;

  // Coordenadas predeterminadas (por ejemplo, Bogotá, Colombia)
  const coordenadasPorDefecto: [number, number] = [5.028673, -75.455374];

  // Si las coordenadas son 0, usar las coordenadas por defecto
  if (latGPS === 0 || lonGPS === 0) {
    latGPS = coordenadasPorDefecto[0];
    lonGPS = coordenadasPorDefecto[1];
  }

  return (
    <div className="map-container">
      <h2 className="map-title">Ubicación GPS</h2>
      <div className="map-box">
        <MapContainer
          center={[latGPS, lonGPS]} // Centrar en las coordenadas del último GPS o las coordenadas por defecto
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          />
          <Marker position={[latGPS, lonGPS]} icon={markerIcon}>
            <Popup>
              Latitud: {latGPS} <br /> Longitud: {lonGPS}
            </Popup>
          </Marker>
        </MapContainer>
        <div className="coordinates-box">
          <p>Latitud: {latGPS}</p>
          <p>Longitud: {lonGPS}</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
