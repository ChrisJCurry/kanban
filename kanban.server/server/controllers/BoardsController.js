import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getBoardById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      res.send(await boardsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getBoardById(req, res, next) {
    try {
      res.send(await boardsService.getBoardById(req.params.id))
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      res.send(await boardsService.createBoards(req.body))
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
