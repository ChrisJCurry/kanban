<template>
  <div class="row">
    <div class="col-1">
      <button type="button" class="btn btn-primary" @click="deleteTask">
        x
      </button>
    </div>
    <div class="col-7 pl-4">
      <h4>{{ task.title }}</h4>
    </div>
    <div class="col-4">
      <div class="dropdown">
        <button class="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                id="taskDropDown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          lists
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div v-for="list in state.lists" :key="list._id">
            <a class="dropdown-item" @click="move(task, list._id)">{{ list.title }}</a>
          </div>
          <!-- <a class="dropdown-item" href="#">Action</a> -->
        </div>
      </div>
    </div>

    <Comment v-for="comment in state.comments" :key="comment._id" :comment="comment" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists)
    })
    return {
      state,
      async deleteTask() {
        tasksService.delete(props.task)
      },
      async move(task, listId) {
        tasksService.move(task, listId)
      }
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
