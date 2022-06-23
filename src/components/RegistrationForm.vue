<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <input
        tabindex="1"
        class="form-control"
        type="email"
        placeholder="Email"
        v-model="email"
        :class="{
          'is-invalid': v$.email.$invalid && hasChanged(1),
          'is-valid': !v$.email.$invalid,
        }"
        @input="onChange"
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
          'is-invalid': v$.name.$invalid && hasChanged(2),
          'is-valid': !v$.name.$invalid,
        }"
        @input="onChange"
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
          'is-invalid': v$.surname.$invalid && hasChanged(3),
          'is-valid': !v$.surname.$invalid,
        }"
        @input="onChange"
        required
      />
      <div class="invalid-feedback">Required</div>
    </div>
    <div class="form-group" v-show="role === 'USER'">
      <input
        tabindex="4"
        class="form-control"
        placeholder="Skills"
        v-model="skills"
        :class="{
          'is-invalid': v$.skills.$invalid && hasChanged(4),
          'is-valid': !v$.skills.$invalid,
        }"
        :type="role === 'ADMIN' ? 'hidden' : 'text'"
        @input="onChange"
      />
      <div class="invalid-feedback">Required</div>
    </div>
    <div class="form-group">
      <input
        tabindex="5"
        class="form-control"
        :class="{
          'is-invalid': v$.password.password.$invalid && hasChanged(5),
          'is-valid': !v$.password.password.$invalid,
        }"
        @input="onChange"
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
          'is-invalid': v$.password.confirm.$invalid && hasChanged(6),
          'is-valid': !v$.password.confirm.$invalid,
        }"
        @input="onChange"
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
    <div class="form-group" v-show="role === 'USER'">
      <input
        tabindex="9"
        class="form-control"
        :type="role === 'ADMIN' ? 'hidden' : 'text'"
        :class="{
          'is-invalid': v$.inviteCode.$invalid && hasChanged(9),
          'is-valid': !v$.inviteCode.$invalid,
        }"
        @input="onChange"
        placeholder="Invite code"
        v-model="inviteCode"
        required
      />
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
  requiredIf,
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
      inviteCode: "",
      activateModal: null,
    };
  },
  mounted() {
    this.activateModal = new Modal(document.getElementById("activateModal"));

    const fieldCount = document.querySelector(
      "#registration > form"
    ).childElementCount;

    for (let index = 0; index < fieldCount; index++) {
      let element = document.querySelector(
        `#registration > form > div:nth-child(${index}) > input`
      );

      if (element) {
        element.hasChanged = false;
      }
    }
  },
  methods: {
    onChange(event) {
      if (event.target.hasChanged) {
        return;
      }

      event.target.hasChanged = true;
    },
    hasChanged(index) {
      let element = document.querySelector(
        `#registration > form > div:nth-child(${index}) > input`
      );

      if (!element) {
        return false;
      }

      return element.hasChanged;
    },
    async submit() {
      await this.v$.$validate();

      if (this.v$.$error) {
        alert("Validation error, please check your input");
        return;
      }

      this.$store.dispatch("enableGlobalSpinner");

      let result = await this.$store.dispatch("auth/onRegistration", {
        email: this.email,
        password: this.password.password,
        name: this.name,
        skills: this.skills,
        surname: this.surname,
        role: this.role,
        inviteCode: this.inviteCode,
      });

      this.$store.dispatch("disableGlobalSpinner");

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
      skills: { requiredIf: requiredIf(this.role === "USER") },
      inviteCode: { requiredIf: requiredIf(this.role === "USER") },
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
