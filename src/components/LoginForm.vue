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
    <!-- <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="gridCheck1"
        v-model="isPasswordRemembering"
      />
      <label class="form-check-label" for="gridCheck1">
        Remember password
      </label>
    </div> -->
    <button type="submit" class="btn btn-primary log-in-btn">Log in</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      //isPasswordRemembering: false,
    };
  },
  methods: {
    submit() {
      console.log(this.email, this.password);
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
}
</style>
