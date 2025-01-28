import express from 'express';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
dotenv.config();
const PORT=process.env.port;
const app = express();
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});