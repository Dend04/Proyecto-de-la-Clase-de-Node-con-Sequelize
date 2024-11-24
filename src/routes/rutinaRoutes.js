import express from 'express';
import {
  getRutinas,
  getRutinaById,
  createRutina,
  updateRutina,
  deleteRutina,
  getRutinasByUsuarioId,
  asignarRutina
} from '../controllers/rutinaController.js';

const router = express.Router();

/**
 * @swagger
 * /api/rutinas:
 *   get:
 *     summary: Obtiene todas las rutinas
 *     responses:
 *       200:
 *         description: Lista de rutinas
 */
router.get('/rutinas', getRutinas);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   get:
 *     summary: Obtiene una rutina por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la rutina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina encontrada
 *       404:
 *         description: Rutina no encontrada
 */
router.get('/rutina/:id', getRutinaById);

/**
 * @swagger
 * /api/rutinas:
 *   post:
 *     summary: Crea una nueva rutina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Rutina creada
 */
router.post('/crearRutina', createRutina);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   put:
 *     summary: Actualiza una rutina existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la rutina
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Campos para actualizar la rutina
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *       404:
 *         description: Rutina no encontrada
 */
router.put('/rutinas/:id', updateRutina);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   delete:
 *     summary: Elimina una rutina
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la rutina
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rutina eliminada
 *       404:
 *         description: Rutina no encontrada
 */
router.delete('/rutinas/:id', deleteRutina);

/**
 * @swagger
 * /api/rutinas/usuario/{usuarioId}:
 *   get:
 *     summary: Obtiene rutinas por usuario ID
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de rutinas del usuario
 */
router.get('/rutina/usuario/:usuarioId', getRutinasByUsuarioId);

router.get('/rutina/:usuarioId', asignarRutina);

export default router;