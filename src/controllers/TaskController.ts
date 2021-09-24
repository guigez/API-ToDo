import { Request, Response } from "express";
import { Task } from "../schemas/task";
import { BoardController } from "./BoardController";


class TaskController {
  /* Metodo responsavel por armazenar usuarios */
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

  /* Metodo responsavel por buscar um usuario com id */
  async findUserById(id: string){

  }
  
}

export { TaskController };
