import express from 'express';
import { addRespuesta, deleteRespuesta, getRespuestas, updateRespuesta } from '../controllers/respuestaController.js';


const router = express.Router();

router.get('/respuestas', getRespuestas);
router.post('/crearRespuestas', addRespuesta);
router.delete('/respuestaBorrar/:id', deleteRespuesta);
router.put('/respuesta/:id',updateRespuesta)


export default router;