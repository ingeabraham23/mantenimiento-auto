// src/App.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import FormularioRegistro from './components/FormularioRegistro';
import TablaRegistros from './components/TablaRegistros';
import "./App.css"

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarRegistro = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="App">
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className='boton-formulario'>
        {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Registro'}
      </button>
      {mostrarFormulario && (
        <FormularioRegistro agregarRegistro={agregarRegistro} onClose={() => setMostrarFormulario(false)} />
      )}
      <TablaRegistros />
    </div>
  );
}

export default App;
