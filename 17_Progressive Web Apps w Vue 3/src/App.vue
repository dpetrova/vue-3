<script>
export default {
  name: "App",
  data: () => ({
    database: null,
    todos: [],
    newTodo: "",
    editedTodo: null,
    visibility: "all",
  }),
  computed: {
    activeTasks() {
      return this.todos.filter((todo) => !todo.completed);
    },
    filteredTodos() {
      if (this.visibility === "all") {
        return this.todos;
      } else if (this.visibility === "active") {
        return this.activeTasks;
      } else {
        return this.todos.filter((todo) => todo.completed);
      }
    },
    remaining() {
      return this.activeTasks.length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach((todo) => {
          todo.completed = value;
          // update todo into IndexedDB
          this.saveTodo({ ...todo });
        });
      },
    },
  },
  async created() {
    // load the object store data
    this.todos = await this.getTodoStore();
  },
  methods: {
    // create/fetch IndexedDB instance
    async getDatabase() {
      return new Promise((resolve, reject) => {
        // check for existence of a database
        if (this.database) {
          resolve(this.database);
        }

        // open a database (params: dbName, version) -> if one does not exist yet, it will create one, otherwise, it will fetch the instance that we requested
        const request = window.indexedDB.open("tododb", 1);

        // onerror Lifecycle Hook
        request.onerror = (event) => {
          console.error("ERROR: Unable to open database", event);
          reject("Error");
        };

        // onsuccess Lifecycle Hook
        request.onsuccess = (event) => {
          // assign the database once we receive is successfully
          this.database = event.target.result;
          resolve(this.database);
        };

        // onupgradeneeded Lifecycle Hook (called when the database is initially created or upgraded to a new version)
        request.onupgradeneeded = (event) => {
          const database = event.target.result;
          // create object stores that are specific tables that contain different types of data (unique store name)
          database.createObjectStore("todos", {
            autoIncrement: true, // whether each new item automatically increments
            keyPath: "id", // define where the database should look for the unique key of each item
          });
        };
      });
    },
    // fetch data from the object store
    async getTodoStore() {
      // get the most recent update on the database
      this.database = await this.getDatabase();

      return new Promise((resolve, reject) => {
        // initiate a transaction to read the object store
        // params: object store name(s) (string/array of strings), permission Level
        const transaction = this.database.transaction("todos", "readonly");

        // request the object store from the transaction
        const store = transaction.objectStore("todos");

        // define a place to store the data temporarily before returning it
        const todoList = [];

        // iterate through the object store to read items (rows of records)
        store.openCursor().onsuccess = (event) => {
          // cursor track what position (row) it’s currently on within the table
          const cursor = event.target.result;
          if (cursor) {
            todoList.push(cursor.value);
            cursor.continue(); // resume iterating through the table until its complete
          }
        };

        // closing the transaction
        // if the transaction is successful, return the data stored in todoList
        transaction.oncomplete = () => {
          resolve(todoList);
        };

        // if the transaction fails, return the error event
        transaction.onerror = (event) => {
          reject(event);
        };
      });
    },
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      const todoItem = {
        id: this.todos.length + 1,
        title: value,
        completed: false,
      };

      if (!value) {
        return;
      }
      this.todos.push(todoItem);
      // save todo into IndexedDB
      this.saveTodo(todoItem);

      this.newTodo = "";
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      // update todo into IndexedDB
      this.saveTodo({ ...todo });
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    pluralize(word, count) {
      return word + (count === 1 ? "" : "s");
    },
    removeCompleted() {
      this.todos = this.todos.filter((item) => {
        if (item.completed) {
          // update IndexedDB
          this.deleteTodo(item);
        } else {
          return !item.completed;
        }
      });
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      // update IndexedDB
      this.deleteTodo(todo);
    },
    updateTodo(todo) {
      this.todos.find((item) => item === todo).completed = !todo.completed;
      // update todo into IndexedDB
      this.saveTodo({ ...todo });
    },
    async saveTodo(todo) {
      // get the most recent update on the database
      this.database = await this.getDatabase();

      return new Promise((resolve, reject) => {
        // initiate a transaction to read/write the object store
        // params: object store name(s) (string/array of strings), permission Level
        const transaction = this.database.transaction("todos", "readwrite");

        // request the object store from the transaction
        const store = transaction.objectStore("todos");

        // add the item to the store if it doesn’t exist, otherwise update the correct item as long as the id matches
        store.put(todo);

        // closing the transaction
        transaction.oncomplete = () => {
          resolve("Todo successfully saved!");
        };

        // if the transaction fails, return the error event
        transaction.onerror = (event) => {
          reject(event);
        };
      });
    },
    async deleteTodo(todo) {
      // get the most recent update on the database
      this.database = await this.getDatabase();

      return new Promise((resolve, reject) => {
        // initiate a transaction to read/write the object store
        // params: object store name(s) (string/array of strings), permission Level
        const transaction = this.database.transaction("todos", "readwrite");

        // request the object store from the transaction
        const store = transaction.objectStore("todos");

        // delete item
        store.delete(todo.id);

        // closing the transaction
        transaction.oncomplete = () => {
          resolve("Todo successfully deleted!");
        };

        // if the transaction fails, return the error event
        transaction.onerror = (event) => {
          reject(event);
        };
      });
    },
  },
};
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          class="todo"
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo == editedTodo }"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              @click="updateTodo(todo)"
              :checked="todo.completed"
            />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong v-text="remaining"></strong>
        {{ pluralize("item", remaining) }} left
      </span>
      <ul class="filters">
        <li>
          <button
            @click="visibility = 'all'"
            :class="{ selected: visibility == 'all' }"
            class="btn"
          >
            All
          </button>
        </li>
        <li>
          <button
            @click="visibility = 'active'"
            :class="{ selected: visibility == 'active' }"
            class="btn"
          >
            Active
          </button>
        </li>
        <li>
          <button
            @click="visibility = 'completed'"
            :class="{ selected: visibility == 'completed' }"
            class="btn"
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>
      A Vue 3 iteration on
      <a href="https://todomvc.com/examples/vue/">TodoMVC - Vue</a>
    </p>
  </footer>
</template>

<style>
@import "./styles/todomvc-base.css";
@import "./styles/todomvc-index.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  padding: 0 10px;
}
</style>
