import mongoose from "mongoose";

mongoose.connect("mongodb+srv://todo:1234@cluster0.ub8dr.mongodb.net/ToDoApplication?retryWrites=true&w=majority")
mongoose.Promise = global.Promise;

export { mongoose }