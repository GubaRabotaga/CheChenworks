<template>
  <navigation-bar />
  <div class="text-center my-5 mx-3">
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: { NavigationBar },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";

#app {
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sortable-drag {
  opacity: 0.9 !important;
  transform: rotate(5deg);
}
</style>
