const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error(" MONGO_URI no está definido en .env");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" Conectado a MongoDB Atlas");
  } catch (err) {
    console.error(" Error de conexión:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
