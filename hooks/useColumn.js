import { ref } from "vue";

export default function () {
  const employers = ref([
    {
      name: "Waiting",
      id: 1,
      takenTasks: [],
    },
    {
      name: "In progress",
      id: 2,
      takenTasks: [],
    },
    {
      name: "Stoped",
      id: 3,
      takenTasks: [],
    },
    {
      name: "Closed",
      id: 4,
      takenTasks: [],
    },
    
  ]);
  return {
    employers,
  };
}
