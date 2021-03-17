import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getListByBoardId)
      .delete('/:id', this.delete)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const board = await boardsService.find()
      res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const board = await boardsService.getBoardById(req.params.id)
      res.send(board)
    } catch (err) {
      next(err)
    }
  }

  async getListByBoardId(req, res, next) {
    try {
      const board = await listsService.find({ boardId: req.params.id })
      res.send(board)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const board = await boardsService.createBoards(req.body)
      res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await boardsService.deleteBoard(req.params.id, req.userInfo.id))
    } catch (err) {
      next(err)
    }
  }
}
