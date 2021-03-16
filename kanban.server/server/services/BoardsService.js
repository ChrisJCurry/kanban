import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BoardsService {
  async find(query = {}) {
    const boards = await dbContext.Boards.find(query)
    return boards
  }

  async getBoardById(id) {
    const board = await dbContext.Boards.findById(id)
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async getListsByBoardId(id) {
    // in mongoose, MUST FEED IT OBJECT (query = {})
    const lists = await dbContext.Lists.find({ boardId: id })
    if (!lists) {
      throw new BadRequest('invalid')
    }
    return lists
  }

  async createBoards(newBoard) {
    try {
      const res = await dbContext.Boards.create(newBoard)
      return res
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteBoard(boardId, userId) {
    const boardToDelete = await dbContext.Boards.findOneAndDelete({ _id: boardId, creatorId: userId })
    if (!boardToDelete) {
      throw new BadRequest("You're not the creator or you have the wrong board ID")
    }

    return boardToDelete
  }
}

export const boardsService = new BoardsService()
