<template>
  <div class="text-center">
    <h3 class="mb-5">Employees</h3>
    <div class="spinner-border" role="status" v-if="isEmployeesLoading" />
    <employees-list
      :employees="employees"
      @release-task="onTaskRelease"
      v-else
    />

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

    <div class="spinner-border" role="status" v-if="isFreeTasksLoading" />
    <task-list :tasks="freeTasks" v-else />

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
    const {
      freeTasks,
      createTask,
      putTask,
      isLoading: isFreeTasksLoading,
    } = useFreeTasks();
    const {
      employees,
      putEmployee,
      isLoading: isEmployeesLoading,
    } = useEmployees();

    return {
      freeTasks,
      createTask,
      employees,
      putEmployee,
      putTask,
      isFreeTasksLoading,
      isEmployeesLoading,
    };
  },
  methods: {
    onTaskRelease(releasedTask) {
      releasedTask.isFree = true;
      this.freeTasks.push(releasedTask);
    },
    onTaskCreated(newTask) {
      let formData = new FormData();
      for (const key in newTask) {
        if (key === "files") continue;
        formData.append(key, newTask[key]);
      }

      Array.from(newTask.files).forEach((file) => {
        formData.append("files", file);
      });

      this.createTask(formData).then((res) => {
        this.freeTasks.push(res.data.task);
      });
    },
    async save() {
      for (const index in this.employees) {
        this.employees[index].takenTasks.forEach((task) => {
          task.isFree = false;
        });

        await this.putEmployee(this.employees[index].id, {
          takenTasks: this.employees[index].takenTasks,
        });
      }

      for (const index in this.freeTasks) {
        this.freeTasks[index].isFree = true;
        await this.putTask(this.freeTasks[index]._id, this.freeTasks[index]);
      }

      location.reload();
    },
  },
  components: { TaskList, EmployeesList, TaskForm },
};
</script>

<style lang="scss" scoped></style>
