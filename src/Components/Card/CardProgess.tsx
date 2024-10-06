import React from "react";
import { Card } from "react-bootstrap";
import CustomProgressBar from "./ProgressBar";
import "./CardProgress.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProgressProps {
  name: string;
  value: number;
  total: any;
  unit: string;
  showProgressBar?: boolean; // Agregamos una propiedad para mostrar o no la barra de progreso
  icon: any; // Nueva propiedad para el icono
}

const CardProgress: React.FC<CardProgressProps> = ({
  name,
  value,
  total,
  unit,
  showProgressBar = true,
  icon,
}) => {
  return (
    <Card className="mb-4 card-progress">
      <div className="icon-container position-relative">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <Card.Body>
        <div>
          <Card.Text className="card-text">{name}</Card.Text>
          <Card.Title className="card-title">
            {value} {unit}
          </Card.Title>
          {showProgressBar && <CustomProgressBar value={value} total={total} />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProgress;
