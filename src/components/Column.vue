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
                @choose="onTaskChoose"
                filter=".btn-close"
              >
                <template #item="{ element, index }">
                  <div>
                    <div
                      class="card-header"
                      :style="{
                        backgroundColor:
                          $store.state.difficultyColors[element.difficulty],
                      }"
                    >
                      <h5><strong>Name:</strong>{{ element.title }}</h5>
                    </div>
                    <h5
                      class="task-title"
                      :style="{
                        borderColor:
                          $store.state.difficultyColors[element.difficulty],
                      }"
                    >
                      <span v-show="!element.Uphere">
                        <strong>Description:</strong>{{ element.description }}
                      </span>

                      <div v-show="element.Uphere">
                        <h5><strong>Director:</strong>{{ element.Uphere }}</h5>
                        <h5><strong>Executor:</strong>User</h5>
                        <h5>
                          <strong>Standard:</strong>{{ getHours(element) }}
                        </h5>
                        <h5><strong>Used up:</strong> 0h</h5>
                        <h5 contenteditable="true">
                          <strong>Progress:</strong>{{ element.progress }}
                        </h5>
                      </div>

                      <strong v-on:click="element.Uphere = !element.Uphere">
                        <strong
                          class="information"
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
export default {
  data() {
    return {
      upHere: false,
    };
  },

  props: {
    columns: { type: Array, required: true },
  },
  setup(_, context) {
    let releaseTask = (columns, taskIndex) => {
      let deletedTask = columns.takenTasks.splice(taskIndex, 1).at(0);
      context.emit("release-task", deletedTask);
    };
    return {
      releaseTask,
    };
  },
  methods: {
    getTotalDifficulty(takenTasks) {
      return takenTasks.reduce((total, task) => total + task.difficulty, 0);
    },
    getHours(task) {
      let date1 = new Date(task.deadline);
      let date2 = new Date(task.startTime);
      let diff = date1.getTime() - date2.getTime();
      return parseInt((diff / (1000 * 60 * 60)) % 24);
    },
  },
  emits: ["release-task"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  background-color: $teal-100;
  cursor: move;
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
