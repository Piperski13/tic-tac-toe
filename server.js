const app = require('./app');
const port = 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is listening for a request...`);
});