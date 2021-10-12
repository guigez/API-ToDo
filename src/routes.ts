import { Router, Request, Response  } from "express";
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

/* Rota teste */
router.get('/', (req: Request, res: Response) => {
  return res.json({message: "It's Okay"});
});

/* Rotas para a listagem de usuarios e boards para teste */
router.get('/listUsers', userController.listUsers);

router.get('/listBoards', boardController.listBoards);

/* Rota para listar Tasks de um Board */
router.get('/:boardId', boardController.listTasks);

/* Rotas para a criacao de usuario, board e task */
router.post('/user', userController.store);

router.post('/board', boardController.store);

router.post('/task', taskController.store);

/* Rotas para a atualizacao de task e board */
router.put('/:taskId', taskController.update);

router.put('/:boardId', boardController.update)

/* Rotas para deletar task e board */
router.delete('/:taskId', taskController.delete);

router.delete('/:boardId', boardController.delete);





export { router }