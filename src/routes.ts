import { Router, Request, Response  } from "express";
import { BoardController } from "./controllers/BoardController";
import { TaskController } from "./controllers/TaskController";
import { UserController } from "./controllers/UserController";
import { Authenticate } from "./services/Authenticate";

const router = Router();
const userController = new UserController();
const boardController = new BoardController();
const taskController = new TaskController();
const authenticate = new Authenticate();
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
router.get('/listUsers', userController.listUsers); //ok

router.get('/listBoards', boardController.listBoards); //ok

/* Rota para listar Tasks de um Board */
router.get('/board/listTask/:boardId', boardController.listTasks); //gui

/* Rotas para a criacao de usuario, board e task */
router.post('/user', userController.store); //ok

router.post('/board', boardController.store); //ok

router.post('/task', taskController.store); //ok

/* Rotas para a atualizacao de task e board */
router.put('/task/status/:taskId', taskController.updateStatus); //ok
router.put('/task/update/:taskId', taskController.update); //ok

router.put('/board/update/:boardId', boardController.update); //ok

/*Rota para invite de usuario em um board */
router.put('/invite', userController.invite); //ok

/* Rotas para deletar task e board */ 
router.delete('/task/delete/:taskId', taskController.delete); //ok

router.delete('/board/delete/:boardId', boardController.delete); //ok

/*Rotas para o Login */
router.post('/login', authenticate.login);
export { router }