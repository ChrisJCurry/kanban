import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async find(query = {}) {
    const lists = await dbContext.Lists.find(query)
    return lists
  }

  async getListById(id) {
    const list = await dbContext.Lists.findById(id)
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async getTasksByListId(id) {
    const tasks = await dbContext.Tasks.find({ listId: id })
    if (!tasks) {
      throw new BadRequest(`${id}`)
    }

    return tasks
  }

  async createList(newList) {
    try {
      const res = await dbContext.Lists.create(newList)
      return res
    } catch (err) {
      throw new BadRequest('invalid list')
    }
  }

  async deleteList(listsId, userId) {
    const listsToDelete = await dbContext.Lists.findOneAndDelete({ _id: listsId, creatorId: userId })
    if (!listsToDelete) {
      throw new BadRequest("You're not the creator or you have the wrong lists ID")
    }

    return listsToDelete
  }
}

export const listsService = new ListsService()
