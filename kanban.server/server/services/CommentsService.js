import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async find(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }

  async getCommentById(id) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async createComment(newBoard) {
    try {
      const res = await dbContext.Comments.create(newBoard)
      return res
    } catch (err) {
      console.error(err)
    }
  }

  async deleteComment(commentId, userId) {
    const commentsToDelete = await dbContext.Comments.findOneAndDelete({ _id: commentId, creatorId: userId })
    if (!commentsToDelete) {
      throw new BadRequest("You're not the creator or you have the wrong lists ID")
    }

    return commentsToDelete
  }
}

export const commentsService = new CommentsService()
