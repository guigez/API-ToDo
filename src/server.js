const app = require('./app');

var PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
  console.log(`Listing on port ${PORT}`);
});
