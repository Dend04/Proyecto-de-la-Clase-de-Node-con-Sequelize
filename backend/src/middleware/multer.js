import multer from "multer";
import path from "path";
import fs from 'fs';

const __dirname = path.resolve();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.resolve(__dirname, '..', 'backend/uploads/fotosPerfil'); // Ruta correcta
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crear la carpeta si no existe
    }
    cb(null, uploadDir); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  },
});

// Middleware para subir la imagen
export const uploadFotoPerfil = upload.single("fotoPerfil");