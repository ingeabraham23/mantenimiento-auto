// src/components/TablaRegistros.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import db from '../db';
import html2canvas from "html2canvas";
import "./TablaRegistros.css";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Dexie from "dexie";

const TablaRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  const tablaRef = useRef(null);

  useEffect(() => {
    const cargarRegistros = async () => {
      let todosLosRegistros = await db.registros.toArray();
      if (filtroMes) {
        todosLosRegistros = todosLosRegistros.filter(registro =>
          registro.fecha.startsWith(filtroMes)
        );
      }
      if (filtroTipo) {
        todosLosRegistros = todosLosRegistros.filter(registro =>
          registro.tipo === filtroTipo
        );
      }
      setRegistros(todosLosRegistros);
    };
    cargarRegistros();
  }, [filtroMes, filtroTipo]);

  function capturarTabla() {
    const tabla = tablaRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `mantenimiento.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Función para limpiar la tabla de unidades y reiniciar el contador de ID
  const handleClearRegistros = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas limpiar la tabla de unidades? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      try {
        await Dexie.delete("MantenimientoAutoDB"); // Elimina la base de datos
        // Vuelve a inicializar la base de datos
        const newDb = new Dexie("MantenimientoAutoDB");
        newDb.version(1).stores({
          registros: '++id, tipo, detalles, fecha, costo, manoDeObra, kilometraje, mecanico'
        });
        toast.success(
          "¡Tabla de registros limpiada y contador de ID reiniciado correctamente!"
        );
      } catch (error) {
        console.error("Error al limpiar la tabla de registros:", error);
        toast.error("¡Error al limpiar la tabla de registros!");
      }
    }
  };

  return (
    <div>
      <hr></hr>
      <div className='contenedor-filtros'>
        <label>
          Filtrar por Mes:
          <input type="month" value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)} className='selector'/>
        </label>
        <label>
          Filtrar por Tipo:
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className='selector'>
            <option value="">Todos</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="cambio">Cambio de Pieza</option>
          </select>
        </label>
      </div>
      <table className='tabla-registros' ref={tablaRef}>
        <thead>
          <tr>
            <th className='encabezado'>#</th>
            <th className='encabezado'>Detalles</th>
            <th className='encabezado'>Fecha</th>
            <th className='encabezado'>Costo</th>
            <th className='encabezado'>M.O.</th>
            <th className='encabezado'>ODO</th>
            <th className='encabezado'>Mecánico</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => (
            <tr key={registro.id}>
              <td className='columna-index'>{index + 1}</td>
              <td className='columna-detalles'>{registro.detalles}</td>
              <td className='columna-fecha'>{registro.fecha}</td>
              <td className='columna-costo'>${registro.costo}</td>
              <td className='columna-mano-de-obra'>${registro.manoDeObra}</td>
              <td className='columna-kilometraje'>{registro.kilometraje}</td>
              <td className='columna-mecanico'>{registro.mecanico}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={capturarTabla} className='boton-capturar'>Capturar tabla 📸</button>
      <button onClick={handleClearRegistros} className='boton-eliminar'>Borrar todos los registros 🧨💣🚫</button>
    </div>
  );
};

export default TablaRegistros;
