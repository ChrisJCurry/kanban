<template>
  <div class="container-fluid">
    <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
      <div class="card board" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">
            {{ board.title }}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <h4>
              {{ getBoardDate(board._id) }}
            </h4>
          </h6>
          <p class="card-text">
          </p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>

        <h1>{{ board.title }}</h1>
      </div>
    </router-link>
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
  height: 5vh;
  border: 1.25px black;
  border-radius: 8%;
  background-color: bisque;

}

</style>
