import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .delete('/:id', this.delete)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      res.send(await listsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await listsService.getListById(req.params.id))
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      res.send(await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await listsService.deleteList(req.params.id, req.userInfo.id))
    } catch (err) {
      next(err)
    }
  }
}
