//Connection to database
const db = require('../db');

const getAllTasks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks');
    res.json(result.rows);
  }
  catch(err) {
    console.log(err.message);
  }
}

const postTask = async (req, res) => {
  try {
    const task = req.body;
    const result = await db.query('INSERT INTO tasks (title) VALUES ($1) Returning * ', [task.title]);
    res.json(result.rows[0]);
  }
  catch(err) {
    console.log(err.message)
    res.json({message:'Task not added'})
  }
  
}

const updateTask = async (req, res) => {
  const {id} = req.params
  const {title,completed} = req.body
  try {
    if(title) {
      const result = await db.query('UPDATE tasks SET title = $1 WHERE id = $2 Returning *', [title,id])
      if(result.rowCount === 0) {
        return res.status(404).json({message:'Task not found'})
      }
      return res.json(result.rows[0]);
    }
    if(completed) {
      const result = await db.query('UPDATE tasks SET completed = $1 WHERE id = $2 Returning *', 
        [completed,id])
      if(result.rowCount === 0) {
        return res.status(404).json({message:'Task not found'})
      }
      return res.json(result.rows[0]);
    }
  }
  catch(err) {
    console.log(err)
  }
}

const deleteTask = async (req, res) => {
  const {id} = req.params
  try {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 Returning *', [id])
    if(result.rowCount === 0) {
      return res.status(404).json({message:'Task not found'})
    }
    //204 means server doesnt need to return anything
    res.sendStatus(204);
  }
  catch(err) {
    console.log(err.message)
  }

}

const getTaskById = async (req, res) => {
  const {id} = req.params
  try{
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id])
    if(result.rowCount === 0) {
      return res.status(404).json({message:'Task not found'})
    }
    res.json(result.rows[0]);
  }
  catch(err) {
    console.log(err.message);
  }
}

module.exports = { getAllTasks, postTask, updateTask, deleteTask, getTaskById };





