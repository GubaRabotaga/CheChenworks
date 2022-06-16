<template>
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title" id="modalLabel">Task creation</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <form @submit.prevent id="task-form" @submit="submit">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model="task.title"
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
              v-model="task.description"
            ></textarea>
          </div>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="number"
            placeholder="Difficulty (1 to 10)"
            v-model="task.difficulty"
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
            v-model="task.deadline"
            required
          />
        </div>
        <div class="form-group">
          <input class="form-control" type="file" ref="file" multiple />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary" form="task-form">
        Create
      </button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const file = ref([]);

    const handleFileUpload = async () => {
      return file.value.files;
    };

    return {
      handleFileUpload,
      file,
    };
  },
  data() {
    return {
      task: {
        title: "",
        description: "",
        difficulty: "",
        deadline: "",
        files: [],
      },
    };
  },
  methods: {
    createTask() {
      console.log(this.task);
      this.$emit("create", this.task);
      this.task = {
        title: "",
        description: "",
        difficulty: "",
        deadline: "",
        files: [],
      };
    },
    async submit() {
      this.task.files = await this.handleFileUpload();
      this.createTask();
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
