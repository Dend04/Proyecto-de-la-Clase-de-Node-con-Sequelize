import express from 'express';
import { verificarToken } from '../middleware/middleware.js';
import { deshabilitar2FA, estado2FA, habilitar2FA, verificar2FA } from '../controllers/2faController.js';
 // Asegúrate de importar el controlador correcto

const router = express.Router();

// Habilitar 2FA
router.post('/habilitar-2fa', verificarToken('usuario','administrador'), habilitar2FA);

// Verificar código OTP
router.post('/verificar-2fa', verificarToken('usuario','administrador'), verificar2FA);

// Deshabilitar 2FA
router.post('/deshabilitar-2fa', verificarToken('usuario','administrador'), deshabilitar2FA);

router.get('/estado-2fa', verificarToken('usuario','administrador'), estado2FA);

export default router;