import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { listsService } from './ListsService'
import { Task } from '../models/Task'

class TasksService {
  async getAllTasks() {
    try {
      const res = await api.get('api/tasks')
      AppState.tasks = res.data.map(t => new Task(t))
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

  async getCommentsByTaskId(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId + '/comments')
      AppState.comments[taskId] = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async create(taskData) {
    try {
      const res = await api.post('api/tasks', taskData)
      const tasks = AppState.tasks[taskData.listId] || []
      AppState.tasks[taskData.listId] = [res.data, ...tasks]
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(task) {
    try {
      const res = await api.delete('api/tasks/' + task._id)

      listsService.getTasksByListId(task.listId)
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async move(task, listId) {
    try {
      const oldId = task.listId
      task.listId = listId
      delete AppState.tasks[oldId][task]
      const res = await api.put('/api/tasks/' + task._id, task)
      listsService.getTasksByListId(task.listId)
      listsService.getTasksByListId(oldId)
      AppState.tasks[listId] = res.data
      return res.data
    } catch (err) {
      logger.error(err)
    }
  }
}
export const tasksService = new TasksService()
