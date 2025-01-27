require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
const app = express();
const PORT = process.env.PORT || 5000;

// Lista de dominios permitidos
const whitelist = [
  'http://localhost:3000',
  'https://sushi-chatbot-hazel.vercel.app/',
  process.env.FRONTEND_URL // Puedes añadirlo en tu .env
];

// Configuración CORS con validación
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como las herramientas de desarrollo)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 3600 // Cache preflight request for 1 hour
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Manejo de errores CORS
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      error: 'Origin not allowed'
    });
  } else {
    next(err);
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sushi-chatbot')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});