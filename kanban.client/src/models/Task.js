export class Task {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title || 'List'
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt || ''
  }
}
