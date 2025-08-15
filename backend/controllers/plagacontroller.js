const Plaga = require('../models/Plaga');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

exports.upload = multer({ storage });

exports.registrarPlaga = async (req, res) => {
  try {
    const { nombre, cultivo, intensidad, notas } = req.body;
    const imagenPath = req.file ? `/uploads/${req.file.filename}` : '';

    const plaga = new Plaga({
      nombre,
      cultivo,
      intensidad,
      notas,
      imagen: imagenPath,
      userId: req.userId // Asegúrate de pasar el ID del usuario desde el middleware de autenticación
    });

    await plaga.save();
    res.status(201).json(plaga);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerPlagas = async (req, res) => {
  try {
    const plagas = await Plaga.find({ userId: req.userId });
    res.json(plagas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener plagas' });
  }
};
