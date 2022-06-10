<template>
  <navigation-bar />
  <div class="my-5 mx-3">
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

:root {
  --difficulty-1: #adff2f;
  --difficulty-2: #00fa9a;
  --difficulty-3: #32cd32;
  --difficulty-4: #ffff00;
  --difficulty-5: #ffd700;
  --difficulty-6: #ffa07a;
  --difficulty-7: #ff7f50;
  --difficulty-8: #ff4500;
  --difficulty-9: #dc143c;
  --difficulty-10: #b22222;
}
</style>
