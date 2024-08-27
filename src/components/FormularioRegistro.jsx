// src/components/FormularioRegistro.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../db";
import "./FormularioRegistro.css";

// eslint-disable-next-line react/prop-types
const FormularioRegistro = ({ agregarRegistro, onClose }) => {
  const [tipo, setTipo] = useState("mantenimiento");
  const [detalleSeleccionado, setDetalleSeleccionado] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [costo, setCosto] = useState("");
  const [manoDeObra, setManoDeObra] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [mecanico, setMecanico] = useState("");

  const opcionesPiezas = [
    "Aceite del motor",
    "Filtro de aire",
    "Filtro de combustible",
    "Filtro de aceite",
    "Filtro de cabina",
    "Neumáticos",
    "Balatas delanteras",
    "Balatas traseras",
    "discos de freno",
    "tambores de freno",
    "Horquilla",
    "Rotula",
    "Cacahuate",
    "Bujías",
    "Banda de distribución",
    "Banda de accesorios",
    "Batería",
    "Muelle",
    "Gomas muelle",
    "Balero delantero izquierdo",
    "Balero delantero derecho",
    "Balero trasero izquierdo",
    "Balero trasero derecho",
    "Escobillas del limpiaparabrisas",
    "Amortiguadores y Suspensión",
    "Sistema de escape",
    "Inyectores de combustible",
    "Radiador y sistema de refrigeración",
  ];

  const opcionesMantenimiento = [
    "Cambio de aceite",
    "Rotación de neumáticos",
    "Alineación y balanceo",
    "Reemplazo de pastillas de freno",
    "Limpieza del sistema de inyección",
    "Recarga de refrigerante",
    "Inspección de juntas y sellos",
    "Mantenimiento de la transmisión",
    "Revisión del sistema de escape",
    "Cambio de filtro de aire",
    "Revisión de los amortiguadores",
    "Recarga de batería",
    "Revisión del sistema de suspensión",
    "Revisión del sistema de refrigeración",
    "Calibracion de frenos",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.registros.add({
      tipo,
      detalles: detalleSeleccionado,
      fecha,
      costo: parseFloat(costo),
      manoDeObra: parseFloat(manoDeObra),
      kilometraje: parseInt(kilometraje, 10),
      mecanico,
    });
    agregarRegistro();
    onClose();
  };

  return (
    <div className="contenedor-formulario">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Seleccione el tipo de servicio:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="selector"
          >
            <option value="mantenimiento">Mantenimiento</option>
            <option value="cambio">Cambio de Pieza</option>
          </select>
        </label>

        <label>
          {tipo === "mantenimiento"
            ? "Tipo de Mantenimiento:"
            : "Pieza a Cambiar:"}
          <select
            className="selector"
            value={detalleSeleccionado}
            onChange={(e) => setDetalleSeleccionado(e.target.value)}
            required
          >
            {tipo === "mantenimiento"
              ? opcionesMantenimiento.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))
              : opcionesPiezas.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
          </select>
        </label>

        <label>
          Fecha:
          <input
            className="selector"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="selector"
            type="number"
            placeholder="Costo"
            onChange={(e) => setCosto(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="selector"
            type="number"
            placeholder="Mano de obra"
            value={manoDeObra}
            onChange={(e) => setManoDeObra(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="selector"
            type="number"
            placeholder="Kilometraje ODO"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="selector"
            type="text"
            placeholder="Mecánico"
            value={mecanico}
            onChange={(e) => setMecanico(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="boton-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
