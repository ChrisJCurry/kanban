<template>
  <div class="container-fluid">
    <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
      <h1>{{ board.title }}</h1>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
// import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'

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
      state
    }
  }

}
</script>

<style>
</style>
