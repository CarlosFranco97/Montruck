import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasicExample from "./Components/Header/Header";
import Dashboard from "./Components/Pages/Dashboard";
import Graficas from "./Components/Pages/Graficas";
import Reportes from "./Components/Pages/Reportes";

function App() {
  return (
    <Router>
      <BasicExample />
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Graficas" element={<Graficas />} />
        <Route path="/Reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
}

export default App;
