const moment = require('moment');


const generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};


const generateLocationMessage = (from,lat,long) => {
  let url = `https://www.google.com/maps?q=${lat},${long}`;
  return {
    from,
    url,
    createdAt: moment().valueOf()
  }
};

module.exports = {generateMessage, generateLocationMessage}
