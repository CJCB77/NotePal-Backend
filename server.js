const express = require('express');
const morgan = require('morgan');


require('dotenv').config();

const app = express();

//Using middlewares
app.use(morgan('dev'));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.json({message:"Success"})
})