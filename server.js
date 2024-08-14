const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

require("dotenv").config();

const app = express();

const auth = require("./routes/user.route.js")

connectDB();

//Middleware
app.use(cors());
app.use(express.json({extended: false}))


//Routes

app.use('/api/auth', auth );


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on Port ${PORT}`)});