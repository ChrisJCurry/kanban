<template>
  <div class="container-fluid">
    <h1>Boards</h1>
    <div class="row m-3" v-if="state.user.isAuthenticated">
      <div class="col text-center">
        <button type="button" class="btn btn-primary font-weight-bold" data-toggle="modal" data-target="#create-board">
          Create Board
        </button>
      </div>
    </div>
    <div class="row">
      <Board v-for="boardData in state.boards" :key="boardData._id" :board="boardData" />
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
      user: computed(() => AppState.user)
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
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
