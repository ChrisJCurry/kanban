<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-8">
        <div>
          <h2 class="title-font">
            {{ state.board.title }}
          </h2>
        </div>
      </div>
      <div class="col-4 text-right">
        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#create-list">
          Create List
        </button>
      </div>
      <div class="row mr-5">
      </div>
    </div>
    <div>
      <div class="row">
        <List class=" col-4 my-5" v-for="list in state.lists" :key="list._id" :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'

export default {
  name: 'BoardPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      board: computed(() => AppState.board),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      lists: computed(() => AppState.lists)
    })
    onBeforeMount(() => {
      AppState.lists = []
    })
    onMounted(() => {
      boardsService.getBoardById(route.params.id)
    })
    return {
      state,
      route
    }
  }
}
</script>
