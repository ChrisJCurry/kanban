<template>
  <div class="body-text card">
    <div class="row">
      <div class="col-8 my-2">
        <h4><span>{{ list.title }}</span></h4>
      </div>
      <div class="col-4 my-1">
        <div>
          <button class="btn btn-primary mr-1" type="button" @click="state.showCreate = !state.showCreate">
            Add task
          </button>
          <button type="button" class="btn btn-primary">
            x
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="create">
              <input type="text" placeholder="Enter task here..." v-model="state.task.title">
              <button type="submit" class="btn btn-secondary">
                S
              </button>
            </form>
            <div class="col-10 offset-1">
              <Task v-for="task in state.tasks" :key="task._id" :task="task" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.showCreate">
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'

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
      tasks: computed(() => AppState.tasks[props.list._id]),
      task: {},
      showCreate: false
    })
    onMounted(() => {
      listsService.getTasksByListId(props.list._id)
    })
    return {
      state,
      async create() {
        try {
          state.task.listId = props.list._id
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
.card{
  height: auto;
  border: solid 1.25px blue;
  border-radius: 10px;
  background-color: bisque;
    filter: drop-shadow(0px, 0px, 3px, 3px, rgb(3, 3, 65))
}

</style>
