const express = require('express');
const router = express.Router();
const plagaController = require('../controllers/plagaController');
const { verifyToken } = require('../middlewares/auth');

// Subida de imágenes y registro
router.post('/', 
  verifyToken,
  plagaController.upload.single('imagen'),
  plagaController.registrarPlaga
);

// Obtener plagas del usuario
router.get('/', verifyToken, plagaController.obtenerPlagas);

module.exports = router;
