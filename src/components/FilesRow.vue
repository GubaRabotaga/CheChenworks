<template>
  <div class="files">
    <a
      target="_blank"
      rel="noopener noreferrer"
      :href="baseFilesUrl + link"
      v-for="link in links"
    >
      <div class="card" style="height: min-content; width: min-content">
        <div class="card-body p-2">
          <file-icon />
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseFilesUrl: `${import.meta.env.VITE_API_URL}/static/uploads/`,
    };
  },
  props: {
    links: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.files {
  justify-content: start;
  display: flex;
  flex-direction: row;
}

a {
  margin-right: 5px;
}
</style>
