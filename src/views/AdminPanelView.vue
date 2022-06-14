<template>
  <div class="text-center">
    <h3 class="mb-5">Employees</h3>
    <employees-list :employees="employees" @release-task="onTaskRelease" />

    <div class="row my-5">
      <div class="col">
        <button class="btn btn-info" @click="save">Save</button>
      </div>
      <div class="col">
        <h3 class="text-center">Tasks</h3>
      </div>
      <div class="col">
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createTaskModal"
        >
          Add
        </button>
      </div>
    </div>

    <task-list :tasks="freeTasks" />

    <base-dialog id="createTaskModal">
      <task-form @create="onTaskCreated" />
    </base-dialog>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import EmployeesList from "@/components/EmployeesList.vue";
import TaskForm from "@/components/TaskForm.vue";
import useEmployees from "@/hooks/useEmployees";
import useFreeTasks from "@/hooks/useFreeTasks";

export default {
  setup() {
    const { freeTasks, createTask, putTask } = useFreeTasks();
    const { employees, putEmployee } = useEmployees();

    console.log(freeTasks, employees);

    return {
      freeTasks,
      createTask,
      employees,
      putEmployee,
      putTask,
    };
  },
  methods: {
    onTaskRelease(releasedTask) {
      releasedTask.isFree = true;
      this.freeTasks.push(releasedTask);
    },
    onTaskCreated(newTask) {
      this.freeTasks.push(newTask);
      this.createTask(newTask);
    },
    save() {
      this.employees.forEach(async (employee) => {
        employee.takenTasks.forEach((task) => {
          task.isFree = false;
        });
        await this.putEmployee(employee.id, {
          takenTasks: employee.takenTasks,
        });
      });

      this.freeTasks.forEach(async (task) => {
        task.isFree = true;
        await this.putTask(task._id, task);
      });

      location.reload();
    },
  },
  components: { TaskList, EmployeesList, TaskForm },
};
</script>

<style lang="scss" scoped></style>
