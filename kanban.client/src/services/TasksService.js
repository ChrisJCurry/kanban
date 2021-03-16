import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class TasksService {
  async getAllTasks() {
    try {
      const res = await api.get('api/tasks')
      AppState.boards = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getActiveTasks(boardId) {
    try {
      const res = await api.get('api/boards/' + boardId + '/tasks')
      AppState.tasks = res.data
    } catch (err) {
      logger.error(err)
    }
  }
}
export const tasksService = new TasksService()
