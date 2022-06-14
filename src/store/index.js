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
  modules: {
    auth: authModule,
  },
});
