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

  async create(taskData) {
    try {
      const res = await api.post('api/tasks', taskData)
      AppState.tasks[taskData.listId].unshift(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }
}
export const tasksService = new TasksService()
