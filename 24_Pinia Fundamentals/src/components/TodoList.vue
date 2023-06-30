<script setup>
import { useTodoStore } from "../stores/todo";
import { storeToRefs } from "pinia";

const store = useTodoStore();

// storeToRefs lets todoList keep reactivity
const { todoList } = storeToRefs(store);

// destructuring action method doesn't require using storeToRefs
const { toggleCompleted, deleteTodo } = store;
</script>

<template>
  <div v-for="todo in todoList" :key="todo.id" class="item">
    <div class="content" @click.stop="toggleCompleted(todo.id)">
      <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      <div>
        <span v-show="todo.completed">&#10004;</span>
        <span @click.stop="deleteTodo(todo.id)">&#10060;</span>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
.content {
  cursor: pointer;
  display: flex;
}
.content > span {
  margin: 10px;
}
.completed {
  text-decoration: line-through;
}
</style> -->

<style scoped>
.item {
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  font-size: 1.5em;
  justify-content: space-between;
  width: 80vw;
  padding: 5px;
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
}
</style>
