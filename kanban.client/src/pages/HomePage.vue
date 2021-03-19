<template>
  <div class="container-fluid">
    <h1>Boards</h1>
    <div v-if="state.user.isAuthenticated">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-board">
        Create Board
      </button>
    </div>

    <div class="row justify-content-start">
      <Board class="col-lg-3 col-md-6 col-sm-12"
             v-for="
               boardData
                 in
                   state.boards"
             :key="boardData._id"
             :board="boardData"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService.js'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards),
      user: computed(() => AppState.user),
      showCreate: false
    })
    onMounted(async() => {
      await boardsService.getAllBoards()
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
