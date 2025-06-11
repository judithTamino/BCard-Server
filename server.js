import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectToDB from './database/mongodb.js';
import userRouter from './routes/user.routes.js';

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('/public'));

// api endpoints
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectToDB();
});