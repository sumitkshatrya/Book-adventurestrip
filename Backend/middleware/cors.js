// middleware/cors.js
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://book-adventurestrip.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('🔍 CORS check for origin:', origin);

    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    // Check if origin matches allowed list (exact match)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(' CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
