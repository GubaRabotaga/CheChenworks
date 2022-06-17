import { ref } from "vue";

export default function () {
  const tasks = ref([
    {
      title: "JS",
      description:
        "Et quas placeat ducimus. Mollitia laboriosam inventore blanditiis rerum eius eaque labore sequi. Id consequatur fugit molestiae sunt iste. Tempore qui omnis amet asperiores. Voluptates eos qui dolor qui est quis ut ut.…",
      difficulty: 10,
      creator:"User",
      donePercents: 95,
      Uphere: false,
      deadline: "2022-06-15T10:09:00.000Z",
      startTime: "2022-06-14T10:00:30.140Z",
      takenTasks: Array(0),
      usedHours:0,
      usedMinutes:0
    },
    {
      title: "JS",
      description:
        "Et quas placeat ducimus. Mollitia laboriosam inventore blanditiis rerum eius eaque labore sequi. Id consequatur fugit molestiae sunt iste. Tempore qui omnis amet asperiores. Voluptates eos qui dolor qui est quis ut ut.…",
      difficulty: 2,
      creator:"User",
      donePercents: 15,
      Uphere: false,
      Uphere2: false,
      deadline: "2022-06-15T10:09:00.000Z",
      startTime: "2022-06-14T10:09:30.140Z",
      takenTasks: Array(0),
      usedHours: 0,
      usedMinutes: 0
    },
    {
      title: "JS",
      description:
        "Et quas placeat ducimus. Mollitia laboriosam inventore blanditiis rerum eius eaque labore sequi. Id consequatur fugit molestiae sunt iste. Tempore qui omnis amet asperiores. Voluptates eos qui dolor qui est quis ut ut.…",
      difficulty: 7,
      creator:"User",
      donePercents: 15,
      Uphere: false,
      deadline: "2022-06-15T10:09:00.000Z",
      startTime: "2022-06-14T10:09:30.140Z",
      takenTasks: Array(0),
      usedHours:0,
      usedMinutes:0
    },
  ]);
  return {
    tasks,
  };
}
