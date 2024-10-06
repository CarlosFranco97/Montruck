import { Card } from "react-bootstrap";
import "../Pages/Graficas.css";

interface CardProps {
  title: string;
  description: string;
}

const CardGraph: React.FC<CardProps> = ({ title, description }) => {
  return (
    <Card>
      <Card.Title className="card-graph-title">{title}</Card.Title>
      <Card.Body>{description}</Card.Body>
    </Card>
  );
};

export default CardGraph;
