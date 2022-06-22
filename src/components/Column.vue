<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="column in columns" :key="column.id">
          <div class="card card-columns">
            <div class="card-header">
              <h3 class="d-flex align-items-center">
                {{ column.name }}
              </h3>
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
                    <div
                      class="card-header handle"
                      :style="{
                        backgroundColor:
                          $store.state.difficultyColors[element.difficulty],
                      }"
                    >
                      <h5><strong>Name: </strong>{{ element.title }}</h5>
                    </div>
                    <h5
                      class="task-title"
                      :style="{
                        borderColor:
                          $store.state.difficultyColors[element.difficulty],
                      }"
                    >
                      <span v-show="!element.Uphere">
                        <div>
                          <strong>Description: </strong>
                        </div>
                        <div>{{ element.description }}</div>
                        <files-row :links="element.attachments" />
                      </span>

                      <div v-show="element.Uphere">
                        <h5>
                          <strong>Director: </strong
                          >{{
                            `${element.director.surname} ${element.director.name}`
                          }}
                        </h5>
                        <h5>
                          <strong>Standard: </strong>{{ getHours(element) }}h
                        </h5>
                        <h5>
                          <strong>Used: </strong> {{ element.usedHours }}h
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

                      <strong v-on:click="element.Uphere = !element.Uphere">
                        <strong
                          class="information unselectable"
                          :style="{
                            backgroundColor:
                              $store.state.difficultyColors[element.difficulty],
                          }"
                          >ℹ</strong
                        >
                      </strong>
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
    getHours(task) {
      let date1 = new Date(task.deadline);
      let date2 = new Date(task.startTime);
      let diff = date1.getTime() - date2.getTime();
      return parseInt(diff / (1000 * 60 * 60));
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

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.handle {
  cursor: move;
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
  margin-top: 11px;
  margin-left: auto;
  margin-right: end;
  text-align: center;
  right: 16px;
  cursor: pointer;
}
.information:hover {
  color: white;
}

.card-columns {
  border-color: $indigo;
  border-width: 2px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}
.card-header {
  text-align: start;
  padding-top: 15px;
}
.badge {
  margin-left: auto;
  margin-right: 7px;
  margin-bottom: 5px;
  background-color: $info;
  float: right;
}

.task-title {
  border-width: 2px;
  border-style: double;
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
