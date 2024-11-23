import Pregunta from '../models/pregunta_model.js';
import Test from '../models/test_model.js';

// Obtener todas las preguntas
export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una pregunta por ID
export const getPreguntaById = async (req, res) => {
  try {
    const pregunta = await Pregunta.findByPk(req.params.id);
    if (pregunta) {
      res.json(pregunta);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva pregunta vinculada a un test por su ID
export const createPregunta = async (req, res) => {
    try {
      const { testId, ...preguntaData } = req.body;
  
      // Verificar si el test existe
      const test = await Test.findByPk(testId);
      if (!test) {
        return res.status(404).json({ error: 'Test no encontrado' });
      }
  
      // Crear la pregunta vinculada al test
      const nuevaPregunta = await Pregunta.create({ ...preguntaData, testId });
      res.status(201).json(nuevaPregunta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Actualizar una pregunta existente
export const updatePregunta = async (req, res) => {
  try {
    const [updated] = await Pregunta.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPregunta = await Pregunta.findByPk(req.params.id);
      res.json(updatedPregunta);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una pregunta
export const deletePregunta = async (req, res) => {
  try {
    const deleted = await Pregunta.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Obtener todas las preguntas de un test por ID de test
export const getPreguntasByTestId = async (req, res) => {
    try {
      const testId = req.params.testId;
      const preguntas = await Pregunta.findAll({
        where: { testId: testId }
      });
      if (preguntas.length > 0) {
        res.json(preguntas);
      } else {
        res.status(404).json({ error: 'No se encontraron preguntas para el test con el ID proporcionado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener todas las preguntas de un test por nombre de test
  export const getPreguntasByTestName = async (req, res) => {
    try {
      const testName = req.params.testName;
      const test = await Test.findOne({
        where: { name: testName }
      });
      if (test) {
        const preguntas = await Pregunta.findAll({
          where: { testId: test.id }
        });
        if (preguntas.length > 0) {
          res.json(preguntas);
        } else {
          res.status(404).json({ error: 'No se encontraron preguntas para el test con el nombre proporcionado' });
        }
      } else {
        res.status(404).json({ error: 'Test no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };