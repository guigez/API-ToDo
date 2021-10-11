import { Router } from "express";
import { BoardController } from "./controllers/BoardController";
import { TaskController } from "./controllers/TaskController";
import { UserController } from "./controllers/UserController";

const router = Router();
const userController = new UserController();
const boardController = new BoardController();
const taskController = new TaskController();

/*
*   GET     => Buscar uma informacao
*   POST    => Inserir (criar) uma informacao
*   PUT     => Alterar uma informacao
*   DELETE  => Remover um dado 
*   PATCH   => Alterar uma informacao especifica
*/

/* Rotas para a criacao de usuario, boards e task */
router.post('/users', userController.store);

router.post('/boards', boardController.store);

router.post('/tasks', taskController.store);

/* Rotas para a atualizacao de tasks */
/* Rotas para deletar boards e taks */

/* Rotas para a listagem de usuarios e boards para teste */
router.get('/listUsers', userController.listUsers);

router.get('/listBoards', boardController.listBoards);


export { router }