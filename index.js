const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mortgage api 
app.use('/api/mortgage', require('./routes/api/mortgage'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));