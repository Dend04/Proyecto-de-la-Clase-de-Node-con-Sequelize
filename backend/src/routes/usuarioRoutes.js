import express from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  borrarUsuario,
} from "../controllers/usuarioController.js";

const router = express.Router();

/**
 * @swagger
 * /api/crearUsuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nombre: "Juan"
 *             apellidos: "Pérez García"
 *             segundoNombre: "Antonio"
 *             nombreUsuario: "juanperez123"
 *             email: "juan.perez@ejemplo.com"
 *             peso: 75.5
 *             altura: 175.5
 *             enfermedadCronica: "Ninguna"
 *             estadoFisicoActual: "Activo"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             example:
 *               id: 1
 *               nombre: "Juan"
 *               apellidos: "Pérez García"
 *               segundoNombre: "Antonio"
 *               nombreUsuario: "juanperez123"
 *               email: "juan.perez@ejemplo.com"
 *               peso: 75.5
 *               altura: 175.5
 *               enfermedadCronica: "Ninguna"
 *               estadoFisicoActual: "Activo"
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:00:00.000Z"
 *       400:
 *         description: Error en la creación del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "El email ya está registrado"
 */
router.post('/crearUsuario', async (req, res) => {
  try {
    const usuario = await crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error del servidor
 */
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nombre: "Juan"
 *             apellidos: "Pérez López"
 *             segundoNombre: "Antonio"
 *             nombreUsuario: "juanperez123"
 *             email: "juan.perez@ejemplo.com"
 *             peso: 80.5
 *             altura: 175.5
 *             enfermedadCronica: "Ninguna"
 *             estadoFisicoActual: "Muy Activo"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             example:
 *               id: 1
 *               nombre: "Juan"
 *               apellidos: "Pérez López"
 *               segundoNombre: "Antonio"
 *               nombreUsuario: "juanperez123"
 *               email: "juan.perez@ejemplo.com"
 *               peso: 80.5
 *               altura: 175.5
 *               enfermedadCronica: "Ninguna"
 *               estadoFisicoActual: "Muy Activo"
 *               createdAt: "2024-03-11T15:00:00.000Z"
 *               updatedAt: "2024-03-11T15:30:00.000Z"
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
router.put('/usuario/:id', async (req, res) => {
  try {
    const usuario = await actualizarUsuario(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});
/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado satisfactoriamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/usuario/:id', async (req, res) => {
  try {
    await borrarUsuario(req.params.id);
    res.status(200).json({ message: "Usuario eliminado satisfactoriamente" });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;
