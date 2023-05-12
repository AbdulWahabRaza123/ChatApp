const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("This is db url ", process.env.DB);
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected ", conn.connection.host);
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectDB;
