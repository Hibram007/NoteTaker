const { notStrictEqual } = require('assert');
const express = require('express');
const fs = require("fs");
const path = require('path')
// Specifically for Heroku Deployment
const port = process.env.port || 3001

// initialize an express application
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES FOR CRUD METHODS

// READ METHOD route - get
app.get('/api/notes', (req, res) => {
    fs.readFile('db\db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))
    })
})

// CREATE Method route- POST
app.post('/api/notes', (req, res) => {
    fs.readFile('db\db.json', 'utf8', (err, data) => {
        const dbData = JSON.parse(data);
        req.body.id = dbData.length + 1;
        dbData.push(req.body);
        fs.writeFile('db\db.json', JSON.stringify(dbData), (err) => {
            res.send('Note has been added!')
        })
    })
})
// DELETE Methods - Destroy
app.delete("/api/notes/:id", (req, res) => {
             fs.readFile('db\db.json', 'utf8', (err, data) => {
                 const dbData = JSON.parse(data); 
                const filteredNotes = dbData.filter(function(note) {
                    return note.id != req.params.id;
           })
             fs.writeFile('db\db.json', JSON.stringify(filteredNotes), (err) => {
                      res.send('Note has been added!')
                 })
            })
});
// html  routes - For pre-made module 11 code
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, 'public\notes.html'));
    })
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public\index.html'));
    })

// Link to connect DB and Server ( Starts it all)
    app.listen(process.env.PORT || 3001, () => {
        console.log('App is now listening to PORT 3001!')
    })
