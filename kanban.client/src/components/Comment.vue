<template>
  <div class="col-9 col-md-10 pt-0">
    <h5>{{ comment.creator }}</h5>
    <h5>{{ comment.body }}</h5>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object, required: true
    }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments)
    })
    return {
      state
    }
  }

}
</script>

<style>
</style>
