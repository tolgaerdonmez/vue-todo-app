<template>
  <div>
    <img :src="img" :alt="name" />
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    name: {
      type: String,
      default: "John Doe",
    },
    img: String,
  },
};
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
}
</style>
