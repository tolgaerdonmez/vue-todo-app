<template>
  <div class="todoCard">
    <div class="title addTodo">
      <h2>{{ title }}</h2>
      <button @click="newTodo = ''"><PlusIcon width="24" height="24" /></button>
      <button @click="remove"><TrashIcon width="24" height="24" /></button>
    </div>
    <div class="todos">
      <transition-group name="todoList">
        <Todo
          v-for="(todo, i) in _todos"
          :todo="todo.todo"
          :completed="todo.completed"
          :toggle="() => toggleTodo(i)"
          :remove="() => removeTodo(i)"
          :key="todo.todo"
        />
      </transition-group>
    </div>
    <form v-if="newTodo !== null" class="addTodo" @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="New Todo" :class="{ inputFocus: newTodo.length > 0 }" />
      <button type="submit"><PlusIcon width="24" height="24" /></button>
      <button @click.prevent="newTodo = null"><CloseIcon width="24" height="24" /></button>
    </form>
  </div>
</template>

<script>
import Todo from "./TodoItem.vue";

export default {
  components: { Todo },
  props: {
    title: String,
    todos: Array,
    remove: Function,
  },
  data() {
    return { _todos: this.todos, newTodo: null };
  },
  methods: {
    addTodo() {
      this._todos.push({ todo: this.newTodo });
      this.newTodo = null;
    },
    removeTodo(index) {
      this._todos = this._todos.filter((_, i) => i !== index);
    },
    toggleTodo(index) {
      this._todos[index].completed = !this._todos[index].completed;
    },
  },
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
