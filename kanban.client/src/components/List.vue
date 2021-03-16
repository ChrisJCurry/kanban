<template>
  <div class="col-9 col-md-10 pt-0">
    <h4><span>{{ list.title }}</span></h4>
    <div v-for="task in state.tasks" :key="task._id"></div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'List',
  props: {
    list: {
      type: Object, required: true
    }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks)
    })
    return {
      state
    }
  }

}
</script>

<style>
</style>
