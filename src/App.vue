<template>
  <div class="container">
    <h1>Vue Todo</h1>
    <form class="todoInputContainer" @submit.prevent="createCol">
      <input
        :class="{ inputFocus: collectionTitle.length > 0 }"
        class="inputFocusOutline"
        v-model="collectionTitle"
        placeholder="Add new todo list"
      />
      <button type="submit"><PlusIcon width="24" height="24" /></button>
    </form>
    <ul class="todos">
      <transition-group name="todosList">
        <TodoCard v-for="key in Object.keys(cols)" :key="key" :collectionID="key" />
      </transition-group>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineComponent } from "vue";
import { useCollections, createCollection } from "./store";

import TodoCard from "./components/Todo/TodoCard.vue";

defineComponent(TodoCard);

const cols = useCollections();

const collectionTitle = ref("");

const createCol = () => {
  createCollection(collectionTitle.value);
  collectionTitle.value = "";
};
</script>

<style lang="scss">
@import "./global.scss";

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: 2rem 3rem;

  .todoInputContainer {
    display: flex;
    flex-direction: row;
    button {
      margin: 1rem 0;
      font-size: 2.5rem;
      padding: 1rem;
    }
    input {
      margin: 1rem 1rem 1rem 0;
      font-size: 3rem;
    }
  }
}

.todosList-item {
  display: block;
}
.todosList-enter-active,
.todosList-leave-active {
  transition: all 500ms ease;
}
.todosList-enter-from,
.todosList-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
