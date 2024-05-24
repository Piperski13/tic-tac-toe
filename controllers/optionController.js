const fs = require('fs');

const options = JSON.parse(fs.readFileSync('./backend/currentOption.json','utf-8'));

exports.getOptions = (req,res)=>{
  res.status(200).json(options);
};
exports.saveOptions = (req,res)=>{
  const clientOptions = req.body;
  console.log(clientOptions);
  fs.writeFile('./backend/currentOption.json',JSON.stringify(clientOptions),(err)=>{
    if (err) {
      return res.status(500).send('Failed to save game state.');
    }
    res.status(200).json({clientOptions})
  })
};