const Router = require('express');

const routes = Router();

//rota para teste
routes.post('/users', (request, response) => {
  return response.status(201).send("ok");
});

module.exports = routes;