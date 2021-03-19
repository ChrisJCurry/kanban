import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Comment } from '../models/Comment'
import { tasksService } from './TasksService'

class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data.map(l => new Comment(l))
    } catch (error) {
      logger.log(error)
    }
  }

  async create(commentData) {
    try {
      const res = await api.post('api/comments', commentData)
      const comments = AppState.comments[commentData.taskId] || []
      AppState.comments[commentData.taskId] = [res.data, ...comments]
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(comment) {
    try {
      const res = await api.delete('api/comments/' + comment._id)

      tasksService.getCommentsByTaskId(comment.taskId)
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }
}
export const commentsService = new CommentsService()
