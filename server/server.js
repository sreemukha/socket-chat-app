const path = require('path');
const express = require('express');


const port = process.env.PORT || 3000;
console.log(port);
if(port === 3000){
  var publicPath = path.join(__dirname,'..\\client');
} else {
  var publicPath = path.join(__dirname,'../client');
}
let app = express();

// static middleware to serve static html in client folder
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
