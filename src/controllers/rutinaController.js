import Rutina from '../models/rutina_model.js';
import Resultado from '../models/resultado_model.js';
import Usuario from '../models/usuario_model.js';

// Obtener todas las rutinas
export const getRutinas = async () => {
  return await Rutina.findAll({
    include: [Resultado]
  });
};

// Obtener una rutina por ID
export const getRutinaById = async (id) => {
  return await Rutina.findByPk(id, {
    include: [Resultado]
  });
};

// Crear una nueva rutina
export const createRutina = async (rutinaData) => {
  const { usuarioId, ...rest } = rutinaData;
  
  const ultimoResultado = await Resultado.findOne({
    where: { usuarioId },
    order: [['createdAt', 'DESC']]
  });
  
  if (!ultimoResultado) {
    throw new Error('No se encontró un resultado para el usuario');
  }

  return await Rutina.create({
    resultadoId: ultimoResultado.id,
    usuarioId,
    ...rest
  });
};

// Actualizar una rutina
export const updateRutina = async (id, rutinaData) => {
  const [updated] = await Rutina.update(rutinaData, {
    where: { id }
  });
  
  if (!updated) throw new Error('Rutina no encontrada');
  
  return await Rutina.findByPk(id);
};

// Eliminar una rutina
export const deleteRutina = async (id) => {
  const deleted = await Rutina.destroy({
    where: { id }
  });
  
  if (!deleted) throw new Error('Rutina no encontrada');
};

// Obtener rutinas por usuario ID
export const getRutinasByUsuarioId = async (usuarioId) => {
  return await Rutina.findAll({
    include: [{
      model: Resultado,
      where: { usuarioId }
    }]
  });
};

// Asignar rutina
export const asignarRutina = async (usuarioId) => {
  const resultado = await Resultado.findOne({ where: { usuarioId } });
  const usuario = await Usuario.findOne({ where: { id: usuarioId } });

  if (!resultado || !usuario) {
    throw new Error("Datos del usuario o resultado no encontrados");
  }

  let rutina = [];
  const deficiencias = resultado.deficiencias.split(', ');

  if (deficiencias.includes('planchas')) {
    rutina.push("5 planchas por día");
  }
  if (deficiencias.includes('abdominales')) {
    rutina.push("5 abdominales por día");
  }
  if (deficiencias.includes('flexibilidad')) {
    rutina.push("Ejercicios de estiramiento diarios");
  }
  if (deficiencias.includes('velocidad')) {
    rutina.push("Sprints cortos 3 veces por semana");
  }
  if (deficiencias.includes('resistencia')) {
    rutina.push("Correr 20 minutos 3 veces por semana");
  }
  if (deficiencias.includes('tiempo de descanso')) {
    rutina.push("Asegurar al menos 7 horas de sueño");
  }

  const rutinaCreada = await Rutina.upsert({
    usuarioId,
    descripcion: rutina.join(", ")
  });

  return {
    message: "Rutina asignada",
    rutina: rutinaCreada
  };
};