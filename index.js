const express = require("express");
const exphbs = require("express-handlebars");
const data = require('./Data')

const app = express();


// Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage Route
app.get("/", (req, res) => 
  res.render("index", {
    data
  })
);

// Mortgage api
app.use("/api/mortgage", require("./routes/api/mortgage"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
