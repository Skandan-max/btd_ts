import express from 'express';
var mongoose = require("mongoose");
import dotenv from '.env';

dotenv.config();

const app = express();
const DBURL: string = process.env.DBURL || '';
const PORT: number = parseInt(process.env.PORT || '3000', 10);

mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err:Error) => {
    console.error("Error connecting to MongoDB:", err);
  });


  app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});