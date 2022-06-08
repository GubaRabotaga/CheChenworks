<template>
  <h3 class="mb-5">Employers</h3>
  <employer-list />

  <h3 class="my-5">Tasks</h3>
  <task-list />
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import EmployerList from "@/components/EmployerList.vue";

export default {
  components: { TaskList, EmployerList },
};
</script>

<style lang="scss" scoped></style>
