<template>
  <div class="container">
    <h1>Vue Todo</h1>
    <form class="todoInputContainer" @submit.prevent="createTodoList">
      <input
        :class="{ inputFocus: newTodoList.length > 0 }"
        class="inputFocusOutline"
        v-model="newTodoList"
        placeholder="Add new todo list"
      />
      <button type="submit"><PlusIcon width="24" height="24" /></button>
    </form>
    <ul class="todos">
      <transition-group name="todosList">
        <TodoCard
          v-for="(list, i) in todoLists"
          :key="list.title"
          :title="list.title"
          :todos="list.todos"
          :remove="() => removeTodoList(i)"
        />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import TodoCard from "./components/Todo/TodoCard.vue";

export default {
  components: { TodoCard },
  data() {
    return {
      newTodoList: "",
      todoLists: [
        {
          title: "For Latte",
          todos: [
            { todo: "Feed her", completed: false },
            { todo: "Play with her", completed: false },
            { todo: "take videos", completed: false },
          ],
        },
      ],
    };
  },
  methods: {
    createTodoList() {
      if (!this.newTodoList.length > 0) return;
      if (this.todoLists.filter(({ title }) => title === this.newTodoList).length > 0) return;
      this.todoLists.push({ title: this.newTodoList, todos: [] });
      this.newTodoList = "";
    },
    removeTodoList(index) {
      this.todoLists = this.todoLists.filter((_, i) => i !== index);
    },
  },
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
