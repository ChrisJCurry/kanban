<template>
  <div class="col-10 offset-2" v-if="comment.creator">
    <h5>
      <button class="btn btn-danger btn-sm" @click="deleteComment">
        x
      </button>
      <span class="mr-4">{{ comment.creator.nickname }}: {{ comment.body }}</span>
    </h5>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments)
    })
    return {
      state,
      async deleteComment() {
        commentsService.delete(props.comment)
      }
    }
  }

}
</script>

<style scoped>
.board{
  height: 5vh;
  border: 1.5px black;
  border-radius: 8%;
  background-color: bisque;

}

</style>
