const path = require('path');
const express = require('express');



const port = process.env.PORT || 3000;
if(port === 3000){
  const publicPath = path.join(__dirname,'..\\client');
} else{
  const publicPath = path.join(__dirname,'../client');
}
let app = express();

// static middleware to serve static html in client folder
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
