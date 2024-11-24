import Resultado from '../models/resultado_model.js';
import Test from '../models/test_model.js';
import Usuario from '../models/usuario_model.js';

// Obtener todos los resultados
export const getResultados = async (req, res) => {
  try {
    const resultados = await Resultado.findAll({
      include: [Test, Usuario] // Incluye Test y Usuario relacionados
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un resultado por ID
export const getResultadoById = async (req, res) => {
  try {
    const resultado = await Resultado.findByPk(req.params.id, {
      include: [Test, Usuario]
    });
    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ error: 'Resultado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener resultados por usuario ID
export const getResultadosByUsuarioId = async (req, res) => {
    try {
      const resultados = await Resultado.findAll({
        where: { usuarioId: req.params.usuarioId },
        include: [Test]
      });
      res.json(resultados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Crear un nuevo resultado basado en las respuestas del test
export const createResultadoFromTest = async (req, res) => {
  try {
    const { usuarioId, respuestas } = req.body;

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { estado, deficiencias } = determinarEstadoFisicoYDeficiencias(respuestas);

    const nuevoResultado = await Resultado.create({
      usuarioId,
      estado,
      deficiencias: deficiencias.join(', '), // Guardar deficiencias como una cadena
      planchas: respuestas.planchas,
      abdominales: respuestas.abdominales,
      flexibilidad: respuestas.flexibilidad,
      velocidad: respuestas.velocidad,
      resistencia: respuestas.resistencia,
      tiempoDescanso: respuestas.tiempoDescanso
    });

    res.status(201).json(nuevoResultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Función para determinar el estado físico y deficiencias basado en las respuestas
const determinarEstadoFisicoYDeficiencias = (respuestas) => {
  let puntaje = 0;
  let deficiencias = [];

  const { planchas, abdominales, flexibilidad, velocidad, resistencia, tiempoDescanso } = respuestas;

  // Evaluar cada característica y asignar puntos
  if (planchas >= 30) puntaje += 2;
  else if (planchas >= 20) puntaje += 1;
  else deficiencias.push('planchas');

  if (abdominales >= 50) puntaje += 2;
  else if (abdominales >= 30) puntaje += 1;
  else deficiencias.push('abdominales');

  if (flexibilidad >= 9) puntaje += 2;
  else if (flexibilidad >= 7) puntaje += 1;
  else deficiencias.push('flexibilidad');

  if (velocidad >= 9) puntaje += 2;
  else if (velocidad >= 7) puntaje += 1;
  else deficiencias.push('velocidad');

  if (resistencia >= 9) puntaje += 2;
  else if (resistencia >= 7) puntaje += 1;
  else deficiencias.push('resistencia');

  if (tiempoDescanso >= 9) puntaje += 2;
  else if (tiempoDescanso >= 8) puntaje += 1;
  else deficiencias.push('tiempo de descanso');

  // Determinar el estado basado en el puntaje total
  let estado;
  if (puntaje >= 10) {
    estado = 'Excelente estado físico';
  } else if (puntaje >= 7) {
    estado = 'Buen estado físico';
  } else if (puntaje >= 4) {
    estado = 'Saludable';
  } else if (puntaje >= 2) {
    estado = 'Estado normal';
  } else {
    estado = 'Poco saludable';
  }

  return { estado, deficiencias };
};