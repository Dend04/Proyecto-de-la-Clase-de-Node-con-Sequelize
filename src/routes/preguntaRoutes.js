import express from 'express';
import {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta,
  getPreguntasByTestId,
  getPreguntasByTestName
} from '../controllers/preguntaController.js';

const router = express.Router();

// Rutas para las preguntas


/**
 * @swagger
 * /preguntas:
 *   get:
 *     summary: Obtiene todas las preguntas
 *     tags: [Preguntas]
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 */

router.get('/preguntas', async (req, res, next) => {
  try {
    const preguntas = await getPreguntas();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /preguntas/{id}:
 *   get:
 *     summary: Obtiene una pregunta por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Pregunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *       404:
 *         description: Pregunta no encontrada
 */
router.get('/preguntas/:id', async (req, res, next) => {
  try {
    const pregunta = await getPreguntaById(req.params.id);
    if (pregunta) {
      res.json(pregunta);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * @swagger
 * /crearPregunta:
 *   post:
 *     summary: Crea una nueva pregunta
 *     tags: [Preguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *     responses:
 *       201:
 *         description: Pregunta creada
 *       400:
 *         description: Error en la creación
 */
router.post('/crearPregunta', async (req, res, next) => {
  try {
    const nuevaPregunta = await createPregunta(req.body);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /preguntas/{id}:
 *   put:
 *     summary: Actualiza una pregunta existente
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *       404:
 *         description: Pregunta no encontrada
 */
router.put('/preguntas/:id', async (req, res, next) => {
  try {
    const updatedPregunta = await updatePregunta(req.params.id, req.body);
    res.json(updatedPregunta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /preguntas/{id}:
 *   delete:
 *     summary: Elimina una pregunta
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       204:
 *         description: Pregunta eliminada
 *       404:
 *         description: Pregunta no encontrada
 */
router.delete('/preguntas/:id', async (req, res, next) => {
  try {
    await deletePregunta(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Rutas para obtener preguntas por test

/**
 * @swagger
 * /preguntas/test/id/{testId}:
 *   get:
 *     summary: Obtiene todas las preguntas de un test por ID de test
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: testId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del test
 *     responses:
 *       200:
 *         description: Lista de preguntas del test
 *       404:
 *         description: No se encontraron preguntas para el test
 */
router.get('/preguntas/test/id/:testId', async (req, res, next) => {
  try {
    const preguntas = await getPreguntasByTestId(req.params.testId);
    if (preguntas.length > 0) {
      res.json(preguntas);
    } else {
      res.status(404).json({ error: 'No se encontraron preguntas para el test con el ID proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * @swagger
 * /preguntas/test/name/{testName}:
 *   get:
 *     summary: Obtiene todas las preguntas de un test por nombre de test
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: testName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del test
 *     responses:
 *       200:
 *         description: Lista de preguntas del test
 *       404:
 *         description: No se encontraron preguntas para el test
 */
router.get('/preguntas/test/name/:testName', async (req, res, next) => {
  try {
    const preguntas = await getPreguntasByTestName(req.params.testName);
    if (preguntas.length > 0) {
      res.json(preguntas);
    } else {
      res.status(404).json({ error: 'No se encontraron preguntas para el test con el nombre proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;