const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRouter');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.set ('view engine', 'ejs');
app.use('/', usersRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`));
