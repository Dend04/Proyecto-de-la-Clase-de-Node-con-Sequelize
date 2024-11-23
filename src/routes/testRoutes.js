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
router.get('/tests', getTests);

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
router.get('/test/:id', getTestById);

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
 *     responses:
 *       201:
 *         description: Test creado
 *       400:
 *         description: Error en la creación
 */
router.post('/crearTest', createTest);

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
 *     responses:
 *       200:
 *         description: Test actualizado
 *       404:
 *         description: Test no encontrado
 */
router.put('/test/:id', updateTest);

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
 *       204:
 *         description: Test eliminado
 *       404:
 *         description: Test no encontrado
 */
router.delete('/test/:id', deleteTest);

export default router;