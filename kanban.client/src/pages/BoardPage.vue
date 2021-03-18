<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-right">
        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#create-list">
          Create List
        </button>
      </div>
      <div class="row mr-5">
        <div class="col-12">
          <div>
            <h2 class="title-font">
              Board Title
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <List v-for="list in state.lists" :key="list._id" :list="list" />
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
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks)
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
