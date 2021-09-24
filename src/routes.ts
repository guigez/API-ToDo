import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();
const userController = new UserController();

/*
*   GET     => Buscar uma informacao
*   POST    => Inserir (criar) uma informacao
*   PUT     => Alterar uma informacao
*   DELETE  => Remover um dado
*   PATCH   => Alterar uma informacao especifica
*/

router.post('/users', userController.store);

export { router }