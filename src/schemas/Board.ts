import { mongoose } from "../database/config";

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    require: false,
  }],
})

const Board = mongoose.model('Board', BoardSchema);

export { Board }