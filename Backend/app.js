import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import router from './routes/userRoutes.js';
const PORT=process.env.port;
console.log("App Started");
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use("/assets",express.static("assets"));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});