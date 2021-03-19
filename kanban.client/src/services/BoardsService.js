import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { listsService } from './ListsService'
import { Board } from '../models/Board'

class BoardsService {
  async getAllBoards() {
    try {
      const res = await api.get('api/boards')
      // AppState.boards = res.data

      AppState.boards = res.data.map(b => new Board(b))
    } catch (error) {
      logger.log(error)
    }
  }

  async GetBoardsByUser(userId) {
    const boards = []
    for (let i = 0; i < AppState.boards.length; i++) {
      if (AppState.boards[i].creatorId === userId) {
        boards.push(AppState.boards[i])
      }
    }
    return boards
  }

  async getBoardById(boardId) {
    try {
      const res = await api.get('api/boards/' + boardId)
      AppState.board = res.data
      listsService.getActiveLists(boardId)
    } catch (err) {
      logger.error(err)
    }
  }

  async create(boardData) {
    try {
      delete boardData.id
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

  async deleteBoard(boardId) {
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

  getBoardDate(id) {
    const board = AppState.boards.find(b => b.id === id)
    if (board) {
      const boardDate = board.createdAt
      const updatedDate = new Date(boardDate)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const boardsService = new BoardsService()
