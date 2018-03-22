const express = require("express");
const filmModel = require("../models/filmModel.js")

const api = express.Router();

//Middleware para habilitar CORS
function enableCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

api.get('/films', enableCORS, (req, res) => {
  // let films = filmModel.getFilms() || { response: 'No hay datos' };
  let films = {};
  filmModel.getFilms().then((films) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(films));
  });
});

api.get('/films/add', enableCORS, (req, res) => {
  if (req.query.film) {
    let film = JSON.parse(req.query.film);
    filmModel.save(film)
    res.setHeader('Content-Type', 'application/json');
    res.send(req.query.film)
  }
});

module.exports = api;
