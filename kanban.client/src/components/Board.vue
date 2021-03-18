<template>
  <div class="body-text">
    <div class="row">
      <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
        <div class="col-12">
          <div class="card board mt-3">
            <div class="card-body">
              <h5 class="card-title">
                {{ board.title }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <h6>
                  {{ getBoardDate(board.id) }}
                </h6>
              </h6>
              <p class="card-text">
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: {
      type: Object, required: true
    }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      getBoardDate(id) {
        return boardsService.getBoardDate(id)
      }
    }
  }

}
</script>

<style scoped>

.board{
  height: 10rem;
  width: 20rem;
  border: solid 3px black;
  border-radius: 10px;
  background-color: rgb(230, 221, 210);
  filter: drop-shadow(1px 3px 3px rgb(3, 3, 65))
}

</style>
