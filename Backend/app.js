const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes.js')
const captainRoutes = require('./routes/captain.routes.js')

connectToDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send("hello")
})
app.use('/users', userRoutes)
app.use('/captains', captainRoutes)

module.exports = app;