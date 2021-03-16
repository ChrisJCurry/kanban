import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { listsService } from './ListsService'

class BoardsService {
  async getAllBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.boards = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getUsersBoards(userId) {
    const usersBoards = []
    for (let i = 0; i < AppState.boards.length; i++) {
      if (AppState.boards[i].creatorId === userId) {
        usersBoards.push(AppState.boards[i])
      }
    }
    return usersBoards
  }

  async getBoardById(boardId) {
    try {
      AppState.board = {}
      const res = await api.get('api/boards/' + boardId)
      AppState.board = res.data
      listsService.getActiveLists(boardId)
    } catch (err) {
      logger.error(err)
    }
  }

  async createBoard(boardData) {
    try {
      const res = await api.post('api/boards', boardData)
      AppState.boards.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async editBoard(boardData) {
    try {
      await api.put('api/boards/' + boardData._id, boardData)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteBoard(boardId, routePath) {
    const res = window.confirm('are you sure you want to delete your board?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/boards/' + boardId)
      this.getAllBoards()
    } catch (err) {
      logger.error(err)
    }
  }
}
export const boardsService = new BoardsService()