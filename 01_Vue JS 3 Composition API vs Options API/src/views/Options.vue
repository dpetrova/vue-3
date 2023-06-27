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
  </div>
</template>

<script>

export default {
  name: 'Options',
  data() {
    return {
      todos: [
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
      ],
      newTodo: "",
      namesToExclude: ['caramba', 'cowabunga', 'balderdash']
    }
  },
  computed: {
    todosCount() {
      return this.todos.length
    }
  },
  methods: {
    addTodo() {
      //push new item in front of array      
      this.todos.unshift({
        id: this.todos.length,
        name: this.newTodo
      })
      //clear input
      this.newTodo = '' 
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    }
  },
  watch: {
    newTodo(newValue, oldValue) {
      if(this.namesToExclude.includes(newValue.toLowerCase())) {
        this.newTodo = ''
        alert(`You must never say ${newValue}!`)
      }
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