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
                  to="/user"
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
                filter=".btn-close"
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
                      class="btn btn-close"
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
import OpenLinkIcon from "./icons/OpenLinkIcon.vue";

export default {
  props: {
    employees: { type: Array, required: true },
  },
  setup(props, context) {
    let releaseTask = (employee, taskIndex) => {
      let deletedTask = employee.takenTasks.splice(taskIndex, 1).at(0);
      context.emit("release-task", deletedTask);
    };

    console.log(props.employees);

    return {
      releaseTask,
    };
  },
  methods: {
    getTotalDifficulty(takenTasks) {
      return takenTasks.reduce((total, task) => total + task?.difficulty, 0);
    },
    onTaskChoose(event) {
      event.item.style.transform = "rotate(5deg)";
    },
  },
  emits: ["release-task"],
  components: { OpenLinkIcon },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.list-group-item {
  background-color: $teal-100;
  cursor: move;
}

.list-group {
  padding: 0;
  min-height: 42px;
  min-width: 200px;
  height: 100%;
  background-color: $gray-200;
  border-style: dotted;
  border-width: 2px;
  border-radius: 2%;
}

.card-employee {
  border-color: $primary;
  border-width: 2px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}

.badge {
  margin-left: auto;
  margin-right: 7px;
  margin-bottom: 5px;
  background-color: $info;
  float: right;
}

.task-title {
  margin-right: 3px;
}
</style>
