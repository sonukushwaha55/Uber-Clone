const mongoose = require('mongoose')

async function connectToDb() {
  try {
      await mongoose.connect(process.env.DB_URL)
          console.log("MongoDB connected");
          
          
  } catch (error) {
    console.log("mongoDB connection failed" ,error);
    process.exit(1)
    
  }
}

module.exports = connectToDb;