<template>
  <div class="text-center">
    <h3 class="mb-5">Employers</h3>
    <employer-list :employers="employers" @release-task="onTaskRelease" />

    <div class="row my-5">
      <div class="col">
        <button class="btn btn-danger">Delete</button>
      </div>
      <div class="col">
        <h3 class="text-center">Tasks</h3>
      </div>
      <div class="col">
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
        >
          Add
        </button>
      </div>
    </div>

    <task-list :tasks="tasks" />

    <base-dialog id="createPostModal">
      <task-form @create="onTaskCreated" />
    </base-dialog>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import EmployerList from "@/components/EmployerList.vue";
import TaskForm from "@/components/TaskForm.vue";
import useEmployers from "@/hooks/useEmployers";
import useFreeTasks from "@/hooks/useFreeTasks";

export default {
  setup() {
    const { tasks } = useFreeTasks();
    const { employers } = useEmployers();

    return {
      tasks,
      employers,
    };
  },
  methods: {
    onTaskRelease(releasedTask) {
      this.tasks.push(releasedTask);
    },
    onTaskCreated(newTask) {
      this.tasks.push(newTask);
    },
  },
  components: { TaskList, EmployerList, TaskForm },
};
</script>

<style lang="scss" scoped></style>
