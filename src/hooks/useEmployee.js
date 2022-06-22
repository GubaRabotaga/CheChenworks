import { onMounted, ref } from "vue";
import { AuthAPIInstance } from "@/api";
import store from "@/store";

export default function (employeeUserId) {
  const employee = ref(null);
  const isLoading = ref(true);

  const fetchEmployee = async () => {
    try {
      let response = await AuthAPIInstance.get(`/employees/${employeeUserId}`);

      employee.value = response.data.employee;

      const directorResponse = await AuthAPIInstance.get(
        `/project/${store.state.auth.credentials.user.project}`
      );

      for (const index in employee.value.takenTasks) {
        employee.value.takenTasks[index].director =
          directorResponse.data.director;
      }

      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const putEmployee = async (body) => {
    try {
      await AuthAPIInstance.put(`/employees/${employee.value.id}`, body);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetchEmployee);

  return {
    employee,
    isLoading,
    fetchEmployee,
    putEmployee,
  };
}
