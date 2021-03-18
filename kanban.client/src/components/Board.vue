<template>
  <div class="body-text">
    <div class="row">
      <div class="col-12">
        <router-link class="col-8" :to="{name: 'BoardPage', params: {id: board.id}}">
          <div class="card board mt-3">
            <div class="card-body">
              <div class="row">
                <h5 class="card-title col-8 title-font">
                  {{ board.title }}
                </h5>
                <div v-if="board.creator && state.user"></div>
                <button v-if="state.user.email===board.creator.email" @click="deleteBoard" type="button" class=" col-2 offset-2 btn btn-danger del-button">
                  x
                </button>
              </div>
              <h6 class="card-subtitle mb-2 text-muted ">
                <p class="text-right body-font mr-3 fixed-bottom">
                  <span>created:{{ getBoardDate(board.id) }}</span>
                </p>
              </h6>
              <p class="card-text">
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      getBoardDate(id) {
        return boardsService.getBoardDate(id)
      },
      deleteBoard() {
        return boardsService.deleteBoard(props.board.id)
      }
    }
  }

}
</script>

<style scoped>

.board{
  height: 10rem;
  width: 20rem;
  border: solid 3px black;
  border-radius: 10px;
  background-color: rgb(230, 221, 210);
  filter: drop-shadow(1px 3px 3px rgb(3, 3, 65))
}

.date{
  position: absolute;
  transform: ();

}

.del-button{
  height: 2.5rem;
}
</style>
