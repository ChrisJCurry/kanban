<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="body-text card py-2">
      <div class="row">
        <div class="col-8 col-lg-9 my-2">
          <h4 class="pl-4">
            <span>{{ list.title }}</span>
          </h4>
        </div>
        <div class="col-1 offset-2 offset-md-1 col-lg-1 my-2 pl-2" v-if="state.user.email === list.creator.email">
          <button @click="deleteList" class="btn btn-danger">
            x
          </button>
        </div>
        <div class="col-12 col-lg-6 offset-sm-1 my-1 ml-4">
          <div>
            <button class="btn btn-primary mr-1" type="button" @click="state.showCreate = !state.showCreate">
              Add task
            </button>
          </div>
        </div>
        <div class="col-8 offset-2">
          <div class="row">
            <div class="col-12">
              <form @submit.prevent="createTask" v-if="state.showCreate">
                <input type="text" placeholder="Enter task here..." v-model="state.task.title">
                <button type="submit" class="btn btn-secondary">
                  S
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-10 offset-1">
          <Task class="border border-danger" v-for="task in state.tasks" :key="task._id" :task="task" />
        </div>
      </div>
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
      async createTask() {
        try {
          state.task.listId = props.list._id
          await tasksService.create(state.task)
          state.task = {}
        } catch (err) {
          logger.error(err)
        }
      },
      async deleteList() {
        await listsService.delete(props.list._id)
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
