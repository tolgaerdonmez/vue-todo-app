<template>
  <div class="todoCard">
    <div class="title addTodo">
      <h2>{{ title }}</h2>
      <button @click="newTodo = ''"><PlusIcon width="24" height="24" /></button>
      <button @click="deleteCollection"><TrashIcon width="24" height="24" /></button>
    </div>
    <div class="todos">
      <transition-group name="todoList">
        <Todo
          v-for="(todo, id) in todos"
          :todo="todo.todo"
          :completed="todo.completed"
          :key="id"
          @toggle="toggleTodo(id, todo)"
          @remove="deleteTodo(id)"
        />
      </transition-group>
    </div>
    <form
      v-if="newTodo !== 0"
      class="addTodo"
      @submit.prevent="
        () => {
          createTodo(newTodo);
          newTodo = 0;
        }
      "
    >
      <input v-model="newTodo" placeholder="New Todo" :class="{ inputFocus: newTodo.length > 0 }" />
      <button type="submit"><PlusIcon width="24" height="24" /></button>
      <button @click.prevent="newTodo = 0"><CloseIcon width="24" height="24" /></button>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineComponent, ref } from "vue";
import { useCollection } from "../../store";

import Todo from "./TodoItem.vue";

defineComponent(Todo);

const props = defineProps({
  collectionID: String,
});

const newTodo = ref(0);

const { title, todos, createTodo, updateTodo, deleteTodo, deleteCollection } = useCollection(props.collectionID);

const toggleTodo = (id, todo) => {
  updateTodo(id, { ...todo, completed: !todo.completed });
};
</script>

<script>
export default {
  components: { Todo },
};
</script>

<style lang="scss">
.todoCard {
  margin-bottom: 1rem;
  padding: 1.5rem 2rem;
  background-color: var(--app-color-primary);

  // also addTodo
  .title {
    display: flex;
    align-items: center;
    h2 {
      color: var(--app-color-light);
      margin-right: 1rem;
    }
  }

  p {
    color: var(--app-color-light);
  }

  .addTodo {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    /* align-items: center; */

    input {
      font-size: 2.5rem;
      margin-right: 1rem;

      border-bottom: solid white;
      caret-color: var(--app-color-light);
    }
    button {
      font-size: 2rem;
      padding: 1rem;
      background-color: var(--app-color-light);
      color: var(--app-color-primary);
      &:nth-child(3) {
        margin-left: 1rem;
      }
      svg path {
        color: var(--app-color-primary);
      }
    }
  }
}

.todoList-item {
  display: block;
}
.todoList-enter-active,
.todoList-leave-active {
  transition: all 500ms ease;
}
.todoList-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.todoList-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
