<template>
  <div class="create-list-modal">
    <!-- Modal -->
    <div class="modal fade"
         id="create-list"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create List
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline">
              <div class="form-group">
                <div class="row">
                  <div class="col-6 col-sm-3 col-md-3">
                    <input type="text"
                           name="title"
                           id="list-title"
                           class="form-control"
                           placeholder="Enter List title"
                           aria-describedby="helpId"
                           v-model="state.list.title"
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button class="btn btn-success" @click="create">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { listsService } from '../services/ListsService'

export default ({
  name: 'CreateListModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      list: {}
    })
    return {
      state,
      async create() {
        try {
          state.list.boardId = route.params.id
          await listsService.create(state.list)
          state.list = {}
          $('#create-list').modal('hide')
          // $('.modal-backdrop').remove() WHY IS IT WORKING WITHOUT THIS?!?!?
        } catch (err) {
          logger.error(err)
        }
      }
    }
  }
})
</script>
