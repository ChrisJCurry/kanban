<template>
  <div class="col-9 col-md-10 pt-0">
    <h4><span>{{ task.title }}</span></h4>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle"
              type="button"
              id="taskDropDown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
      >
        Dropdown button
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div v-for="list in state.lists" :key="list._id">
          {{ list.title }}
        </div>
        <!-- <a class="dropdown-item" href="#">Action</a> -->
      </div>
    </div>
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
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists)
    })
    return {
      state
    }
  }

}
</script>

<style scoped>

.task{
  height: 4vh;
  border-radius: 8%;
  background-color: bisque;

}

</style>
