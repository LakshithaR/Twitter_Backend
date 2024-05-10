const mongoose = require("mongoose");

const connectdb = (url) => {
  return mongoose
    .connect(url, {
      dbName: "Twitter",
    })
   
};



module.exports = connectdb;