const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

const options = JSON.parse(fs.readFileSync('./backend/currentOption.json','utf-8'));
const playerMove = JSON.parse(fs.readFileSync('./backend/currentPlayerMove.json','utf-8'));

app.get('/',(req,res)=>{
  res.status(200).sendFile(__dirname,'public','index.html');
});

app.get('/option',(req,res)=>{
  res.status(200).json(options);
});

app.get('/player',(req,res)=>{
  res.status(200).json(playerMove);
});


app.post('/options',(req,res)=>{
  const clientOptions = req.body;
  console.log(clientOptions);
  fs.writeFile('./backend/currentOption.json',JSON.stringify(clientOptions),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save game state.');
    }
    res.status(200).json({clientOptions})
  })
});

app.post('/player', (req, res) => {
  let playerMove = req.body;
  console.log('Player move:', playerMove);
  fs.writeFile('./backend/currentPlayerMove.json',JSON.stringify(playerMove),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save player move.');
    }
  })
  res.status(200).json({ message: 'Player move received', data: req.body });
});

const port = 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is listening for a request...`);
});