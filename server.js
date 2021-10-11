// require statments to use express.js
const express = require('express');

//request for db.json - route to request data
// this is the test json file to connect back to front end
const { db } = require('./db/db.json');

// adding the port for HEROKU - runs on 80 PORT
const port = process.env.port || 3001




//instantiate server
const app = express();

//route for data from db.json - WORKING!!
app.get('/api/db', (req,res) => {
    res.send('Working!');
});

// app.get('/api/db', (req, res) => {
//     let results = db;
//     console.log(req.query)
//     res.json(results);
// });


// listen method for requests to server
//n.b. - heroku runs on 80 PORT so this might cause issues- adapt when needed
app.listen(port, () => {
    console.log('API server now on port {port}!');
});
