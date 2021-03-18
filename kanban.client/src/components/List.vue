<template>
  <div class="list">
    <h4><span>{{ list.title }}</span></h4>
    <button class="btn btn-primary" type="button" @click="state.showCreate = !state.showCreate">
      Add task
    </button>
    <div v-if="state.showCreate">
      <div class="input-group">
        <input type="text" id="task" placeholder="Enter task here..." v-model="state.task.title">
        <button type="button" @click="create">
          S
        </button>
      </div>
    </div>
    <Task v-for="task in state.tasks" :key="task.id" :task="task" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'

export default {
  name: 'List',
  props: {
    list: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks),
      task: {},
      showCreate: false
    })
    return {
      state,
      async create() {
        try {
          state.task.listId = props.list._id
          logger.log(state.task)
          await tasksService.create(state.task)
          state.task = {}
        } catch (err) {
          logger.error(err)
        }
      }
    }
  }

}
</script>

<style scoped>
.list{
  height: 5vh;
  border: 1.25px blue;
  border-radius: 8%;
  background-color: bisque;
    filter: drop-shadow(0px, 0px, 3px, 3px, rgb(3, 3, 65))
}

</style>
