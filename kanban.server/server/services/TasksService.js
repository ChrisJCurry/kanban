import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

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

  async createTask(newBoard) {
    try {
      const res = await dbContext.Tasks.create(newBoard)
      return res
    } catch (err) {
      console.error(err)
    }
  }

  async deleteTask(taskId, userId) {
    const tasksToDelete = await dbContext.Tasks.findOneAndDelete({ _id: taskId, creatorId: userId })
    if (!tasksToDelete) {
      throw new BadRequest("You're not the creator or you have the wrong lists ID")
    }

    return tasksToDelete
  }
}

export const tasksService = new TasksService()
