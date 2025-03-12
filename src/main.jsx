import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Landing from "./components/ui/Landing";
import Validacion from "./components/ui/Validacion";

// Crear una sola instancia de root
const rootElement = document.getElementById("root");
if (!rootElement._root) {
  rootElement._root = ReactDOM.createRoot(rootElement);
}

const App = () => (
  <React.StrictMode>
    <Router>
     
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Validacion />} />
          
          
     
          <Route path="/consulta-cliente" element={<Validacion />}>
          
       
          </Route>

          
        </Routes>
    
    </Router>
  </React.StrictMode>
);

rootElement._root.render(<App />);
