const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname,'..\\client');
const port = process.env.PORT || 3000;
let app = express();

// static middleware to serve static html in client folder
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
