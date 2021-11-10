import { Request, Response } from "express";
import { Board } from "../schemas/Board";
import { Task } from "../schemas/task";
import { BoardController } from "./BoardController";


class TaskController {
  /* Metodo responsavel por armazenar task em um board
  *   JSON: {
  *	    "title": "<titulo>",
  *     "status": "<tasks><doing><completed>",
 	*     "boardId": "<id do board em que a task ira pertencer"
  *   }
  *   
  *  Return: task criada, board e mensagem
  */
  async store(request: Request, response: Response) {

    const { title, status, boardId } = request.body;
  
    const task = new Task({
      title,
      status,
      board: boardId,
    });

    try {
      const boardController = new BoardController(); 
      const board = await boardController.updateBoardTasks(boardId, task._id)

      await task.save();

      return response.status(201).json({task, board , message: "Task added successfully"});

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Task not store" });
    }
  }

  /* Metodo para att uma task */
  async updateStatus(request: Request, response: Response){
    try {
      const { status } = request.body;
      const task = await Task.findByIdAndUpdate(request.params.taskId, {status}, {new: true});

      return response.status(201).json({task, message: "Board Updated successfully" });

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Task not store" });
    }
  }

  async update(request: Request, response: Response){
    try {
      const { title } = request.body;
      const task = await Task.findByIdAndUpdate(request.params.taskId, {title}, {new: true});

      return response.status(201).json({task, message: "Task Updated successfully" });

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Task not store" });
    }
  }

  /* Metodo para deletar uma task */
  async delete(request: Request, response: Response){
    const { taskId } = request.params;
    const { boardId } = request.body;
    const board = await Board.findByIdAndUpdate(boardId, {$pull: {tasks:taskId}}, {new:true});
    await Task.findByIdAndDelete(taskId);

    return response.status(200).json({board, message: "Removed Task with Sucess" });

  }

  /* Metodo responsavel por buscar uma task com id */
  async findTaskById(id: string){

  }
  
}

export { TaskController };
