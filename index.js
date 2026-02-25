require('dotenv').config();
const express = require('express');
const cors = require('cors');

const tasksRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server bezi na http://localhost:${process.env.PORT}`);
});