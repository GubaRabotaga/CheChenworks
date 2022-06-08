<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="employer in employers" :key="employer.id">
          <div class="card card-employer">
            <div class="card-header">
              <h3>{{ employer.name }}</h3>
            </div>
            <div class="card-body">
              <base-draggable
                class="list-group"
                :list="employer.takenTasks"
                animation="150"
                group="tasks"
                itemKey="id"
                @choose="onTaskChoose"
              >
                <template #item="{ element }">
                  <div
                    class="list-group-item d-flex justify-content-between align-items-center"
                    style="cursor: move"
                  >
                    <h5 class="text-primary my-auto">
                      {{ element.title }} {{ element.id }}
                    </h5>
                  </div>
                </template>
              </base-draggable>
              <h6 style="margin-top: 5px; align: bottom">
                {{ employer.skills }}
              </h6>
            </div>
            <h6 class="badge">
              {{ employer.takenTasks.length }}
            </h6>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import useEmployers from "@/hooks/useEmployers";

export default {
  setup() {
    const { employers } = useEmployers();

    return {
      employers,
    };
  },
  methods: {
    onTaskChoose(event) {
      event.item.style.transform = "rotate(5deg)";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.list-group-item {
  background-color: $teal-100;
  cursor: move;
}

.list-group {
  padding: 0;
  min-height: 42px;
  min-width: 200px;
  height: 100%;
  border-style: dotted;
  border-width: 2px;
  border-radius: 2%;
}

.card-employer {
  border-color: $indigo;
  border-width: 2px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}

.badge {
  margin-left: auto;
  margin-right: 7px;
  background-color: $secondary;
  float: right;
}
</style>
