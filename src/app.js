const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

//classe que faz a configuracao geral da aplicacao
class App{
  constructor(){
    this.app = express();
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use((request,response,next) => {
      response.header("Acess-Control-Allow-Origin", "*");
      response.header("Acess-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      response.header("Acess-Control-Allow-Headers","access, content-type, authorization, acept, origin, x-requested-with");

      this.app.use(cors());
      next();
    })
  }

  routes(){
    this.app.use(routes);
  }
}

module.exports = new App().app;