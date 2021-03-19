<template>
  <div v-if="task.creator">
    <div class="row py-1 task m-2" v-if="state.user.email === task.creator.email">
      <div class="col-1">
        <button type="button" class="btn btn-primary" @click="deleteTask" placeholder="x">
          <span>x</span>
        </button>
      </div>
      <div class="col-6 pl-4">
        <div>
          <h3>Task</h3>
          <h4><span class="text-author">{{ task.creator.nickname }}</span>: {{ task.title }}</h4>
        </div>
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
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="offset-1 col-6 pl-4">
        <h4><span class="text-author">{{ task.creator.nickname }}</span>: {{ task.title }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <button class="btn btn-primary btn-sm mr-1" type="button" @click="state.showCreate = !state.showCreate">
          Add comment
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1">
        <form @submit.prevent="createComment" v-if="state.showCreate">
          <input type="text" minlength="3" maxlength="20" placeholder="Enter comment here..." v-model="state.comment.body">
          <button type="submit" class="btn btn-secondary">
            S
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <Comment v-for="comment in state.comments" :key="comment._id" :comment="comment" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'

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
      lists: computed(() => AppState.lists),
      comments: computed(() => AppState.comments[props.task._id]),
      comment: {}
    })
    onMounted(() => {
      tasksService.getCommentsByTaskId(props.task._id)
      logger.log('state.comments: ', state.comments)
    })
    return {
      state,
      async createComment() {
        try {
          state.comment.taskId = props.task._id
          logger.log('Comment: ', state.comment)
          await commentsService.create(state.comment)
          state.comment = {}
        } catch (err) {
          logger.error(err)
        }
      },
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

.task:hover{
  background-color: rgb(192, 169, 141);
}

</style>
