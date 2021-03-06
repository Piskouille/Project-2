const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => console.log("Mongodb is connected"));

mongoose.connection.on("error", () => console.log("DB connection error"));

