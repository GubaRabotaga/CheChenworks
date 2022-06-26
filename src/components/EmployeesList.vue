<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="employee in employees" :key="employee.id">
          <div class="card card-employee">
            <div class="card-header">
              <h3 class="d-flex align-items-center">
                {{ employee.name }} {{ employee.surname }}
                <router-link
                  class="btn btn-outline-success"
                  style="margin-left: auto; float: right"
                  :to="`/employee/${employee.user}`"
                >
                  <open-link-icon />
                </router-link>
              </h3>
              <h6 style="margin-top: 5px; align: bottom; float: left">
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
              Total difficulty:
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
  border-radius: 2rem !important;
  cursor: move;
}

.list-group {
  padding: 0;
  min-height: 42px;
  min-width: 200px;
  height: 100%;
}

.card-employee {
  border-width: 2px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}

.badge {
  border-radius: 2rem;
  margin-left: auto;
  margin-right: 16px;
  margin-bottom: 5px;
  background-color: #99b2c6;
  float: right;
}

.task-title {
  margin-right: 3px;
}
</style>
