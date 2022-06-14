import { ref } from "vue";

export default function () {
  const tasks = ref([
    {
      title: "JS",
      description:
        "Et quas placeat ducimus. Mollitia laboriosam inventore blanditiis rerum eius eaque labore sequi. Id consequatur fugit molestiae sunt iste. Tempore qui omnis amet asperiores. Voluptates eos qui dolor qui est quis ut ut.…",
      id: 1,
      difficulty: 1,
      creator:"Admin"  ,
      standard:"5h",
      progress: "0%",
      Uphere: false
    },
    {
      title: "JS",
      description:
        "Et quas placeat ducimus. Mollitia laboriosam inventore blanditiis rerum eius eaque labore sequi. Id consequatur fugit molestiae sunt iste. Tempore qui omnis amet asperiores. Voluptates eos qui dolor qui est quis ut ut.…",
      id: 2,
      difficulty: 10,
      creator:"User",
      standard:"10h",
      progress: "0%",
      Uphere: false
    },
  ]);
  return {
    tasks,
  };
}
