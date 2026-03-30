<<<<<<< HEAD
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
=======
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
dotenv.config();
const PORT=process.env.port;
const app = express();
app.use(express.json());
app.use(router);
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});