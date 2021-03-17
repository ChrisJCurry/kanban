import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getCommentsById)
      .get('/:id', this.getById)
      .delete('/:id', this.delete)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      res.send(await tasksService.find())
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await tasksService.getTaskById(req.params.id))
    } catch (err) {
      next(err)
    }
  }

  async getCommentsById(req, res, next) {
    logger.log(req.params.id)
    try {
      res.send(await tasksService.getCommentsByTaskId(req.params.id))
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      res.send(await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await tasksService.deleteTask(req.params.id, req.userInfo.id))
    } catch (err) {
      next(err)
    }
  }
}
