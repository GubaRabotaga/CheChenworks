<template>
  <div class="text-center panel">
    <button class="btn btn-outline-secondary w-100 mb-5" @click="save">
      <save-icon class="btn-icon" /> Save
    </button>

    <div class="mb-5 header">
      <h3 class="my-auto">Employees</h3>
      <button class="btn btn-outline-primary" @click="onInviteClicked">
        <invite-icon v-if="!isInviteCodeCopied" class="btn-icon" />
        <check-icon v-else class="btn-icon" />
        Copy invite
      </button>
    </div>

    <div class="spinner-border" role="status" v-if="isEmployeesLoading" />
    <employees-list
      :employees="employees"
      @release-task="onTaskRelease"
      @update-task="onTaskUpdate"
      v-else
    />

    <div class="my-5 mb-5 header">
      <h3 class="my-auto">Tasks</h3>

      <button
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#createTaskModal"
      >
        <plus-icon class="btn-icon" />
        Add
      </button>
    </div>

    <div class="spinner-border" role="status" v-if="isFreeTasksLoading" />
    <task-list :tasks="freeTasks" @update-task="onTaskUpdate" v-else />

    <base-dialog id="createTaskModal">
      <task-create-form @create="onTaskCreated" />
    </base-dialog>

    <base-dialog id="updateTaskModal" v-if="taskToUpdate">
      <task-update-form
        :task="taskToUpdate"
        @update="updateTask"
        @delete="deleteTask"
      />
    </base-dialog>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import EmployeesList from "@/components/EmployeesList.vue";
import TaskCreateForm from "@/components/TaskCreateForm.vue";
import TaskUpdateForm from "@/components/TaskUpdateForm.vue";
import useEmployees from "@/hooks/useEmployees";
import useFreeTasks from "@/hooks/useFreeTasks";
import store from "@/store";
import { ref, watch } from "vue";

export default {
  setup() {
    const {
      freeTasks,
      createTask,
      putTask,
      patchTask,
      deleteTask,
      isLoading: isFreeTasksLoading,
      fetchTasks,
    } = useFreeTasks();
    const {
      employees,
      putEmployee,
      fetchEmployees,
      isLoading: isEmployeesLoading,
    } = useEmployees();

    const inviteCode = ref(store.state.auth.credentials.user.project);
    const clipboard = ref();

    document.addEventListener("copy", async () => {
      clipboard.value = await navigator.clipboard.readText();
    });

    const isInviteCodeCopied = ref(false);

    watch(clipboard, () => {
      isInviteCodeCopied.value = clipboard.value === inviteCode.value;
    });

    const taskToUpdate = ref({});

    return {
      freeTasks,
      createTask,
      employees,
      putEmployee,
      putTask,
      deleteTaskReq: deleteTask,
      patchTask,
      isFreeTasksLoading,
      isEmployeesLoading,
      isInviteCodeCopied,
      inviteCode,
      taskToUpdate,
      fetchTasks,
      fetchEmployees,
    };
  },
  methods: {
    onInviteClicked() {
      navigator.clipboard.writeText(this.inviteCode);

      let event = new Event("copy");
      document.dispatchEvent(event);
    },
    onTaskRelease(releasedTask) {
      releasedTask.isFree = true;
      this.freeTasks.push(releasedTask);
    },
    onTaskUpdate(task) {
      this.taskToUpdate = task;
    },
    deleteTask(taskId) {
      this.$store.dispatch("enableGlobalSpinner");

      this.deleteTaskReq(taskId);

      this.$store.dispatch("disableGlobalSpinner");

      this.freeTasks = this.freeTasks.filter((task) => task._id !== taskId);

      this.save();
    },
    updateTask(task) {
      const old = this.freeTasks.find((t) => t._id === task._id);
      const indexOfOld = this.freeTasks.indexOf(old);

      task = { ...old, ...task };

      let formData = new FormData();
      for (const key in task) {
        if (key === "files") continue;
        formData.append(key, task[key]);
      }

      Array.from(task.files).forEach((file) => {
        formData.append("files", file);
      });

      this.$store.dispatch("enableGlobalSpinner");

      this.putTask(task._id, formData).then((res) => {
        this.freeTasks[indexOfOld] = res.data.task;
        this.save();
        this.$store.dispatch("disableGlobalSpinner");
      });
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

      this.$store.dispatch("enableGlobalSpinner");

      this.createTask(formData).then((res) => {
        this.freeTasks.push(res.data.task);
        this.$store.dispatch("disableGlobalSpinner");
      });
    },
    async save() {
      this.$store.dispatch("enableGlobalSpinner");

      for (const index in this.employees) {
        this.employees[index].takenTasks.forEach((task) => {
          task.isFree = false;
        });

        await this.putEmployee(this.employees[index].id, {
          takenTasks: this.employees[index].takenTasks,
        });
      }

      for (const index in this.freeTasks) {
        await this.patchTask(this.freeTasks[index]._id, { isFree: true });
      }

      await this.fetchEmployees();
      await this.fetchTasks();

      this.$store.dispatch("disableGlobalSpinner");
    },
  },
  components: { TaskList, EmployeesList, TaskCreateForm, TaskUpdateForm },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  flex-direction: row;
}
</style>
