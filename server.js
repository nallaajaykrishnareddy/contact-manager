const express = require('express');
const cors    = require('cors');
const app = express();
const connectDB = require('./config/db');
//dbconfig
connectDB();
//Init Middleware
app.use(express.json({ extended: false}));
app.use(cors());
//define routes
app.use('/api/users',require('./routes/user'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contact'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`) );