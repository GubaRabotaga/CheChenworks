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
    <button type="submit" class="btn btn-outline-secondary log-in-btn">
      Log in
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      this.$store.dispatch("enableGlobalSpinner");

      let result = await this.$store.dispatch("auth/onLogin", {
        email: this.email,
        password: this.password,
      });

      this.$store.dispatch("disableGlobalSpinner");

      if (result.name === "AxiosError") {
        alert(result.response.data.message);
        return;
      }

      let link = this.$store.state.auth.credentials.user.roles.at(0);

      if (!link) {
        return;
      }

      link = link.trim().toLowerCase();

      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;
}

.log-in-btn {
  margin-top: 20px;
  width: 100%;
  border-radius: 0.6rem;
  border-color: transparent;
  font-weight: 500;
}
</style>
