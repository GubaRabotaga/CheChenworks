import { onMounted, ref } from "vue";
import { AuthAPIInstance } from "@/api";
import store from "@/store";

export default function () {
  const employee = ref([]);
  const isLoading = ref(true);

  const fetchEmployee = async () => {
    try {
      let response = await AuthAPIInstance.get(
        `/employees/${store.state.auth.credentials.user.id}`
      );

      employee.value = response.data.employee;

      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetchEmployee);

  return {
    employee,
    isLoading,
    fetchEmployee,
  };
}
