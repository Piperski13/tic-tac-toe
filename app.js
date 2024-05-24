const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

const options = JSON.parse(fs.readFileSync('./backend/currentOption.json','utf-8'));
const playerMove = JSON.parse(fs.readFileSync('./backend/currentPlayerMove.json','utf-8'));

const loadPage = (req,res)=>{
  res.status(200).sendFile(__dirname,'public','index.html');
};
const getOptions = (req,res)=>{
  res.status(200).json(options);
};
const saveOptions = (req,res)=>{
  const clientOptions = req.body;
  console.log(clientOptions);
  fs.writeFile('./backend/currentOption.json',JSON.stringify(clientOptions),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save game state.');
    }
    res.status(200).json({clientOptions})
  })
};
const getPlayerMove = (req,res)=>{
  res.status(200).json(playerMove);
};
const savePlayerMove =  (req, res) => {
  let playerMove = req.body;
  console.log('Player move:', playerMove);
  fs.writeFile('./backend/currentPlayerMove.json',JSON.stringify(playerMove),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save player move.');
    }
  })
  res.status(200).json({ message: 'Player move received', data: req.body });
}

app.get('/', loadPage);

// app.get('/option', getOptions);
// app.post('/option', saveOptions);

// app.get('/player', getPlayerMove);
// app.post('/player',savePlayerMove);

app.route('/option').get(getOptions).post(saveOptions);
app.route('/player').get(getPlayerMove).post(savePlayerMove);

const port = 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is listening for a request...`);
});