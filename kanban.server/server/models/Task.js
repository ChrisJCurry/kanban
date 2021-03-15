import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true },
    listId: { type: ObjectId, ref: 'List', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Task
