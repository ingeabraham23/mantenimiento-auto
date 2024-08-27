// src/db.js
import Dexie from 'dexie';

const db = new Dexie('MantenimientoAutoDB');
db.version(1).stores({
  registros: '++id, tipo, detalles, fecha, costo, manoDeObra, kilometraje, mecanico'
});

export default db;