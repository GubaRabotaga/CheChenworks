<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-dialog",
};
</script>

<style scoped></style>
