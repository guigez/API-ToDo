import { mongoose } from "../database/config";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  board: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "tasks",
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
  },
})

const Task = mongoose.model('Task', TaskSchema);

export { Task }