const express = require("express");
const filmModel = require("../models/filmModel.js")

const api = express.Router();

//Middleware para habilitar CORS
function enableCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}

api.get('/films', enableCORS, (req, res) => {
  let films = {};
  filmModel.all().then((films) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(films));
  });
});

api.post('/films', enableCORS, (req, res) => {
  if (req.body.film) {
    let film = JSON.parse(req.body.film);
    filmModel.save(film).then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.send(film);
    }, (error) => {
      console.log('La promesa ha lanzado el siguiente error:', error)
    });
  }
});

api.put('/films/:id', enableCORS, (req, res) => {
  if (req.params.id && req.query.film) {
    let film = JSON.parse(req.query.film);
    filmModel.update(req.params.id, film)
    res.setHeader('Content-Type', 'application/json');
    res.send(req.query.film)
  }
});

api.delete('/films/:id', enableCORS, (req, res) => {
  if (req.params.id) {
    filmModel.delete(req.params.id).then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.send({ action: 'delete', filmId: req.params.id, message: 'The film has been removed successfully.' })
    });
  }
  else {
    res.send({ action: 'delete', actionStatus: false, message: 'You must pass an id by url' })
  }
});

module.exports = api;
