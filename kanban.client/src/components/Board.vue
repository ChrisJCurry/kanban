<template>
  <div class="container-fluid">
    <div class="col-4">
      <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
        <!--<h1>{{ board.title }}</h1>-->
        <div class="card">
          <div class="card-title text-center">
            {{ board.title }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
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
