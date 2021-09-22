<template>
  <div class="todo-page">
    <h1>Todo</h1>
    <form @submit.prevent>
      <div class="mb1 container">
        <label for="task-label">Task Label: </label>
        <input type="text" id="task-label" v-model="newTask.label" />
      </div>
      <div class="mb1 container">
        <label for="task-type">Take Type: </label>
        <select name="task-type" id="task-type" v-model="newTask.type">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <button @click="addTask">Add Task</button>
    </form>
    <h1>Task List</h1>
    <div class="container">
      <div>
        <button @click="listFilter = 'all'">All</button> |
        <button @click="listFilter = 'incomplete'">Incomplete</button> |
        <button @click="listFilter = 'complete'">Complete</button>
      </div>
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="`task-${index}`">
          <input type="checkbox" v-model="task.isComplete" />
          {{ task.label }} ({{ task.type }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    //reactive data
    const state = reactive({
      newTask: {
        label: '',
        type: 'personal'
      } as TodoItem,
      taskItems: [] as TodoItem[],
      listFilter: 'all'
    })

    //computed properties
    const filteredTasks = computed(() => {
      if (state.listFilter === 'complete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === true
        )
      } else if (state.listFilter === 'incomplete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === false
        )
      } else {
        return state.taskItems
      }
    })

    //methods
    const addTask = () => {
      state.taskItems.push({
        ...state.newTask,
        isComplete: false
      })
    }

    return {
      ...toRefs(state), //toRefs helper method allow to destructure our state without breaking its reactivity (no need to reference state in our template)
      filteredTasks,
      addTask
    }
  }
})
</script>

<style scoped>
.todo-page {
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style: none;
}
.mb1 {
  margin-bottom: 1rem;
}
</style>
