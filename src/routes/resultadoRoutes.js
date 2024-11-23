import express from 'express';
import {
  getResultados,
  getResultadoById,
  createResultado
} from '../controllers/resultadoController.js';

const router = express.Router();

/**
 * @swagger
 * /api/resultados:
 *   get:
 *     summary: Obtiene todos los resultados
 *     responses:
 *       200:
 *         description: Lista de resultados
 */
router.get('/resultados', getResultados);

/**
 * @swagger
 * /api/resultados/{id}:
 *   get:
 *     summary: Obtiene un resultado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del resultado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultado encontrado
 *       404:
 *         description: Resultado no encontrado
 */
router.get('/resultado/:id', getResultadoById);

/**
 * @swagger
 * /api/resultados:
 *   post:
 *     summary: Crea un nuevo resultado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               testId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Resultado creado
 */
router.post('/crearResultado', createResultado);

/**
 * @swagger
 * /api/resultados/usuario/{usuarioId}:
 *   get:
 *     summary: Obtiene resultados por usuario ID
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de resultados del usuario
 */
router.get('/resultados/usuario/:usuarioId', getResultadosByUsuarioId);


export default router;