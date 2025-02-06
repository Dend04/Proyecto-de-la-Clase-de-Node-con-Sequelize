import express from 'express';
import { getRespuestas, getRespuestaById, createRespuesta, updateRespuesta, deleteRespuesta, getRespuestasByPreguntaId } from '../controllers/respuestaController.js';
import { verificarToken } from '../middleware/middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Respuestas
 *   description: API para gestionar respuestas
 */

/**
 * @swagger
 * /respuestas:
 *   get:
 *     summary: Obtener todas las respuestas
 *     tags: [Respuestas]
 *     responses:
 *       200:
 *         description: Lista de todas las respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   respuesta_textual:
 *                     type: string
 *                   respuesta_numerica:
 *                     type: integer
 *                   preguntaId:
 *                     type: integer
 *       500:
 *         description: Error al obtener las respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/respuestas', async (req, res) => {
  try {
    const respuestas = await getRespuestas();
    res.status(200).json(respuestas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
});

/**
 * @swagger
 * /respuesta/{id}:
 *   get:
 *     summary: Obtener una respuesta por ID
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la respuesta
 *     responses:
 *       200:
 *         description: Respuesta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 tipo:
 *                   type: string
 *                 respuesta_textual:
 *                   type: string
 *                 respuesta_numerica:
 *                   type: integer
 *                 preguntaId:
 *                   type: integer
 *       404:
 *         description: Respuesta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error al obtener la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/respuesta/:id',verificarToken(('usuario','administrador')), async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await getRespuestaById(id);
    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
});

/**
 * @swagger
 * /crearRespuesta:
 *   post:
 *     summary: Crear una nueva respuesta
 *     tags: [Respuestas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuesta:
 *                 type: object
 *                 properties:
 *                   tipo:
 *                     type: string
 *                     example: "texto"
 *                   valor:
 *                     type: string
 *                     example: "París"
 *               preguntaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 respuesta:
 *                   type: object
 *                   properties:
 *                     tipo:
 *                       type: string
 *                     valor:
 *                       type: string
 *                 preguntaId:
 *                   type: integer
 *       500:
 *         description: Error al crear la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/crearRespuesta', verificarToken(('administrador')), async (req, res) => {
  try {
    const respuesta = await createRespuesta(req.body);
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la respuesta: ' + error.message });
  }
});

/**
 * @swagger
 * /respuesta/{id}:
 *   put:
 *     summary: Actualizar una respuesta por ID
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la respuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "texto"
 *               respuesta_textual:
 *                 type: string
 *                 example: "París"
 *               respuesta_numerica:
 *                 type: integer
 *                 example: 42
 *               preguntaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 tipo:
 *                   type: string
 *                 respuesta_textual:
 *                   type: string
 *                 respuesta_numerica:
 *                   type: integer
 *                 preguntaId:
 *                   type: integer
 *       500:
 *         description: Error al actualizar la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/respuesta/:id', verificarToken(('administrador')), async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await updateRespuesta(id, req.body);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
});

/**
 * @swagger
 * /borrarRespuesta/{id}:
 *   delete:
 *     summary: Eliminar una respuesta por ID
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la respuesta
 *     responses:
 *       204:
 *         description: Respuesta eliminada exitosamente
 *       500:
 *         description: Error al eliminar la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/borrarRespuesta/:id', verificarToken(('administrador')), async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRespuesta(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la respuesta' });
  }
});

/**
 * @swagger
 * /respuestas/pregunta/{preguntaId}:
 *   get:
 *     summary: Obtener todas las respuestas de una pregunta por ID de pregunta
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: preguntaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Lista de respuestas de la pregunta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   respuesta_textual:
 *                     type: string
 *                   respuesta_numerica:
 *                     type: integer
 *                   preguntaId:
 *                     type: integer
 *       404:
 *         description: No se encontraron respuestas para la pregunta con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error al obtener las respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/respuestas/pregunta/:preguntaId', async (req, res) => {
  console.log('Accediendo a la ruta /respuestas/pregunta/:preguntaId');
  try {
    const respuestas = await getRespuestasByPreguntaId(req.params.preguntaId);
    if (respuestas.length > 0) {
      res.json(respuestas);
    } else {
      res.status(404).json({ error: 'No se encontraron respuestas para la pregunta con el ID proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;