<template>
  <base-draggable
    class="row row-cols-1 row-cols-md-2 row-cols-lg-4"
    :list="tasks"
    group="tasks"
    animation="150"
    itemKey="id"
    :move="onFreeTaskMove"
    handle=".handle"
    @end="onTaskEnd"
    @choose="onTaskChoose"
    @start="onTaskStart"
    force-fallback="true"
    filter=".ignore"
  >
    <template #item="{ element }">
      <div
        class="card p-0"
        :style="{
          borderColor: $store.state.difficultyColors[element.difficulty],
        }"
      >
        <div
          class="card-header handle d-flex justify-content-between align-items-center"
          :style="{
            backgroundColor: $store.state.difficultyColors[element.difficulty],
          }"
        >
          <button
            class="btn btn-outline-dark ignore"
            data-bs-toggle="modal"
            data-bs-target="#updateTaskModal"
            @click="updateTask(element)"
          >
            <redact-icon />
          </button>
          <h5 class="text-dark my-auto">
            {{ element.title }} ({{ element.difficulty }})
          </h5>
          <move-icon />
        </div>
        <div class="card-body task-card-body">
          <p>{{ element.description }}</p>
          <files-row :links="element.attachments" />
        </div>
      </div>
    </template>
  </base-draggable>
</template>

<script>
import FilesRow from "./FilesRow.vue";

export default {
  props: {
    tasks: { type: Array, required: true },
  },
  methods: {
    onFreeTaskMove(event) {
      event.dragged.hidden = false;
    },
    onTaskChoose(event) {
      event.item.style.transform = "rotate(5deg)";
    },
    onTaskStart(event) {
      event.item.hidden = true;
    },
    onTaskEnd(event) {
      event.item.hidden = false;
    },
    updateTask(task) {
      this.$emit("update-task", task);
    },
  },
  components: { FilesRow },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.handle {
  cursor: move;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.task-card-body {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.files {
  justify-content: start;
  display: flex;
  flex-direction: row;
}
</style>
