<template>
  <form @submit.prevent @submit="submit">
    <div class="form-group">
      <input
        class="form-control"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        type="text"
        placeholder="Name"
        v-model="name"
        required
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        type="text"
        placeholder="Surname"
        v-model="surname"
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        type="text"
        placeholder="Skills"
        v-model="skills"
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        type="password"
        placeholder="Repeat password"
        v-model="passwordRepeat"
        required
      />
    </div>
    <div class="form-group">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios1"
          value="USER"
          v-model="role"
          checked
        />
        <label class="form-check-label" for="gridRadios1">User</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios2"
          value="ADMIN"
          v-model="role"
        />
        <label class="form-check-label" for="gridRadios2">Admin</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary sign-in-btn">Sign in</button>
  </form>

  <div class="modal fade" id="activateModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Activate your account</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>Follow instructions on your email</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      name: "",
      surname: "",
      skills: "",
      role: "USER",
      activateModal: null,
    };
  },
  mounted() {
    this.activateModal = new Modal(document.getElementById("activateModal"));
  },
  methods: {
    submit() {
      this.activateModal.toggle();
      this.$store.dispatch("auth/onRegistration", {
        email: this.email,
        password: this.password,
        name: this.name,
        skills: this.skills,
        surname: this.surname,
        role: this.role,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;
}

.sign-in-btn {
  margin-top: 20px;
  width: 100%;
}
</style>
