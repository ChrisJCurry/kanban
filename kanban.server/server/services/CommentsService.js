import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

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

  async createComment(newComment) {
    try {
      const res = await dbContext.Comments.create(newComment)
      return res
    } catch (err) {
      logger.error(err)
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
