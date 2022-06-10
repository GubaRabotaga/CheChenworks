import { createStore } from "vuex";

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
});
