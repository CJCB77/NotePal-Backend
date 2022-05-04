//Define routers for tasks
const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => { 
  res.json({ tasks: ['Finish server', 'take out trash'] });
});


module.exports = router;

