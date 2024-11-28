import express from 'express';
import { getRutinas, getRutinaById, createRutina, updateRutina, deleteRutina, getRutinasByUsuarioId, asignarRutina } from '../controllers/rutinaController.js';

const router = express.Router();

/**
 * @swagger
 * /api/rutinas:
 *   get:
 *     summary: Obtiene todas las rutinas
 *     tags: [Rutina]
 *     responses:
 *       200:
 *         description: Lista de rutinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rutina'
 */
router.get('/rutinas', getRutinas);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   get:
 *     summary: Obtiene una rutina por ID
 *     tags: [Rutina]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *       404:
 *         description: Rutina no encontrada
 */
router.get('/rutina/:id', getRutinaById);

/**
 * @swagger
 * /api/rutinas:
 *   post:
 *     summary: Crea una nueva rutina
 *     tags: [Rutina]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 */
router.post('/crearRutina', createRutina);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   put:
 *     summary: Actualiza una rutina existente
 *     tags: [Rutina]
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *       404:
 *         description: Rutina no encontrada
 */
router.put('/rutinas/:id', updateRutina);

/**
 * @swagger
 * /api/rutinas/{id}:
 *   delete:
 *     summary: Elimina una rutina
 *     tags: [Rutina]
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
 *     tags: [Rutina]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rutina'
 */
router.get('/rutina/usuario/:usuarioId', getRutinasByUsuarioId);

/**
 * @swagger
 * /api/rutinas/asignar/{usuarioId}:
 *   get:
 *     summary: Asigna una rutina a un usuario
 *     tags: [Rutina]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina asignada al usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *       404:
 *         description: Usuario o rutina no encontrada
 */
router.get('/rutina/asignar/:usuarioId', asignarRutina);

export default router;