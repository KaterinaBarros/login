import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import ListaInstrumentos from "../componentes/ListaInstrumento";
import DetalleInstrumento from "../componentes/DetalleInstrumento";
import Home from "../componentes/Home";
import DondeEstamos from "../componentes/DondeEstamos";
import InstrumentosABM from "../componentes/InstrumentosABM";
import Cart from "../componentes/Cart";
import { RutaPrivada } from '../controlAcceso/RutaPrivada'
import Login from '../componentes/Login';

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
          <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="productos" element={
            <RutaPrivada>
                <ListaInstrumentos />
            </RutaPrivada>
        } />
        <Route path="productos/detalle/:id" element={<DetalleInstrumento />} />
        <Route path="DondeEstamos" element={<DondeEstamos />} />
        <Route path="InstrumentosABM" element={
            <RutaPrivada>
                <InstrumentosABM />
            </RutaPrivada>} />
        <Route path="Cart" element={<Cart />} />
      </Routes>
    );
  }
}

export default AppRoutes;