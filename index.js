const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/url.route')

// connect to the database

connectDB();
app.use(cors());
app.use(express.json({extended: false}));


app.use('/',routes);
const PORT = 8081;

app.listen(PORT,()=>{
    console.log('listening on port ',PORT);
});