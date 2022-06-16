<template>
  <div class="todo-item">
    {{ item.todo }}
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";
.todo-item {
  padding: 10px 20px;
  border: 2px dotted grey;
  border-radius: 5px;
  background: linear-gradient(90deg, $gray-100, $gray-200);
}
.todo-item:hover {
  cursor: move;
  background: whitesmoke;
}
</style>
