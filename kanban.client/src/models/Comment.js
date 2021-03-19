export class Comment {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body || 'I forget to comment something...'
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt || ''
  }
}
