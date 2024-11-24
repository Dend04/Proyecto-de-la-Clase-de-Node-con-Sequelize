import express from 'express';
import {
  getResultados,
  getResultadoById,
  getResultadosByUsuarioId
} from '../controllers/resultadoController.js';

const router = express.Router();

/**
 * @swagger
 * /api/resultados:
 *   get:
 *     summary: Obtiene todas los resultados
 *     tags: [Resultado]
 *     responses:
 *       200:
 *         description: Lista de resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resultado'
 */
router.get('/resultados', getResultados);

/**
 * @swagger
 * /api/resultados/{id}:
 *    get:
 *     summary: Obtiene un resultado por ID
 *     tags: [Resultado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado
 *     responses:
 *       200:
 *         description: Resultado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resultado'
 *       404:
 *         description: Resultado no encontrado
 */
router.get('/resultado/:id', getResultadoById);


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