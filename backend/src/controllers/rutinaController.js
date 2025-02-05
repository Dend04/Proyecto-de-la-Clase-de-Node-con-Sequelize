import Rutina from '../models/rutina_model.js';
import Resultado from '../models/resultado_model.js';
import Usuario from '../models/usuario_model.js';
import Test from '../models/test_model.js';

// Obtener todas las rutinas
export const getRutinas = async () => {
  try {
    const rutinas = await Rutina.findAll();
    return rutinas;
  } catch (error) {
    console.error('Error al obtener rutinas:', error);
    throw new Error('Error al obtener rutinas');
  }
};;

// Obtener una rutina por ID
export const getRutinaById = async (id) => {
  return await Rutina.findByPk(id, {
    include: [Resultado, Usuario, Test]
  });
};

// Crear una nueva rutina basada en el porcentaje de aciertos
export const createRutina = async (rutinaData) => {
  const { nombre, descripcion, testId, porcentajeAciertos } = rutinaData;

  // Validar campos obligatorios
  if (!nombre || !testId || !porcentajeAciertos) {
    throw new Error('Faltan campos obligatorios: nombre, testId o porcentajeAciertos');
  }

  // Crear la rutina
  return await Rutina.create({
    nombre,
    descripcion,
    testId,
    porcentajeAciertos,
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

// Asignar rutina basada en el porcentaje de aciertos
export const asignarRutina = async (usuarioId, testId, porcentajeAciertos) => {
  try {
    // Buscar el último resultado del usuario para el test
    const resultado = await Resultado.findOne({
      where: { usuarioId, testId }, // Aquí usuarioId no debe ser undefined
      order: [['createdAt', 'DESC']],
    });

    if (!resultado) {
      throw new Error('No se encontró un resultado para el usuario y el test');
    }

    // Buscar una rutina que coincida con el porcentaje de aciertos
    const rutina = await Rutina.findOne({
      where: { testId, porcentajeAciertos },
    });

    if (!rutina) {
      throw new Error('No se encontró una rutina para el porcentaje de aciertos');
    }

    // Asignar la rutina al usuario y resultado
    await rutina.update({
      usuarioId,
      resultadoId: resultado.id,
    });

    return {
      message: "Rutina asignada correctamente",
      rutina,
    };
  } catch (error) {
    console.error('Error al asignar rutina:', error);
    throw new Error('Error al asignar rutina');
  }
};