import { Router, Request, Response  } from "express";
import { BoardController } from "./controllers/BoardController";
import { TaskController } from "./controllers/TaskController";
import { UserController } from "./controllers/UserController";
import { ensureAuthenticate } from "./middleware/ensureAuthenticate";
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

/*Rota para lista boards de um usuario */
router.get('/user/listBoards/:userId',ensureAuthenticate, userController.listBoardsByUser)

/* Rota para listar Tasks de um Board */
router.get('/board/listTask/:boardId',ensureAuthenticate, boardController.listTasks); //ok

/* Rotas para a criacao de usuario, board e task */
router.post('/user', userController.store); //ok

router.post('/board',ensureAuthenticate, boardController.store); //ok

router.post('/task',ensureAuthenticate, taskController.store); //ok

/* Rotas para a atualizacao de task e board */
router.put('/task/status/:taskId',ensureAuthenticate, taskController.updateStatus); //ok
router.put('/task/update/:taskId',ensureAuthenticate, taskController.update); //ok

router.put('/board/update/:boardId',ensureAuthenticate, boardController.update); //ok

/*Rota para invite de usuario em um board */
router.put('/invite',ensureAuthenticate, userController.invite); //ok

/* Rotas para deletar task e board */ 
router.delete('/task/delete/:taskId/:boardId',ensureAuthenticate, taskController.delete); //ok

router.delete('/board/delete/:boardId',ensureAuthenticate, boardController.delete); //ok

/*Rotas para o Login */
router.post('/login', authenticate.login);
export { router }