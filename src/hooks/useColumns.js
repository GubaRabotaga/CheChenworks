import { computed, watch, ref, onMounted } from "vue";
import { AuthAPIInstance } from "@/api";

export default function (employee) {
  const waitingTasks = computed(() => {
    return employee.value?.takenTasks.filter(
      (task) => task.state === "waiting"
    );
  });

  const inProgressTasks = computed(() => {
    return employee.value?.takenTasks.filter(
      (task) => task.state === "in progress"
    );
  });

  const stopedTasks = computed(() => {
    return employee.value?.takenTasks.filter((task) => task.state === "stoped");
  });

  const closedTasks = computed(() => {
    return employee.value?.takenTasks.filter((task) => task.state === "closed");
  });

  const columns = ref([
    {
      name: "Waiting",
      id: 1,
      takenTasks: waitingTasks.value,
      displayName: "To Do`s",
    },
    {
      name: "In progress",
      id: 2,
      takenTasks: inProgressTasks.value,
      displayName: "In progress",
    },
    {
      name: "Stoped",
      id: 3,
      takenTasks: stopedTasks.value,
      displayName: "Review",
    },
    {
      name: "Closed",
      id: 4,
      takenTasks: closedTasks.value,
      displayName: "Done",
    },
  ]);

  onMounted(() => {
    watch(
      [waitingTasks, inProgressTasks, stopedTasks, closedTasks],
      (array) => {
        for (let index = 0; index < array.length; index++) {
          columns.value[index].takenTasks = array[index];
        }
      }
    );

    watch(
      [
        columns.value.at(0),
        columns.value.at(1),
        columns.value.at(2),
        columns.value.at(3),
      ],
      (array) => {
        for (let index = 0; index < array.length; index++) {
          columns.value[index].takenTasks.forEach(async (task) => {
            if (task.state !== columns.value[index].name.toLowerCase()) {
              task.state = columns.value[index].name.toLowerCase();
              await AuthAPIInstance.patch(`/tasks/${task._id}`, {
                state: task.state,
              });
            }
          });
        }
      }
    );
  });

  return {
    columns,
    closedTasks,
    stopedTasks,
    inProgressTasks,
    waitingTasks,
  };
}
