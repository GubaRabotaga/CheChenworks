<template>
  <form @submit.prevent @submit="submit">
    <div class="form-group">
      <input
        tabindex="1"
        class="form-control"
        type="email"
        placeholder="Email"
        v-model="email"
        :class="{
          'is-invalid': v$.email.$invalid,
          'is-valid': !v$.email.$invalid,
        }"
        required
      />
      <div class="invalid-feedback">Invalid email</div>
    </div>
    <div class="form-group">
      <input
        tabindex="2"
        class="form-control"
        type="text"
        placeholder="Name"
        v-model="name"
        :class="{
          'is-invalid': v$.name.$invalid,
          'is-valid': !v$.name.$invalid,
        }"
        required
      />
      <div class="invalid-feedback">Required</div>
    </div>
    <div class="form-group">
      <input
        tabindex="3"
        class="form-control"
        type="text"
        placeholder="Surname"
        v-model="surname"
        :class="{
          'is-invalid': v$.surname.$invalid,
          'is-valid': !v$.surname.$invalid,
        }"
        required
      />
      <div class="invalid-feedback">Required</div>
    </div>
    <div class="form-group">
      <input
        tabindex="4"
        class="form-control"
        type="text"
        placeholder="Skills"
        v-model="skills"
        :class="{
          'is-invalid': v$.skills.$invalid,
          'is-valid': !v$.skills.$invalid,
        }"
        required
      />
      <div class="invalid-feedback">Required</div>
    </div>
    <div class="form-group">
      <input
        tabindex="5"
        class="form-control"
        :class="{
          'is-invalid': v$.password.password.$invalid,
          'is-valid': !v$.password.password.$invalid,
        }"
        type="password"
        id="password"
        placeholder="Password"
        v-model="password.password"
        required
      />
      <div class="invalid-feedback">
        Must contain at least 6 characters and no more than 32 characters
      </div>
    </div>
    <div class="form-group">
      <input
        tabindex="6"
        class="form-control"
        :class="{
          'is-invalid': v$.password.confirm.$invalid,
          'is-valid': !v$.password.confirm.$invalid,
        }"
        type="password"
        id="passwordRepeat"
        placeholder="Confirm password"
        v-model="password.confirm"
        required
      />
      <div class="invalid-feedback">Must be equal to password field</div>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input
          tabindex="7"
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
          tabindex="8"
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
    <button
      :disabled="v$.$invalid"
      tabindex="9"
      type="submit"
      class="btn btn-primary sign-in-btn"
    >
      Sign in
    </button>
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: { password: "", confirm: "" },
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
    async submit() {
      await this.v$.$validate();

      if (this.v$.$error) {
        alert("Validation error, please check your input");
        return;
      }

      let result = await this.$store.dispatch("auth/onRegistration", {
        email: this.email,
        password: this.password.password,
        name: this.name,
        skills: this.skills,
        surname: this.surname,
        role: this.role,
      });

      if (result.name === "AxiosError") {
        alert(result.response.data.message);
      } else {
        this.activateModal.toggle();
      }
    },
  },
  validations() {
    return {
      email: { required, email },
      password: {
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(32),
        },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
      name: { required },
      surname: { required },
      skills: { required },
    };
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
