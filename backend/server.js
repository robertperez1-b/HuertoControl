require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // asegúrate de la ruta

const app = express();
const PORT = process.env.PORT || 5000;

// Debug
console.log("MONGO_URI desde .env:", process.env.MONGO_URI);

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API HuertoControl funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});












































/*/require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

console.log("MONGO_URI desde .env:", process.env.MONGO_URI);

// Importar rutas
const authRoutes = require('./routes/auth');
const plagaRoutes = require('./routes/plagas');

// Inicializar Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB conectado'))
  .catch(err => console.error(' Error de conexión:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/plagas', plagaRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});
/*/
