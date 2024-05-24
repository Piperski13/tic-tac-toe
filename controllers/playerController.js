const fs = require('fs');

const playerMove = JSON.parse(fs.readFileSync('./backend/currentPlayerMove.json','utf-8'));

exports.getPlayerMove = (req,res)=>{
  res.status(200).json(playerMove);
};
exports.savePlayerMove =  (req, res) => {
  let playerMove = req.body;
  console.log('Player move:', playerMove);
  fs.writeFile('./backend/currentPlayerMove.json',JSON.stringify(playerMove),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save player move.');
    }
  })
  res.status(200).json({ message: 'Player move received', data: req.body });
};