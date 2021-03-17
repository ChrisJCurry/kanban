import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
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
      const comments = await commentsService.find()
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById(req.params.id)
      res.send(comment)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const comment = commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (err) {
      next(err)
    }
  }
}
