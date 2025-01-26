import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import Usuario from '../models/usuario_model.js';

export const habilitar2FA = async (req, res) => {
  try {
    console.log('Solicitud recibida en habilitar2FA');
    const { id } = req.usuario;
    console.log('ID del usuario:', id);

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const secret = speakeasy.generateSecret({
      name: 'Health Testing',
      issuer: 'Mi mismo',
    });
    console.log('Secreto generado:'/* , secret.base32 */);

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    console.log('Código QR generado:'/* , qrCodeUrl */);

    await Usuario.update({ secret2FA: secret.base32 }, { where: { id } });
    console.log('Secreto guardado en la base de datos');

    res.json({
      success: true,
      message: 'Escanea el código QR con tu aplicación de autenticación',
      qrCodeUrl,
      secret: secret.base32,
    });
  } catch (error) {
    console.error('Error en habilitar2FA:', error);
    res.status(500).json({
      success: false,
      message: 'Error al habilitar 2FA',
      error: error.message,
    });
  }
};
  export const verificar2FA = async (req, res) => {
    try {
      const { id } = req.usuario; // ID del usuario autenticado
      const { token } = req.body; // Código OTP introducido por el usuario
  
      // Obtener el secreto del usuario desde la base de datos
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
  
      // Verificar el código OTP
      const esValido = speakeasy.totp.verify({
        secret: usuario.secret2FA, // Secreto almacenado en la base de datos
        encoding: 'base32',        // Formato del secreto
        token,                     // Código OTP introducido por el usuario
      });
  
      if (!esValido) {
        return res.status(400).json({ success: false, message: 'Código OTP no válido' });
      }
  
      // Si el código es válido, marcar al usuario como verificado
      await Usuario.update({ estaVerificado2FA: true }, { where: { id } });
  
      res.json({
        success: true,
        message: 'Código OTP verificado correctamente',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al verificar 2FA',
        error: error.message,
      });
    }
  };
  
  export const protegerRuta = async (req, res, next) => {
    try {
      const { id } = req.usuario; // ID del usuario autenticado
  
      // Obtener el usuario desde la base de datos
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
  
      // Verificar si el usuario tiene 2FA habilitado
      if (usuario.secret2FA && !usuario.estaVerificado2FA) {
        return res.status(403).json({
          success: false,
          message: 'Se requiere verificación de 2FA',
        });
      }
  
      // Si todo está bien, continuar con la siguiente función
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al proteger la ruta',
        error: error.message,
      });
    }
  };
  
  export const deshabilitar2FA = async (req, res) => {
    try {
      const { id } = req.usuario; // ID del usuario autenticado
  
      // Eliminar el secreto y deshabilitar 2FA
      await Usuario.update({ secret2FA: null, estaVerificado2FA: false }, { where: { id } });
  
      res.json({
        success: true,
        message: '2FA deshabilitado correctamente',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al deshabilitar 2FA',
        error: error.message,
      });
    }
  };