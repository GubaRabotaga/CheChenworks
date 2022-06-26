<template>
  <div class="container">
    <div class="card mx-auto">
      <div class="card-header">
        <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="authorization-tab"
              data-bs-toggle="pill"
              data-bs-target="#authorization"
              type="button"
              role="tab"
              aria-controls="authorization"
              aria-selected="true"
            >
              Authorization
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="registration-tab"
              data-bs-toggle="pill"
              data-bs-target="#registration"
              type="button"
              role="tab"
              aria-controls="registration"
              aria-selected="false"
            >
              Registration
            </button>
          </li>
        </ul>
      </div>

      <div class="card-body">
        <div class="tab-pane fade show active" id="authorization">
          <login-form />
        </div>
        <div class="tab-pane fade" id="registration">
          <registration-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";

export default {
  components: { LoginForm, RegistrationForm },
};
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  align-self: center;
}

.container {
  min-height: 91vh;
  display: flex;
}

.card-body {
  padding: 2em;
}

.fade:not(.show) {
  display: none !important;
}
</style>
