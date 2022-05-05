const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
//Routes
const taskRoutes = require('./routes/task.routes');

//Env variables
require('dotenv').config();

const app = express();

//Using middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use(taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the NotePal API' });
});

const startApp =  async () => {
  try{
    await db.connect()
      .then(() => console.log("Connected to database"))
      .then(() => app.listen(process.env.PORT, 
          () => console.log(`Server started on port ${process.env.PORT}`)))
      .catch(err => console.log(err));
  }
  catch(err) {
    console.log(err);
  }
}

startApp();