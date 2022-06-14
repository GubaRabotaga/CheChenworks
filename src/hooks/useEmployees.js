import { onMounted, ref } from "vue";
import { AuthAPIInstance } from "@/api";

export default function () {
  const employees = ref([]);
  const isLoading = ref(true);

  const fetchEmployees = async () => {
    try {
      let response = await AuthAPIInstance.get("/employees");
      employees.value = response.data.employees;

      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const putEmployee = async (id, body) => {
    try {
      await AuthAPIInstance.put(`/employees/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetchEmployees);

  return {
    employees,
    isLoading,
    fetchEmployees,
    putEmployee,
  };
}
