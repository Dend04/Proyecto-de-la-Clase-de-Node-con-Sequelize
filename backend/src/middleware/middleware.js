import jwt from 'jsonwebtoken';

export const middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pasa el control al siguiente middleware
};

export const verificarToken = (rolRequerido) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token no válido o expirado' });
      req.usuario = decoded;

      // Verificar el rol del usuario
      if (rolRequerido && req.usuario.rol !== rolRequerido) {
        return res.status(403).json({ error: 'Acceso denegado. Rol no autorizado.' });
      }

      next();
    });
  };
};