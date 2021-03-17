import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class ListsService {
  async getAllLists() {
    try {
      const res = await api.get('api/lists')
      AppState.boards = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getActiveLists(boardId) {
    try {
      const res = await api.get('api/boards/' + boardId + '/lists')
      AppState.lists = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async create(listData) {
    try {
      const res = await api.post('api/lists', listData)
      AppState.lists.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }
}
export const listsService = new ListsService()
