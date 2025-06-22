import cors from 'cors';

const PORT = process.env.PORT || 5000;

const corsMiddleware = cors({
  origin: [
    `http://127.0.0.1:${PORT}`,
    `http://localhost:${PORT}`,
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;