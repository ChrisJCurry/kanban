import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class CommentsService {
  async getAllComments() {
    try {
      const res = await api.get('api/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getComments(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId + '/comments')
      AppState.comments = res.data
    } catch (err) {
      logger.error(err)
    }
  }
}
export const commentsService = new CommentsService()
