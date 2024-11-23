import Resultado from '../models/resultado_model.js';
import Test from '../models/test_model.js';
import Usuario from '../models/usuario_model.js';

// Obtener todos los resultados
export const getResultados = async (req, res) => {
  try {
    const resultados = await Resultado.findAll({
      include: [Test, Usuario] // Incluye Test y Usuario relacionados
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un resultado por ID
export const getResultadoById = async (req, res) => {
  try {
    const resultado = await Resultado.findByPk(req.params.id, {
      include: [Test, Usuario]
    });
    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ error: 'Resultado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo resultado vinculado a un test y usuario
export const createResultado = async (req, res) => {
  try {
    const { testId, usuarioId, ...rest } = req.body;
    const test = await Test.findByPk(testId);
    const usuario = await Usuario.findByPk(usuarioId);

    if (!test || !usuario) {
      return res.status(404).json({ error: 'Test o Usuario no encontrado' });
    }

    const nuevoResultado = await Resultado.create({ testId, usuarioId, ...rest });
    res.status(201).json(nuevoResultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un resultado existente
export const updateResultado = async (req, res) => {
  try {
    const [updated] = await Resultado.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedResultado = await Resultado.findByPk(req.params.id);
      res.json(updatedResultado);
    } else {
      res.status(404).json({ error: 'Resultado no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un resultado
export const deleteResultado = async (req, res) => {
  try {
    const deleted = await Resultado.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Resultado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener resultados por usuario ID
export const getResultadosByUsuarioId = async (req, res) => {
    try {
      const resultados = await Resultado.findAll({
        where: { usuarioId: req.params.usuarioId },
        include: [Test]
      });
      res.json(resultados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };