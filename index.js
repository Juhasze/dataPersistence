// module imports
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require('sequelize');
const app = express();
const router = express.Router();

// use json format for req body
app.use(bodyParser.json());


// connect to db
const sequelize = new Sequelize('Music', 'Emeric', null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: '/Users/emeri/Desktop/Week12Final/js-backend2-master/Chinook_Sqlite_AutoIncrementPKs.sqlite'
});

// define schema
const Artist = sequelize.define('Artist', {
      ArtistId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps: false
})

// API

app.get('/artist', (req,res) => {
    Artist.findAll().then(artists =>{ 
        res.json(artists)
    })
})

app.get('/artist/:id', (req, res) => {
    Artist.find(
        {
            where: {
                ArtistId: req.params.id
            }
        }
    ).then(artist => {
            res.json(artist)
    })
})

app.post('/artist', (req,res) => {
    Artist.create({
        Name: req.body.name
    })
    res.sendStatus(200)
})

// run server on port 3000
app.listen(3000, () => {
    console.log('server running')
})

module.exports = Artist;