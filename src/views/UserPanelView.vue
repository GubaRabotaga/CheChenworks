<template>
  <div class="text-center panel">
    <div class="spinner-border d-flex mx-auto" role="status" v-if="isLoading" />
    <column :columns="columns" @task-add="createTask" v-else />
  </div>

  <base-dialog id="createTaskModal">
    <task-create-form @create="onTaskCreated" />
  </base-dialog>
</template>

<script>
import Column from "@/components/Column.vue";
import TaskCreateForm from "@/components/TaskCreateForm.vue";
import useColumns from "@/hooks/useColumns";
import useEmployee from "@/hooks/useEmployee";
import { AuthAPIInstance, FormAuthAPIInstance } from "@/api";
import store from "@/store";
import { ref } from "vue";

export default {
  setup() {
    const { employee, isLoading, putEmployee } = useEmployee(
      store.state.auth.credentials.user.id
    );
    const { columns, closedTasks, stopedTasks, inProgressTasks, waitingTasks } =
      useColumns(employee);

    const currentTaskState = ref(null);

    return {
      employee,
      isLoading,
      columns,
      closedTasks,
      stopedTasks,
      inProgressTasks,
      waitingTasks,
      currentTaskState,
      putEmployee,
    };
  },
  methods: {
    async onTaskCreated(task) {
      this.$store.dispatch("enableGlobalSpinner");

      task.isFree = false;
      task.state = this.currentTaskState;

      let formData = new FormData();

      for (const key in task) {
        if (key === "files") continue;
        formData.append(key, task[key]);
      }

      Array.from(task.files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await FormAuthAPIInstance.post("/tasks", formData);
      const createdTask = response.data.task;

      await this.putEmployee({
        takenTasks: [...this.employee.takenTasks, createdTask],
      });

      const directorResponse = await AuthAPIInstance.get(
        `/project/${store.state.auth.credentials.user.project}`
      );

      createdTask.director = directorResponse.data.director;

      const column = this.columns.find(
        (column) => column.name.toLowerCase() === task.state
      );

      console.log(createdTask, column);

      column.takenTasks.push(createdTask);

      this.$store.dispatch("disableGlobalSpinner");
    },
    async createTask(taskState) {
      this.currentTaskState = taskState;
    },
    async save() {
      this.$store.dispatch("enableGlobalSpinner");

      for (const i in this.columns) {
        await this.columns[i].takenTasks.forEach(async (task) => {
          task.state = this.columns[i].name.toLowerCase();

          const body = {
            donePercents: task.donePercents,
            state: task.state,
            usedHours: task.usedHours,
          };

          await AuthAPIInstance.patch(`/tasks/${task._id}`, body);
        });
      }

      this.$store.dispatch("disableGlobalSpinner");
    },
  },
  components: { Column, TaskCreateForm },
};
</script>

<style lang="scss" scoped></style>
