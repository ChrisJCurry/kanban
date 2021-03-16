<template>
  <div>
    <List v-for="listData in state.lists" :key="listData._id" :list="listData" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
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
