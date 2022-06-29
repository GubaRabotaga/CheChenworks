<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="column in columns" :key="column.id">
          <div class="card card-columns">
            <div class="card-header">
              <div class="d-flex align-items-center">
                {{ column.displayName }}
                <div class="card-header-task">
                  {{ getTotalDifficulty(column.takenTasks) }}
                </div>
              </div>
              <div class="add-task" @click="addTask(column.name)">
                <span> <strong>+ </strong> Add task</span>
              </div>
            </div>
            <div class="card-body">
              <base-draggable
                class="list-group"
                :list="column.takenTasks"
                animation="150"
                group="tasks"
                itemKey="id"
                handle=".handle"
                force-fallback="true"
              >
                <template #item="{ element }">
                  <div>
                    <strong v-on:click="element.Uphere = !element.Uphere">
                      <strong class="information unselectable"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 600 600"
                        >
                          <path
                            d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                          /></svg
                      ></strong>
                    </strong>
                    <h5 class="task-title">
                      <span v-show="!element.Uphere">
                        <div class="handle">{{ element.title }}</div>
                        <div class="handle">
                          <h6>{{ element.description }}</h6>
                        </div>
                        <files-row class="mt-3" :links="element.attachments" />

                        <div class="progress">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            v-bind:style="{
                              width: element.donePercents * 100 + '%',
                            }"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div class="task-time">
                          <div class="task-time-inner">
                            🕗 {{ getDays(element) }} days left
                          </div>
                        </div>
                      </span>

                      <div v-show="element.Uphere">
                        <h5 class="handle">
                          <strong>Director: </strong
                          >{{
                            `${element.director.surname} ${element.director.name}`
                          }}
                        </h5>
                        <h5 class="handle">
                          <strong>Standard: </strong>{{ getHours(element) }}h
                        </h5>
                        <h5>
                          <strong class="handle">Used: </strong>
                          {{ element.usedHours }}h
                          <strong
                            class="change1 unselectable"
                            :style="{
                              backgroundColor:
                                $store.state.difficultyColors[
                                  element.difficulty
                                ],
                            }"
                            @mousedown="addHour(element)"
                          >
                            +
                          </strong>

                          <strong
                            class="change2 unselectable"
                            :style="{
                              backgroundColor:
                                $store.state.difficultyColors[
                                  element.difficulty
                                ],
                            }"
                            @mousedown="deleteHour(element)"
                          >
                            -
                          </strong>
                        </h5>
                        <h5>
                          <strong>Difficulty:</strong> {{ element.difficulty }}
                        </h5>
                        <h5>
                          <strong>Progress: </strong
                          >{{ Math.trunc(element.donePercents * 100) }}%
                          <strong
                            class="change1 unselectable"
                            :style="{
                              backgroundColor:
                                $store.state.difficultyColors[
                                  element.difficulty
                                ],
                            }"
                            @mousedown="addPros(element)"
                          >
                            +
                          </strong>

                          <strong
                            class="change2 unselectable"
                            :style="{
                              backgroundColor:
                                $store.state.difficultyColors[
                                  element.difficulty
                                ],
                            }"
                            @mousedown="delPros(element)"
                          >
                            -
                          </strong>
                        </h5>

                        <div class="progress">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            v-bind:style="{
                              width: element.donePercents * 100 + '%',
                            }"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </h5>
                  </div>
                </template>
              </base-draggable>
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import FilesRow from "./FilesRow.vue";
export default {
  props: {
    columns: { type: Array, required: true },
  },
  methods: {
    addTask(taskState) {
      this.$emit("task-add", taskState.trim().toLowerCase());
    },
    getTotalDifficulty(takenTasks) {
      return takenTasks.reduce((total, task) => total + task?.difficulty, 0);
    },
    getHours(task) {
      let date1 = new Date(task.deadline);
      let date2 = new Date(task.startTime);
      let diff = date1.getTime() - date2.getTime();
      return parseInt(diff / (1000 * 60 * 60));
    },
    getDays(task) {
      let date1 = new Date(task.deadline);
      let date2 = new Date(task.startTime);
      let diff = date1.getTime() - date2.getTime();
      let dayz = parseInt(diff / (1000 * 60 * 60 * 24));
      return Math.round(dayz);
    },
    addHour(task) {
      task.usedHours += 1;
    },
    deleteHour(task) {
      task.usedHours -= 1;

      if (task.usedHours < 0) {
        task.usedHours = 0;
      }
    },
    addPros(task) {
      task.donePercents += 0.01;

      if (task.donePercents > 0.99) {
        task.donePercents = 1;
      }
    },
    delPros(task) {
      task.donePercents -= 0.01;

      if (task.donePercents < 0.01) {
        task.donePercents = 0;
      }
    },
  },
  components: { FilesRow },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.task-time-inner {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 11px;
  color: #809fb8;
}

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.handle {
  cursor: move;
}
.add-task {
  cursor: pointer;
  margin: 5%;
  background-color: $gray-300;
  color: #809fb8;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 15px;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px;
  font-weight: 400;
}
.change1 {
  border-radius: 5px;
  width: 21px;
  height: 21px;
  font-size: medium;
  position: absolute;
  margin-top: 8px;
  margin-left: auto;
  margin-right: end;
  text-align: center;
  right: 28px;
}
.change1:hover {
  color: white;
}
.change2 {
  border-radius: 5px;
  width: 21px;
  height: 21px;
  font-size: medium;
  position: absolute;
  margin-top: 8px;
  margin-left: auto;
  margin-right: end;
  text-align: center;
  right: 52px;
}
.change2:hover {
  color: white;
}

.list-group {
  min-height: 20px;
  width: 100%;
  height: 100%;
}

.btn {
  position: absolute;
  margin-top: 12px;
  margin-left: auto;
  margin-right: end;
  right: 25px;
}

.information {
  width: 25px;
  height: 25px;
  position: absolute;
  display: flex;
  margin-bottom: 40px;

  margin-left: auto;
  margin-right: end;
  text-align: center;
  right: 20px;
  cursor: pointer;
}
.information:hover {
  color: white;
}

.card-columns {
  border-radius: 15px;
  border-width: 1px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
  min-width: 300px;
}
.card-header {
  font-weight: 400;
  color: #809fb8;
  background-color: $white;
  text-align: start;
  padding-top: 15px;
  padding-right: 30px;
}
.card-header-task {
  position: absolute;
  font-weight: 400;
  color: white;
  background-color: #99b2c6;
  text-align: center;
  margin-right: end;
  right: 25px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
}
.badge {
  margin-left: auto;
  margin-right: 7px;
  margin-bottom: 5px;
  background-color: $info;
  float: right;
}
.task-time {
  border-radius: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
  background-color: $gray-300;
  margin-left: auto;
  text-align: center;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 5px;
}
.task-title {
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
}
.box {
  clip-path: circle(75%);
  transition: clip-path 1s;
}

.box:hover {
  clip-path: circle(25%);
}
</style>
