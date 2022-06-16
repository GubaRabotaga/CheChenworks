<template>
  <div class="text-center">
    <column :columns="columns" @release-task="onTaskRelease" />

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

    <task-list :tasks="employee.takenTasks" />

    <base-dialog id="createPostModal">
      <task-form @create="onTaskCreated" />
    </base-dialog>
  </div>
</template>

<script>
import Information from "@/components/information.vue";
import TaskList from "@/components/TaskList.vue";
import Column from "@/components/Column.vue";
import TaskForm from "@/components/TaskForm.vue";
import useColumns from "@/hooks/useColumns";
import useEmployee from "@/hooks/useEmployee";

export default {
  setup() {
    const { employee } = useEmployee();
    const { columns } = useColumns();

    return {
      employee,
      columns,
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
  components: { TaskList, Column, TaskForm, Information },
};
</script>

<style lang="scss" scoped></style>
