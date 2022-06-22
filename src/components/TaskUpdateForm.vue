<template>
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title" id="modalLabel">Task update</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <form @submit.prevent id="task-update-form" @submit="submit">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model="newTask.title"
            placeholder="Title"
            required
          />
        </div>
        <div class="form-group">
          <div class="form-outline">
            <textarea
              class="form-control"
              id="descriptionTextArea"
              rows="4"
              placeholder="Description"
              v-model="newTask.description"
            ></textarea>
          </div>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="number"
            placeholder="Difficulty (1 to 10)"
            v-model="newTask.difficulty"
            min="1"
            max="10"
            required
          />
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="datetime-local"
            placeholder="Deadline"
            v-model="newTask.deadline"
            required
          />
        </div>
        <div class="form-group">
          <input class="form-control" type="file" ref="file" multiple />
        </div>
        <button
          class="btn btn-outline-danger w-100"
          @click.prevent="deleteTask"
        >
          <delete-icon /> Delete
        </button>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary" form="task-update-form">
        Update
      </button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { Modal } from "bootstrap";

export default {
  setup(props) {
    const file = ref([]);

    const getFiles = () => {
      return file.value.files;
    };

    let localeDate = "";

    if (props.task.deadline) {
      const d = new Date(props.task.deadline);
      localeDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, -1);
    }

    const newTask = ref({
      _id: props.task._id,
      title: props.task.title,
      description: props.task.description,
      difficulty: props.task.difficulty,
      deadline: localeDate,
      files: [],
    });

    watch(
      () => props.task,
      (newValue) => {
        const d = new Date(props.task.deadline);
        const localeDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, -1);

        newTask.value = {
          _id: newValue._id,
          title: newValue.title,
          description: newValue.description,
          difficulty: newValue.difficulty,
          deadline: localeDate,
          files: [],
        };
      }
    );

    return {
      getFiles,
      file,
      newTask,
    };
  },
  props: {
    task: { type: Object, required: true },
  },
  methods: {
    deleteTask() {
      if (!confirm("Are you sure?")) {
        return;
      }

      this.$emit("delete", this.task._id);

      const element = document.getElementById("updateTaskModal");
      const modal = Modal.getInstance(element);

      modal.hide();
    },
    update() {
      this.$emit("update", this.newTask);

      const element = document.getElementById("updateTaskModal");
      const modal = Modal.getInstance(element);

      modal.hide();
    },
    async submit() {
      this.newTask.files = this.getFiles();
      this.update();
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>
