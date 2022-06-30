<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="employee in employees" :key="employee.id">
          <div class="card card-employee">
            <div class="card-header">
              <h4 class="d-flex align-items-center name">
                {{ employee.name }} {{ employee.surname }}
                <router-link
                  class="btn btn-outline-success"
                  style="margin-left: auto; float: right"
                  :to="`/employee/${employee.user}`"
                >
                  <open-link-icon />
                </router-link>
              </h4>
              <h6 class="skills">
                {{ employee.skills }}
              </h6>
            </div>
            <div class="card-body">
              <base-draggable
                class="list-group"
                :list="employee.takenTasks"
                animation="150"
                group="tasks"
                itemKey="id"
                @choose="onTaskChoose"
                filter=".ignore"
              >
                <template #item="{ element, index }">
                  <div
                    class="list-group-item d-flex justify-content-between align-items-center"
                    :style="{
                      backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                    }"
                  >
                    <h5 class="task-title text-dark my-auto">
                      {{ element.title }} ({{ element.difficulty }})
                    </h5>
                    <button
                      class="btn btn-close ignore"
                      @click="releaseTask(employee, index)"
                    ></button>
                  </div>
                </template>
              </base-draggable>
            </div>
            <div class="badge">
              <strong>Total difficulty:</strong>
              {{ getTotalDifficulty(employee.takenTasks) }}
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    employees: { type: Array, required: true },
  },
  methods: {
    releaseTask(employee, taskIndex) {
      let deletedTask = employee.takenTasks.splice(taskIndex, 1).at(0);
      this.$emit("release-task", deletedTask);
    },
    getTotalDifficulty(takenTasks) {
      return takenTasks.reduce((total, task) => total + task?.difficulty, 0);
    },
    onTaskChoose(event) {
      event.item.style.transform = "rotate(5deg)";
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

.list-group-item {
  border-radius: 1rem !important;
  cursor: move;
  border: none;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
}

.list-group {
  padding: 0;
  min-height: 42px;
  min-width: 200px;
  height: 100%;
}

.card-employee {
  border-width: 1px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}

.badge {
  border-radius: 6px;
  margin-left: auto;
  margin-right: 16px;
  margin-bottom: 5px;
  background-color: #dee2e6;
  color: #809fb8;
  float: right;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.task-title {
  margin-right: 3px;
  font-weight: 300;
}

.name {
  font-weight: normal;
}

.skills {
  margin-top: 5px;
  float: left;
  font-weight: lighter;
}
</style>
