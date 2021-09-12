const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

//classe que faz a configuracao geral da aplicacao
class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.routes();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(){
    this.app.use(routes);
  }
}

module.exports = new App().app;