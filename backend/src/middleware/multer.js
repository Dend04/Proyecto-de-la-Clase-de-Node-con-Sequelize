import multer from "multer";
import path from "path";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

// Middleware para subir la imagen
export const uploadFotoPerfil = upload.single("fotoPerfil");