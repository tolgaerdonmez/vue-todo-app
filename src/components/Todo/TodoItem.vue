<template>
  <div class="todoItem">
    <button id="toggle" @click="toggle">
      <CheckmarkIcon v-if="completed" width="36" height="36" />
    </button>
    <p :class="{ strikeTrough: completed }">{{ todo }}</p>
    <button id="remove" @click="remove"><RemoveIcon width="24" height="24" /></button>
  </div>
</template>

<script>
export default {
  props: {
    todo: String,
    completed: Boolean,
    toggle: Function,
    remove: Function,
  },
};
</script>

<style lang="scss">
.todoItem {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  #toggle {
    position: relative;
    font-size: 2rem;
    padding: 1rem;
    margin-right: 1rem;
    box-shadow: 0 0 0 3px var(--app-shadow-hsl);
    &:hover {
      box-shadow: 0 0 0 5px var(--app-shadow-hsl);
    }
    svg {
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }

  #remove {
    margin-left: 1rem;
    svg path {
      color: var(--app-color-gray);
    }
  }

  p {
    position: relative;
  }

  p::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 3px;
    background-color: var(--app-color-gray);
    transform-origin: left;
    transform: scaleX(0%);
    transition: transform 200ms ease;
  }
  .strikeTrough::after {
    transform: scaleX(100%);
  }
}
</style>
