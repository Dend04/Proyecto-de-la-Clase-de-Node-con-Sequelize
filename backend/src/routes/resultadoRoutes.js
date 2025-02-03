import express from 'express';
import {
  getResultados,
  getResultadoById,
  getResultadosByUsuarioId,
  saveTestResults
} from '../controllers/resultadoController.js';

const router = express.Router();

/**
 * @swagger
 * /api/rutinas/asignar/{usuarioId}:
 *   get:
 *     summary: Asigna una rutina personalizada a un usuario basado en sus deficiencias
 *     tags: [Rutina]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario para asignar la rutina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina asignada exitosamente al usuario
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
 *         description: Usuario o resultado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Usuario o resultado no encontrado"
 */
router.get('/rutina/asignar/:usuarioId', async (req, res) => {
  try {
    const resultado = await asignarRutina(req.params.usuarioId);
    res.status(200).json(resultado);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});
/**
 * @swagger
 * /api/resultado/{id}:
 *   get:
 *     summary: Obtiene un resultado por ID
 *     tags: [Resultado]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resultado'
 *             example:
 *               id: 1
 *               usuarioId: 5
 *               estado: "Buen estado físico"
 *               deficiencias: "planchas, flexibilidad"
 *               planchas: 15
 *               abdominales: 40
 *               flexibilidad: 6
 *               velocidad: 8
 *               resistencia: 7
 *               tiempoDescanso: 8
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: Resultado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Resultado no encontrado"
 */
router.get('/resultados/:id', async (req, res) => {
  try {
    console.log("ID del resultado recibido:", req.params.id); // Depuración
    const resultado = await getResultadoById(req.params.id);
    if (!resultado) {
      return res.status(404).json({ error: 'Resultado no encontrado' });
    }
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/resultados/usuario/{usuarioId}:
 *   get:
 *     summary: Obtiene resultados por ID de usuario
 *     tags: [Resultado]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resultado'
 *             example:
 *               - id: 1
 *                 usuarioId: 5
 *                 estado: "Buen estado físico"
 *                 deficiencias: "planchas, flexibilidad"
 *                 planchas: 15
 *                 abdominales: 40
 *                 flexibilidad: 6
 *                 velocidad: 8
 *                 resistencia: 7
 *                 tiempoDescanso: 8
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 usuarioId: 5
 *                 estado: "Estado físico mejorado"
 *                 deficiencias: "velocidad"
 *                 planchas: 20
 *                 abdominales: 45
 *                 flexibilidad: 7
 *                 velocidad: 6
 *                 resistencia: 8
 *                 tiempoDescanso: 9
 *                 createdAt: "2024-04-11T15:00:00.000Z"
 *                 updatedAt: "2024-04-11T15:00:00.000Z"
 *       404:
 *         description: Resultados no encontrados para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Resultados no encontrados para el usuario"
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
 *               error: "Error interno del servidor"
 */
router.get('/resultados/usuario/:usuarioId', async (req, res) => {
  try {
    const resultados = await getResultadosByUsuarioId(req.params.usuarioId);
    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/test/{id}/resultados:
 *   post:
 *     summary: Guarda los resultados de un test
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del test
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuestas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     preguntaId:
 *                       type: integer
 *                     respuestaId:
 *                       type: integer
 *             example:
 *               respuestas:
 *                 - preguntaId: 1
 *                   respuestaId: 1
 *                 - preguntaId: 2
 *                   respuestaId: 3
 *     responses:
 *       200:
 *         description: Resultados guardados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 testId:
 *                   type: integer
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       preguntaId:
 *                         type: integer
 *                       respuestaId:
 *                         type: integer
 *             example:
 *               id: 1
 *               testId: 1
 *               respuestas:
 *                 - preguntaId: 1
 *                   respuestaId: 1
 *                 - preguntaId: 2
 *                   respuestaId: 3
 *       404:
 *         description: Test no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Test no encontrado"
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
 *               error: "Error interno del servidor"
 */
router.post('/test/:id/resultados', async (req, res) => {
  try {
    const { id } = req.params;
    const { respuestas } = req.body;

    const resultado = await saveTestResults(id, respuestas); // Llama a la función del controlador
    res.status(200).json(resultado);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;