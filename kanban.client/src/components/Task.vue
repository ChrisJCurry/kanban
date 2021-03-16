<template>
  <div class="col-9 col-md-10 pt-0">
    <h4><span>{{ task.title }}</span></h4>
    <Comment v-for="comment in state.comments" :key="comment._id" :comment="comment" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Task',
  props: {
    task: {
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
