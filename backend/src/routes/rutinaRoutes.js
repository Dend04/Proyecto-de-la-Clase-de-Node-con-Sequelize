import express from 'express';
import { getRutinas, getRutinaById, createRutina, updateRutina, deleteRutina, getRutinasByUsuarioId, asignarRutina } from '../controllers/rutinaController.js';

const router = express.Router();

router.get('/rutinas', async (req, res) => {
    try {
      const rutinas = await getRutinas();
      res.status(200).json(rutinas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/rutina/:id', async (req, res) => {
    try {
      const rutina = await getRutinaById(req.params.id);
      if (!rutina) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }
      res.status(200).json(rutina);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/crearRutina', async (req, res) => {
    try {
      const rutina = await createRutina(req.body);
      res.status(201).json(rutina);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.put('/rutina/:id', async (req, res) => {
    try {
      const rutina = await updateRutina(req.params.id, req.body);
      res.status(200).json(rutina);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.delete('/rutinas/:id', async (req, res) => {
  try {
    await deleteRutina(req.params.id);
    res.status(200).json({ message: "Rutina eliminada satisfactoriamente" });
  } catch (error) {
    if (error.message === "Rutina no encontrada") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get('/rutina/usuario/:usuarioId', async (req, res) => {
  try {
    const rutinas = await getRutinasByUsuarioId(req.params.usuarioId);
    res.status(200).json(rutinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/asignarRutina', async (req, res) => {
  try {
    const { usuarioId, testId, porcentajeAciertos } = req.body;
    const resultado = await asignarRutina(usuarioId, testId, porcentajeAciertos);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;