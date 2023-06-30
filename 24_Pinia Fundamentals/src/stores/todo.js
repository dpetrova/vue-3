import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
  // state
  const todoList = ref([]);
  const id = ref(0);

  // getters
  const uncompletedTodos = computed(() =>
    todoList.value.filter((x) => !x.completed)
  );

  // actions
  function addTodo(title) {
    todoList.value.push({ title, id: ++id.value, completed: false });
  }
  function deleteTodo(id) {
    todoList.value = todoList.value.filter((todo) => {
      return todo.id !== id;
    });
  }
  function toggleCompleted(id) {
    const todo = todoList.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  return { todoList, uncompletedTodos, addTodo, deleteTodo, toggleCompleted };
});
