import express from 'express';
import 'dotenv/config';
import connectToDB from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import corsMiddleware from './middlewares/cors.middleware.js';
import errorHandler from './middlewares/error.middleware.js';

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(express.static('/public'));

// api endpoints
app.use('/users', userRouter);

// error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectToDB();
});