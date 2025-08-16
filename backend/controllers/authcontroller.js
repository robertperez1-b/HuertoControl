const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Importar modelo de usuario
const User = require('../models/User');

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario por username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // Generar token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si existe usuario
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ error: 'El usuario ya existe' });

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
