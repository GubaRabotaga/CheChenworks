<template>
  <navigation-bar />
  <div class="content" id="content">
    <router-view></router-view>
  </div>
  <div id="spinner-overlay">
    <div class="spinner-border global-spinner" role="status" />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import { watch, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      const app = document.getElementById("app");
      const updateAppStyle = (isAuth) => {
        if (isAuth === true) {
          app.style.display = "flex";
        } else {
          app.style.display = "block";
        }
      };

      updateAppStyle(store.state.auth.isAuth);

      watch(store.state.auth, (value) => {
        updateAppStyle(value.isAuth);
      });
    });
  },
  components: { NavigationBar },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";

body {
  min-height: 100vh;
  background-color: $light;
}

#app {
  min-height: 100vh;
  display: block;
}

.content {
  width: 100%;
  display: flex;
}

.panel {
  background-color: $white;
  padding: 25px;
  border-radius: 50px;
  min-height: 98vh;
  margin: 0.5rem;
  width: 100%;
}

#spinner-overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 64, 50, 0.5);
  z-index: 2;
}

.global-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}

.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

html * {
  font-family: "Segoe UI", monospace;
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
