<template>
  <div class="home">
    <!-- @ is an alias to /src -->
    <img alt="Vue logo" src="@/assets/logo.png">
    <h3>You have {{todosCount}} ToDos!</h3>
    <div class="container">
      <input type="text" placeholder="Add a ToDo" v-model="newTodo" @keyup.enter="addTodo">
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
          <span>{{todo.name}}</span>
          <button @click="deleteTodo(index)">x</button>
        </li>        
      </ul>
    </div>  
    <h3>You have {{notesCount}} Notes!</h3>
    <div class="container">
      <input type="text" placeholder="Add a Note" v-model="data.newNote" @keyup.enter="addNote">
      <ul>
        <li v-for="(note, index) in data.notes" :key="note.id">
          <span>{{note.name}}</span>
          <button @click="deleteNote(index)">x</button>
        </li>        
      </ul>
    </div> 
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'

export default {
  name: 'Options',
  setup() {
    /* REACTIVE DATA (similar to data in objects API -> use ref ) */
    let todos = ref([
        {
          id: 0,
          name: "Get up."
        },
        {
          id: 1,
          name: "Drink coffee."
        },
        {
          id: 2,
          name: "Read a book."
        }
      ])
    let newTodo = ref('')

    /* REACTIVE OBJECTS (use reactive) */
    //any property added to this will be reactive (use them without .value)
    let data = reactive({
      notes: [],
      newNote: ''      
    })

    /* NON REACTIVE VARIABLES */
    const namesToExclude = ['caramba', 'cowabunga', 'balderdash']

    /* COMPUTED PROPERTIES */
    let todosCount = computed(() => {
      return todos.value.length
    })

    let notesCount = computed(() => {
      return data.notes.length
    })

    /* METHODS */
    function addTodo() {
      //push new item in front of array      
      todos.value.unshift({
        id: todos.value.length,
        name: newTodo.value
      })
      //clear input
      newTodo.value = '' 
    }

    function deleteTodo(index) {
      todos.value.splice(index, 1)
    }

    function addNote() {
      //push new item in front of array      
      data.notes.unshift({
        id: data.notes.length,
        name: data.newNote
      })
      //clear input
      data.newNote = '' 
    }

    function deleteNote(index) {
      data.notes.splice(index, 1)
    }

    /* WATCHERS */
    watch(newTodo, (newValue, oldValue) => {
      if(namesToExclude.includes(newValue.toLowerCase())) {
        newTodo.value = ''
        alert(`You must never say ${newValue}!`)
      }
    })

    watch(data, (newValue, oldValue) => {      
      if(namesToExclude.includes(newValue.newNote.toLowerCase())) {        
        alert(`You must never say ${newValue.newNote}!`)
        data.newNote = ''
      }
    })

    //return only reactive items
    return {
      todos,
      newTodo,
      data,
      todosCount,
      notesCount,
      addTodo,
      deleteTodo,
      addNote,
      deleteNote
    }
  }
}
</script>

<style scoped>
.container {
  width: 20%;
  margin: 0 auto;
  /* container becomes flexible by setting the display property to flex */
  display: flex;
  /* flex-direction property defines in which direction the container wants to stack the flex items */
  flex-direction: column;
}
ul {
  padding: 0;
  list-style: none; 
}
li {
  border: 1px solid;
  /* container becomes flexible by setting the display property to flex */
  display: flex;
  /* flex-direction property defines in which direction the container wants to stack the flex items */
  flex-direction: row;
  /* wrap value specifies that the flex items will wrap if necessary (no-wrap is default) */
  /* flex-flow property is a shorthand property for setting both the flex-direction and flex-wrap properties */
  flex-wrap: wrap;
  /* justify-content property is used to align the flex items horizontally (center/flex-start/flex-end/space-around/space-between) */
  justify-content: flex-start;
  /* align-items property is used to align the flex items vertically (center/flex-start/flex-end/stretch/baseline) */
  align-items: stretch;
  /* align-content property is used to align the flex lines (center/flex-start/flex-end/space-between/space-around/stretch) */
  align-content: stretch;
  margin-bottom: 10px;
}
li span {
  /* flex-grow property specifies how much the item will grow relative to the rest of the flexible items inside the same container */
  flex-grow: 1; 
}

/* Perfect Centering:
.flex-container {
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
} */
</style>
