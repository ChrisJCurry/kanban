import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .get('/:boardId/', this.getListsByBoard)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .delete('/:id', this.delete)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id/tasks', this.getTasksByListId)
  }

  async getAll(req, res, next) {
    try {
      const lists = await listsService.find()
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const list = await listsService.getListById(req.params.id)
      res.send(list)
    } catch (err) {
      next(err)
    }
  }

  async getListsByBoard(req, res, next) {
    try {
      const list = await listsService.find(req.params.id)
      res.send(list)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const list = await listsService.createList(req.body)
      res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const list = await listsService.deleteList(req.params.id, req.userInfo.id)
      res.send(list)
    } catch (err) {
      next(err)
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      const list = req.params.id
      const tasks = await listsService.getTasksByListId(list)
      res.send(tasks)
    } catch (err) {
      next(err)
    }
  }
}
