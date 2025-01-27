import express from 'express';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(userRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});