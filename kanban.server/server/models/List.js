import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, required: true },
    creator: { type: Object, required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default List
