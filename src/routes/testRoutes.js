import express from 'express';
import { getTests, getTestById, createTest, updateTest, deleteTest } from '../controllers/testController.js';

const router = express.Router();

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Obtiene todos los tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Lista de tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 */
router.get('/tests', async (req, res) => {
    try {
      const tests = await getTests();
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /api/test/{id}:
 *   get:
 *     summary: Obtiene un test por ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del test
 *     responses:
 *       200:
 *         description: Test encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Test no encontrado
 */
router.get('/test/:id', async (req, res) => {
    try {
      const test = await getTestById(req.params.id);
      if (!test) {
        return res.status(404).json({ error: 'Test no encontrado' });
      }
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /api/crearTest:
 *   post:
 *     summary: Crea un nuevo test
 *     tags: [Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *           example:
 *             titulo: "Prueba de Matemáticas"
 *             descripcion: "Este es un test para evaluar conocimientos básicos de matemáticas."
 *     responses:
 *       201:
 *         description: Test creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *             example:
 *               id: 1
 *               titulo: "Test de Salud"
 *               descripcion: "Este es un test para evaluar el estado actual de salud."
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
 *               error: "El título del test es obligatorio"
 */
router.post('/crearTest', async (req, res) => {
    try {
      const test = await createTest(req.body);
      res.status(201).json(test);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /api/test/{id}:
 *   put:
 *     summary: Actualiza un test existente
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *           example:
 *             titulo: "Prueba de Ciencias"
 *             descripcion: "Este es un test para evaluar conocimientos básicos de ciencias."
 *     responses:
 *       200:
 *         description: Test actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *             example:
 *               id: 1
 *               titulo: "Test de Salud"
 *               descripcion: "Este es un test para evaluar el estado fisico."
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T16:00:00.000Z"
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
 */
router.put('/test/:id', async (req, res) => {
    try {
      const test = await updateTest(req.params.id, req.body);
      res.status(200).json(test);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /api/test/{id}:
 *   delete:
 *     summary: Elimina un test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del test
 *     responses:
 *       200:
 *         description: Test eliminado satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Test eliminado satisfactoriamente
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
 */
router.delete('/test/:id', async (req, res) => {
  try {
    await deleteTest(req.params.id);
    res.status(200).json({ message: "Test eliminado satisfactoriamente" });
  } catch (error) {
    if (error.message === "Test no encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;