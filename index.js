const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mortgage api 
app.use('/api/mortgage', require('./routes/api/mortgage'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));