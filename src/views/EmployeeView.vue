<template>
  <div class="spinner-border d-flex mx-auto" role="status" v-if="isLoading" />
  <span class="container horizontal-scrollable p-0" v-else>
    <div class="row">
      <div class="col mb-3" v-for="column in columns" :key="column.id">
        <div class="card card-columns">
          <div class="card-header">
            <h3 class="d-flex align-items-center">
              {{ column.name }}
            </h3>
          </div>
          <div class="card-body">
            <div v-for="element in column.takenTasks" :key="element.id">
              <div
                class="card-header"
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
                  <h5><strong>Standard: </strong>{{ getHours(element) }}h</h5>
                  <h5><strong>Used: </strong> {{ element.usedHours }}h</h5>
                  <h5>
                    <strong>Progress: </strong
                    >{{ Math.trunc(element.donePercents * 100) }}%
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
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { useRoute } from "vue-router";
import useEmployee from "@/hooks/useEmployee";
import useColumns from "@/hooks/useColumns";
import FilesRow from "@/components/FilesRow.vue";

export default {
  setup() {
    const route = useRoute();
    const { employee, isLoading } = useEmployee(route.params.id);
    const { columns, closedTasks, stopedTasks, inProgressTasks, waitingTasks } =
      useColumns(employee);

    return {
      employee,
      columns,
      closedTasks,
      stopedTasks,
      inProgressTasks,
      waitingTasks,
      isLoading,
    };
  },
  methods: {
    getHours(task) {
      let date1 = new Date(task.deadline);
      let date2 = new Date(task.startTime);
      let diff = date1.getTime() - date2.getTime();
      return parseInt(diff / (1000 * 60 * 60));
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
