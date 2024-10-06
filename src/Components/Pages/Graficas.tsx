import Card from "../Card/CardGraph";
import { DatePicker } from "antd";
import "./Graficas.css";

const { RangePicker } = DatePicker;

function Graficas() {
  return (
    <div>
      <RangePicker className="date-picker" showTime />
      <div className="card-graph">
        <Card title="Velocidad del Vehículo" description="This is card 1" />
        <Card title="Velocidad del Motor" description="This is card 2" />
        <Card title="Nivel de Combustible" description="This is card 3" />
        <Card title="Temperaturas" description="This is card 4" />
      </div>
    </div>
  );
}

export default Graficas;
