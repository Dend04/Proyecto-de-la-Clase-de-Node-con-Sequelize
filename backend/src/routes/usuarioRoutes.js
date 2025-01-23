import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, borrarUsuario, buscarUsuarios, iniciarSesion, obtenerPerfil, refrescarToken, actualizarNombreUsuario, cerrarSesion, obtenerEstadoUsuario } from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/middleware.js';


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
 *             password: "password123"
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
router.post('/crearUsuario',  async (req, res) => {
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
router.get('/usuarios',verificarToken, async (req, res) => {
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
router.get('/usuario/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
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
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la actualización del usuario
 */
router.put('/usuario/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await actualizarUsuario(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error en la eliminación del usuario
 */
router.delete('/usuario/:id',verificarToken, async (req, res) => {
  try {
    await borrarUsuario(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuario/{id}/username:
 *   put:
 *     summary: Actualiza el nombre de usuario por ID
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
 *             type: object
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *                 example: "nuevoNombreUsuario"
 *     responses:
 *       200:
 *         description: Nombre de usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la actualización del nombre de usuario
 */
router.put('/usuario/:id/username',verificarToken, async (req, res) => {
  try {
    const usuario = await actualizarNombreUsuario(req.params.id, req.body.username);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/buscar/{query}:
 *   get:
 *     summary: Busca usuarios por nombre, apellidos o nombre de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Consulta de búsqueda
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la búsqueda de usuarios
 */
router.get('/usuarios/buscar/:query',verificarToken, async (req, res) => {
  try {
    const usuarios = await buscarUsuarios(req.params.query);
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/iniciarSesion:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificador:
 *                 type: string
 *                 example: "juan.perez@ejemplo.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en el inicio de sesión
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
router.post('/iniciarSesion', async (req, res) => {
  try {
    const { identificador, password } = req.body;
    const { token, refreshToken, usuario } = await iniciarSesion(identificador, password);
    res.status(200).json({ accessToken: token, refreshToken, usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Registra un nuevo usuario
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
 *             password: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
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
 *         description: Error en el registro del usuario
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
router.post('/registro', verificarToken, async (req, res) => {
  try {
    const usuario = await crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombreUsuario:
 *                       type: string
 *                     rol:
 *                       type: string
 *       401:
 *         description: Token no válido
 *       403:
 *         description: No se proporcionó un token
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener perfil del usuario
 */
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await obtenerPerfil(req, res);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/refrescarToken:
 *   post:
 *     summary: Refresca el token JWT del usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token refrescado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error al refrescar el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Refresh token no válido"
 */
router.post('/refrescarToken', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { token } = await refrescarToken(refreshToken);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/cerrarSesion',verificarToken , async (req, res) => {
  try {
    await cerrarSesion(req);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/auth/estado', verificarToken, async (req, res) => {
  try {
    const usuario = await obtenerEstadoUsuario(req);
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;