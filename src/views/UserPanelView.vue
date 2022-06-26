<template>
  <div class="text-center panel">
    <button class="btn btn-outline-secondary w-100 mb-5" @click="save">
      <save-icon class="btn-icon" />Save
    </button>
    <div class="spinner-border d-flex mx-auto" role="status" v-if="isLoading" />
    <column :columns="columns" v-else />
  </div>
</template>

<script>
import Column from "@/components/Column.vue";
import useColumns from "@/hooks/useColumns";
import useEmployee from "@/hooks/useEmployee";
import { AuthAPIInstance } from "@/api";
import store from "@/store";

export default {
  setup() {
    const { employee, isLoading } = useEmployee(
      store.state.auth.credentials.user.id
    );
    const { columns, closedTasks, stopedTasks, inProgressTasks, waitingTasks } =
      useColumns(employee);

    return {
      employee,
      isLoading,
      columns,
      closedTasks,
      stopedTasks,
      inProgressTasks,
      waitingTasks,
    };
  },
  methods: {
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
  components: { Column },
};
</script>

<style lang="scss" scoped></style>
