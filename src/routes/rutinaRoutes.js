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
 *         description: Lista de todas las rutinas disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rutina'
 *             example:
 *               - id: 1
 *                 nombre: "Rutina de Fuerza"
 *                 descripcion: "Incluye ejercicios de fuerza y resistencia"
 *                 resultadoId: 10
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 nombre: "Rutina de Cardio"
 *                 descripcion: "Ejercicios de alta intensidad para mejorar el cardio"
 *                 resultadoId: 11
 *                 createdAt: "2024-03-12T15:00:00.000Z"
 *                 updatedAt: "2024-03-12T15:00:00.000Z"
 */
router.get('/rutinas', async (req, res) => {
    try {
      const rutinas = await getRutinas();
      res.status(200).json(rutinas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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
 *             example:
 *               id: 1
 *               nombre: "Rutina de Fuerza"
 *               descripcion: "Incluye ejercicios de fuerza y resistencia"
 *               resultadoId: 10
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: Rutina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Rutina no encontrada"
 */
router.get('/rutina/:id', async (req, res) => {
    try {
      const rutina = await getRutinaById(req.params.id);
      if (!rutina) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }
      res.status(200).json(rutina);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
/**
 * @swagger
 * /api/crearRutina:
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
 *                 description: ID del usuario para asociar la rutina
 *             required:
 *               - usuarioId
 *           example:
 *             usuarioId: 1
 *     responses:
 *       201:
 *         description: Rutina creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *             example:
 *               id: 1
 *               nombre: "Rutina Personalizada"
 *               descripcion: "5 planchas por día, 5 abdominales por día"
 *               resultadoId: 10
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       400:
 *         description: No se encontró un resultado para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "No se encontró un resultado para el usuario"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Error inesperado"
 */
router.post('/crearRutina', async (req, res) => {
    try {
      const rutina = await createRutina(req.body);
      res.status(201).json(rutina);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
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
 *           example:
 *             nombre: "Rutina de Cardio Avanzada"
 *             descripcion: "Ejercicios de alta intensidad para mejorar el cardio"
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rutina'
 *             example:
 *               id: 1
 *               nombre: "Rutina de Cardio Avanzada"
 *               descripcion: "Ejercicios de alta intensidad para mejorar el cardio"
 *               resultadoId: 10
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-12T15:00:00.000Z"
 *       404:
 *         description: Rutina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Rutina no encontrada"
 */
router.put('/rutina/:id', async (req, res) => {
    try {
      const rutina = await updateRutina(req.params.id, req.body);
      res.status(200).json(rutina);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
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
 *       200:
 *         description: Rutina eliminada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rutina eliminada satisfactoriamente"
 *       404:
 *         description: Rutina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Rutina no encontrada"
 */
router.delete('/rutinas/:id', async (req, res) => {
  try {
    await deleteRutina(req.params.id);
    res.status(200).json({ message: "Rutina eliminada satisfactoriamente" });
  } catch (error) {
    if (error.message === "Rutina no encontrada") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});
/**
 * @swagger
 * /api/rutinas/usuario/{usuarioId}:
 *   get:
 *     summary: Obtiene rutinas por ID de usuario
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
 *             example:
 *               - id: 1
 *                 nombre: "Rutina de Fuerza"
 *                 descripcion: "Incluye ejercicios de fuerza y resistencia"
 *                 resultadoId: 10
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 nombre: "Rutina de Cardio"
 *                 descripcion: "Ejercicios de alta intensidad para mejorar el cardio"
 *                 resultadoId: 11
 *                 createdAt: "2024-03-12T15:00:00.000Z"
 *                 updatedAt: "2024-03-12T15:00:00.000Z"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Usuario no encontrado"
 */
router.get('/rutina/usuario/:usuarioId', async (req, res) => {
  try {
    const rutinas = await getRutinasByUsuarioId(req.params.usuarioId);
    res.status(200).json(rutinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 rutina:
 *                   $ref: '#/components/schemas/Rutina'
 *             example:
 *               message: "Rutina asignada exitosamente"
 *               rutina:
 *                 id: 1
 *                 nombre: "Rutina Personalizada"
 *                 descripcion: "5 planchas por día, 5 abdominales por día"
 *                 resultadoId: 10
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: Usuario o rutina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Usuario o rutina no encontrada"
 */
router.get('/rutina/asignar/:usuarioId', async (req, res) => {
  try {
    const resultado = await asignarRutina(req.params.usuarioId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;