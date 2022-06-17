<template>
  <base-draggable
    class="row row-cols-1 row-cols-md-2 row-cols-lg-4"
    :list="tasks"
    group="tasks"
    animation="150"
    itemKey="id"
    :move="onFreeTaskMove"
    handle=".handle"
    @unchoose="onFreeTaskUnchoose"
    @choose="onTaskChoose"
    @start="onTaskStart"
    force-fallback="true"
    forceAutoscrollFallback="true"
    scrollSensitivity="50"
    scrollSpeed="25"
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
          <h5 class="text-dark my-auto">
            {{ element.title }} ({{ element.difficulty }})
          </h5>
          <move-icon />
        </div>
        <div class="card-body">
          <p>{{ element.description }}</p>
        </div>
      </div>
    </template>
  </base-draggable>
</template>

<script>
import MoveIcon from "@/components/icons/MoveIcon.vue";

export default {
  props: {
    tasks: { type: Array, required: true },
  },
  methods: {
    onFreeTaskMove(event) {
      event.dragged.hidden = false;
      event.dragged.lastElementChild.hidden = true;
    },
    onFreeTaskUnchoose(event) {
      event.item.lastElementChild.hidden = false;
    },
    onTaskChoose(event) {
      event.item.style.transform = "rotate(5deg)";
    },
    onTaskStart(event) {
      event.item.hidden = true;
    },
  },
  components: { MoveIcon },
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
</style>
