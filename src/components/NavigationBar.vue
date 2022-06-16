<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container">
      <a
        class="navbar-brand nav-link m-0"
        @click="goToPanel"
        style="cursor: pointer"
        >Project manager</a
      >
      <button
        id="navbar-toggler"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="$store.state.auth.isAuth">
            <button class="btn btn-outline-light" @click="logout">
              <logout-icon />
            </button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/auth">Authorization</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import LogoutIcon from "./icons/LogoutIcon.vue";

export default {
  methods: {
    goToPanel() {
      let link = this.$store.state.auth.credentials.user?.roles?.at(0);

      if (!link) {
        return;
      }

      link = link.trim().toLowerCase();

      this.$router.push(link);
    },
    async logout() {
      await this.$store.dispatch("auth/onLogout");
      this.$router.push("/auth");
    },
  },
  components: { LogoutIcon },
};
</script>

<style lang="scss" scoped>
.nav-item {
  align-self: center;
}
</style>
