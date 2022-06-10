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
          value="user"
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
          value="admin"
          v-model="role"
        />
        <label class="form-check-label" for="gridRadios2">Admin</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary sign-in-btn">Sign in</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      role: "user",
    };
  },
  methods: {
    submit() {
      console.log(this.email, this.password, this.passwordRepeat, this.role);
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
