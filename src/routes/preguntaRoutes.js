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

router.get('/preguntas', getPreguntas);

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
router.get('/preguntas/:id', getPreguntaById);

/**
 * @swagger
 * /preguntas:
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
router.post('/crearPregunta', createPregunta);

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
router.put('/preguntas/:id', updatePregunta);

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
router.delete('/preguntas/:id', deletePregunta);

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
router.get('/preguntas/test/id/:testId', getPreguntasByTestId);

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
router.get('/preguntas/test/name/:testName', getPreguntasByTestName);

export default router;