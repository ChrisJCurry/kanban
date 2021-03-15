import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Comment = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true },
    taskId: { type: ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Comment
