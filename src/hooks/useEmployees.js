import { onMounted, ref, watch } from "vue";
import { AuthAPIInstance } from "@/api";

export default function () {
  const employees = ref([]);
  const isLoading = ref(true);

  const fetchEmployees = async () => {
    try {
      let response = await AuthAPIInstance.get("/employees");
      employees.value = response.data.employees;

      employees.value.forEach((e) => {
        e.takenTasks = ref(e.takenTasks);
      });

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

  onMounted(async () => {
    await fetchEmployees();

    employees.value.forEach((e) => {
      watch(e.takenTasks, async (value) => {
        const dto = value.map((task) => {
          return {
            _id: task._id,
            isFree: false,
          };
        });

        await putEmployee(e.id, { takenTasks: dto });
      });
    });
  });

  return {
    employees,
    isLoading,
    fetchEmployees,
    putEmployee,
  };
}
