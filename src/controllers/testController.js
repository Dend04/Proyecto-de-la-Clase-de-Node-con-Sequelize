import Test from '../models/test_model.js';
import Pregunta from '../models/pregunta_model.js';

// Obtener todos los tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.findAll({
      include: [{ model: Pregunta }] // Incluye las preguntas relacionadas
    });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un test por ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id, {
      include: [{ model: Pregunta }] // Incluye las preguntas relacionadas
    });
    if (test) {
      res.json(test);
    } else {
      res.status(404).json({ error: 'Test no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo test
export const createTest = async (req, res) => {
  try {
    const nuevoTest = await Test.create(req.body);
    res.status(201).json(nuevoTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un test existente
export const updateTest = async (req, res) => {
  try {
    const [updated] = await Test.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTest = await Test.findByPk(req.params.id);
      res.json(updatedTest);
    } else {
      res.status(404).json({ error: 'Test no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un test
export const deleteTest = async (req, res) => {
  try {
    const deleted = await Test.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Test no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};