import "bootstrap/dist/css/bootstrap.min.css";
import Map from "../Map/Map.js";
import CardGrid from "../Card/CardGrid.js";

function Dashboard() {
  return (
    <>
      <div className="container">
        <Map />
        <CardGrid />
      </div>
    </>
  );
}

export default Dashboard;
