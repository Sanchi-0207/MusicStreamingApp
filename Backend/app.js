const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const userroutes=require('./routes/userRoutes');
app.use(userroutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});