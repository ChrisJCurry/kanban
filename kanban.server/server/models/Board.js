import mongoose from 'mongoose'
import List from './List'
import Task from './Task'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true },
    lists: [
      List
    ],
    tasks: [
      Task
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Board
