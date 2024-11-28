import express from 'express';
import { getRespuestas, getRespuestaById, createRespuesta, updateRespuesta, deleteRespuesta } from '../controllers/respuestaController.js';

const router = express.Router();

router.get('/respuestas', async (req, res) => {
  try {
    const respuestas = await getRespuestas();
    res.status(200).json(respuestas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
});

router.get('/respuesta/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await getRespuestaById(id);
    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
});

router.post('/crearRespuesta', async (req, res) => {
  try {
    const respuesta = await createRespuesta(req.body);
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la respuesta' });
  }
});

router.put('/respuesta/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await updateRespuesta(id, req.body);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
});

router.delete('/respuesta/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRespuesta(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la respuesta' });
  }
});

export default router;