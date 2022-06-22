import { createStore } from "vuex";
import { authModule } from "./modules/authModule";

export default createStore({
  state: () => {
    let difficultyColors = {};

    for (let index = 1; index < 11; index++) {
      difficultyColors[index] = `var(--difficulty-${index})`;
    }

    return {
      difficultyColors: difficultyColors,
    };
  },
  actions: {
    enableGlobalSpinner() {
      document.getElementById("spinner-overlay").style.display = "block";
    },
    disableGlobalSpinner() {
      document.getElementById("spinner-overlay").style.display = "none";
    },
  },
  modules: {
    auth: authModule,
  },
});
