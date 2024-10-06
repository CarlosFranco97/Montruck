import React, { useEffect, useState } from "react";
import CardProgress from "./CardProgess";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  faGasPump,
  faGauge,
  faGaugeHigh,
  faOilCan,
  faPercent,
  faTemperatureQuarter,
} from "@fortawesome/free-solid-svg-icons";

// Definir la interfaz para los datos que se recibirán de la API
interface Sen {
  _id: string;
  vehiculo_id: number;
  datetime: string;
  Temp1: number;
  Temp2: number;
  Temp3: number;
  Frec: number;
  Level: number;
  RPM: string;
  IDC: string;
  PAM: string;
  TR: string;
  TAM: string;
  PA: string;
  PMA: string;
  VEL: string;
}

const CardGrid: React.FC = () => {
  const [sensores, setsensores] = useState<Sen[]>([]); // Almacena los datos de los vehículos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1880/data/sen"); // Ajustar la URL según tu backend
      if (!response.ok) {
        throw new Error("Error en la solicitud de la API");
      }
      const data: Sen[] = await response.json();
      setsensores(data);
      setLoading(false); // Los datos se cargaron con éxito
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  // Obtener el año del primer vehículo para la primera tarjeta
  const ultimoSen = sensores[0]; // Supone que hay al menos un vehículo en los datos

  const levelSen = parseFloat((ultimoSen.Level / (10 * 3.785)).toFixed(2));
  const rpmSen =
    ultimoSen.RPM === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.RPM, 16) * 0.125).toFixed(2));
  const velSen =
    ultimoSen.VEL === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.VEL, 16) / 256).toFixed(2));
  const pamSen =
    ultimoSen.PAM === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.PAM, 16) * (4 * 0.145038)).toFixed(2));
  const tamSen =
    ultimoSen.TAM === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.TAM, 16) * 0.03125 - 273).toFixed(2));
  const trSen =
    ultimoSen.TR === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.TR, 16) - 40).toFixed(2));
  const paSen =
    ultimoSen.PA === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.PA, 16) * 0.4).toFixed(2));
  const tmaSen =
    ultimoSen.PMA === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.PMA, 16) - 40).toFixed(2));
  const idcSen =
    ultimoSen.IDC === "FFFF"
      ? 0
      : parseFloat((parseInt(ultimoSen.IDC, 16) * (0.05 / 3.785)).toFixed(2));

  // Lista de tarjetas con el valor dinámico del año para la primera tarjeta
  const cards = [
    {
      name: "Nivel de Combustible",
      value: levelSen, // El año del primer vehículo como valor
      total: 120,
      unit: "Galones", // Sin unidad para el año
      showProgressBar: true,
      icon: faGasPump,
    },
    {
      name: "Velocidad del Motor",
      value: rpmSen,
      unit: "RPM",
      showProgressBar: false,
      icon: faGaugeHigh,
    },
    {
      name: "Velocidad del Vehículo",
      value: velSen,
      unit: "km/h",
      showProgressBar: false,
      icon: faGauge,
    },
    {
      name: "Presión de Aceite",
      value: pamSen,
      unit: "PSI",
      showProgressBar: false,
      icon: faOilCan,
    },
    {
      name: "Temperatura de Aceite",
      value: tamSen,
      unit: "°C",
      showProgressBar: false,
      icon: faTemperatureQuarter,
    },
    {
      name: "Temperatura Refrigerante",
      value: trSen,
      unit: "°C",
      showProgressBar: false,
      icon: faTemperatureQuarter,
    },
    {
      name: "Porcentaje del Acelerador",
      value: paSen,
      unit: "%",
      showProgressBar: true,
      icon: faPercent,
    },
    {
      name: "Temperatura de Admisión",
      value: tmaSen,
      unit: "°C",
      showProgressBar: false,
      icon: faTemperatureQuarter,
    },
    {
      name: "Índice de Combustible",
      value: idcSen,
      unit: "GPH",
      showProgressBar: false,
      icon: faGasPump,
    },
  ];

  return (
    <Container className="mt-4">
      <Row>
        {cards.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <CardProgress
              name={card.name}
              value={card.value}
              total={card.total}
              unit={card.unit}
              showProgressBar={card.showProgressBar}
              icon={card.icon}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardGrid;
