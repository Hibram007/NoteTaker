// require statments to use express.js
const express = require('express');

//request for db.json - route to request data
// this is the test json file to connect back to front end
const { db } = require('./db/db.json');

// adding the port for HEROKU - runs on 80 PORT
const PORT = process.env.PORT || 3001

//instantiate server
const app = express();

function filterByQuery(query, dbArray) {
    let filteredResults = dbArray;
    if (query.title) {
        filteredResults = filteredResults.filter(db => db.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(db => db.text === query.text);
      }
      return filteredResults;
    }

//route for data from db.json - WORKING!!
// query added to search for specif data in array
app.get('/api/db', (req,res) => {
    let results = db;
   if (req.query) {
       results = filterByQuery(req.query, results);
   }
    res.json(results);
});

// listen method for requests to server
//n.b. - heroku runs on 80 PORT so this might cause issues- adapt when needed
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
