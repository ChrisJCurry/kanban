import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getCommentsById)
      .get('/:id', this.getById)
      .put('/:id', this.move)
      .delete('/:id', this.delete)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.find()
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const task = tasksService.getTaskById(req.params.id)
      res.send(task)
    } catch (err) {
      next(err)
    }
  }

  async getCommentsById(req, res, next) {
    try {
      const taskId = req.params.id
      const comments = await tasksService.getCommentsByTaskId(taskId)
      res.send(comments)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const task = tasksService.deleteTask(req.params.id, req.userInfo.id)
      res.send(task)
    } catch (err) {
      next(err)
    }
  }

  async move(req, res, next) {
    try {
      const task = tasksService.move(req.body.id, req.body)
      res.send(task)
    } catch (err) {
      next(err)
    }
  }
}
