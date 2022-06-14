import { onMounted, ref } from "vue";
import { AuthAPIInstance } from "@/api";

export default function () {
  const freeTasks = ref([]);
  const isLoading = ref(true);

  const fetchTasks = async () => {
    try {
      let response = await AuthAPIInstance.get("/tasks");
      let tasks = response.data.tasks;

      freeTasks.value = tasks.filter((task) => task.isFree);

      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (body) => {
    try {
      await AuthAPIInstance.post("/tasks", body);
    } catch (error) {
      console.log(error);
    }
  };

  const putTask = async (id, body) => {
    try {
      await AuthAPIInstance.put(`/tasks/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetchTasks);

  return {
    freeTasks,
    isLoading,
    fetchTasks,
    createTask,
    putTask,
  };
}
