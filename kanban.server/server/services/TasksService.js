import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TasksService {
  async find(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
    return tasks
  }

  async getTaskById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async getCommentsByTaskId(id) {
    const comments = await dbContext.Comments.find({ taskId: id })
    if (!comments) {
      throw new BadRequest('ivalid task Id')
    }
    return comments
  }

  async createTask(newTask) {
    try {
      const res = await dbContext.Tasks.create(newTask)
      return res
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteTask(taskId, userId) {
    const tasksToDelete = await dbContext.Tasks.findOneAndDelete({ _id: taskId, creatorId: userId })
    if (!tasksToDelete) {
      throw new BadRequest("You're not the creator or you have the wrong lists ID")
    }

    return tasksToDelete
  }

  async move(taskId, task) {
    const taskToMove = await dbContext.Tasks.findByIdAndUpdate(taskId, task, { new: true })

    if (!taskToMove) {
      throw new BadRequest('invalid task or list id')
    }
    return taskToMove
  }
}

export const tasksService = new TasksService()
