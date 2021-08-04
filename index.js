const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

const app = express();

// Handlebars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Homepage route 
app.get('/', (req, res) => res.render('index'))

// Parse the body
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


// Mortgage api 
app.use('/api/mortgage', require('./routes/api/mortgage'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));