const express = require('express');
const fs = require('fs');
const path = require('path');
const optionRouter = require('./routes/optionRoutes');
const playerRouter = require('./routes/playerRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

const loadPage = (req,res)=>{
  res.status(200).sendFile(__dirname,'public','index.html');
};

app.get('/', loadPage);

// first version of the logic
// app.get('/option', getOptions);
// app.post('/option', saveOptions);

// app.get('/player', getPlayerMove);
// app.post('/player',savePlayerMove);

app.use('/option',optionRouter);
app.use('/player',playerRouter);
module.exports = app;