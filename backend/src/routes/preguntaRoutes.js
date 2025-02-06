import express from "express";
import {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta,
  getPreguntasByTestId,
  getPreguntasByTestName,
  getPreguntasConRespuestasByTestId,
} from "../controllers/preguntaController.js";
import { verificarToken } from "../middleware/middleware.js";

const router = express.Router();

// Rutas para las preguntas

/**
 * @swagger
 * /api/preguntas:
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
 *             example:
 *               - id: 1
 *                 texto: "¿Cuál es la capital de Francia?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 texto: "¿Cuál es la fórmula química del agua?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
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
router.get("/preguntas", async (req, res, next) => {
  try {
    const preguntas = await getPreguntas();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/pregunta/{id}:
 *   get:
 *     summary: Obtiene una pregunta por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *             example:
 *               id: 1
 *               texto: "¿Cuál es la capital de Francia?"
 *               testId: 1
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: Pregunta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Pregunta no encontrada"
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
router.get("/pregunta/:id",verificarToken('usuario','administrador'), async (req, res, next) => {
  try {
    const pregunta = await getPreguntaById(req.params.id);
    if (pregunta) {
      res.json(pregunta);
    } else {
      res.status(404).json({ error: "Pregunta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/crearPregunta:
 *   post:
 *     summary: Crea una nueva pregunta
 *     tags: [Preguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *           example:
 *             texto: "¿Cuál es la capital de Francia?"
 *             testId: 1
 *     responses:
 *       201:
 *         description: Pregunta creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *             example:
 *               id: 1
 *               texto: "¿Cuál es la capital de Francia?"
 *               testId: 1
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       400:
 *         description: Error en la creación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "El campo 'texto' es obligatorio"
 */
router.post("/crearPregunta", verificarToken('administrador'), async (req, res) => {
  try {
    const { testId, texto } = req.body; // Asegúrate de que testId esté en el cuerpo
    const nuevaPregunta = await createPregunta(testId, { texto });
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/pregunta/{id}:
 *   put:
 *     summary: Actualiza una pregunta existente
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pregunta'
 *           example:
 *             texto: "¿Cuál es la capital de Alemania?"
 *             testId: 1
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 *             example:
 *               id: 1
 *               texto: "¿Cuál es la capital de Alemania?"
 *               testId: 1
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-12T15:00:00.000Z"
 *       404:
 *         description: Pregunta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Pregunta no encontrada"
 */
router.put("/pregunta/:id",verificarToken('administrador'), async (req, res, next) => {
  try {
    const updatedPregunta = await updatePregunta(req.params.id, req.body);
    res.json(updatedPregunta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/pregunta/{id}:
 *   delete:
 *     summary: Elimina una pregunta
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta eliminada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pregunta eliminada satisfactoriamente"
 *       404:
 *         description: Pregunta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Pregunta no encontrada"
 */
router.delete("/pregunta/:id",verificarToken('administrador'), async (req, res, next) => {
  try {
    await deletePregunta(req.params.id);
    res.status(200).json({ message: "Pregunta eliminada satisfactoriamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// Rutas para obtener preguntas por test

/**
 * @swagger
 * /api/preguntas/test/id/{testId}:
 *   get:
 *     summary: Obtiene todas las preguntas de un test por ID de test
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: ID del test
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de preguntas del test
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 *             example:
 *               - id: 1
 *                 texto: "¿Cuál es la capital de Francia?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 texto: "¿Cuál es la fórmula química del agua?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: No se encontraron preguntas para el test
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "No se encontraron preguntas para el test con el ID proporcionado"
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
router.get("/preguntas/test/id/:testId", async (req, res, next) => {
  try {
    const preguntas = await getPreguntasByTestId(req.params.testId);
    if (preguntas.length > 0) {
      res.json(preguntas);
    } else {
      res
        .status(404)
        .json({
          error:
            "No se encontraron preguntas para el test con el ID proporcionado",
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/preguntas/test/name/{testName}:
 *   get:
 *     summary: Obtiene todas las preguntas de un test por nombre de test
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: testName
 *         required: true
 *         description: Nombre del test
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de preguntas del test
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pregunta'
 *             example:
 *               - id: 1
 *                 texto: "¿Cuál es la capital de Francia?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *               - id: 2
 *                 texto: "¿Cuál es la fórmula química del agua?"
 *                 testId: 1
 *                 createdAt: "2024-03-11T15:00:00.000Z"
 *                 updatedAt: "2024-03-11T15:00:00.000Z"
 *       404:
 *         description: No se encontraron preguntas para el test
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "No se encontraron preguntas para el test con el nombre proporcionado"
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
router.get('/preguntas/test/name/:testName', verificarToken('usuario','administrador'), async (req, res, next) => {
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

// Ruta para crear una nueva pregunta para un test específico
/**
 * @swagger
 * /preguntas/test/id/{testId}:
 *   post:
 *     summary: Crear una nueva pregunta para un test específico
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: testId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 example: "¿Cuál es la capital de Francia?"
 *               tipo:
 *                 type: string
 *                 example: "multiple"
 *               opciones:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["París", "Londres", "Madrid"]
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 texto:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 opciones:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Error al crear la pregunta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/preguntas/test/id/:testId',verificarToken('administrador'), async (req, res) => {
  try {
    const nuevaPregunta = await createPregunta(req.params.testId, req.body);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/preguntas-con-respuestas/test/:testId", async (req, res) => {
  try {
    const preguntasConEstado = await getPreguntasConRespuestasByTestId(req.params.testId);
    res.json(preguntasConEstado);
  } catch (error) {
    console.error("Error en /preguntas-con-respuestas/test/:testId:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
