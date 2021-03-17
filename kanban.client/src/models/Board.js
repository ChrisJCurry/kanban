export class Board {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title || 'Board'
    this.creator = data.creator
    this.creatorId = data.creatorId
  }
}
