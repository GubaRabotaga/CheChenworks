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
      <div class="card p-0">
        <div
          class="card-header handle d-flex justify-content-between align-items-center"
        >
          <h5 class="text-primary my-auto">
            {{ element.title }} {{ element.id }}
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
import useFreeTasks from "@/hooks/useFreeTasks";
import MoveIcon from "./icons/MoveIcon.vue";

export default {
  name: "task-list",
  setup() {
    const { tasks } = useFreeTasks();
    return {
      tasks,
    };
  },
  methods: {
    onFreeTaskMove(event) {
      event.dragged.hidden = false;
      event.dragged.lastElementChild.hidden = true;
      event.dragged.firstElementChild.style.backgroundColor = "var(--bs-info)";
    },
    onFreeTaskUnchoose(event) {
      event.item.lastElementChild.hidden = false;
      event.item.firstElementChild.style.backgroundColor = "";
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
  background-color: $teal-100;
  cursor: move;
}
</style>
