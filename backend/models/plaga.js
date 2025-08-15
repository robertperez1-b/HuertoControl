const mongoose = require('mongoose');

const PlagaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  cultivo: {
    type: String,
    required: true,
    enum: ['tomate', 'lechuga', 'pimiento', 'zanahoria', 'otro']
  },
  intensidad: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notas: {
    type: String,
    trim: true
  },
  imagen: {
    type: String
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Plaga', PlagaSchema);
