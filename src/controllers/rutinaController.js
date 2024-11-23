import Rutina from '../models/rutina_model.js';
import Resultado from '../models/resultado_model.js';

// Obtener todas las rutinas
export const getRutinas = async (req, res) => {
  try {
    const rutinas = await Rutina.findAll({
      include: [Resultado] // Incluye el Resultado relacionado
    });
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una rutina por ID
export const getRutinaById = async (req, res) => {
  try {
    const rutina = await Rutina.findByPk(req.params.id, {
      include: [Resultado]
    });
    if (rutina) {
      res.json(rutina);
    } else {
      res.status(404).json({ error: 'Rutina no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva rutina vinculada al último resultado
export const createRutina = async (req, res) => {
    try {
      const { usuarioId, ...rest } = req.body;
      const ultimoResultado = await Resultado.findOne({
        where: { usuarioId },
        order: [['createdAt', 'DESC']]
      });
  
      if (!ultimoResultado) {
        return res.status(404).json({ error: 'No se encontró un resultado para el usuario' });
      }
  
      const nuevaRutina = await Rutina.create({ resultadoId: ultimoResultado.id, usuarioId, ...rest });
      res.status(201).json(nuevaRutina);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Actualizar una rutina existente
export const updateRutina = async (req, res) => {
  try {
    const [updated] = await Rutina.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRutina = await Rutina.findByPk(req.params.id);
      res.json(updatedRutina);
    } else {
      res.status(404).json({ error: 'Rutina no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una rutina
export const deleteRutina = async (req, res) => {
  try {
    const deleted = await Rutina.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rutina no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener rutinas por usuario ID
export const getRutinasByUsuarioId = async (req, res) => {
    try {
      const rutinas = await Rutina.findAll({
        include: [{
          model: Resultado,
          where: { usuarioId: req.params.usuarioId }
        }]
      });
      res.json(rutinas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };