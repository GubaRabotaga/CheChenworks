<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand nav-link m-0" to="/"
        >Project manager</router-link
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
            <a
              class="nav-link"
              :class="{
                active:
                  $route.name === 'UserPanel' || $route.name === 'AdminPanel',
              }"
              @click="goToPanel"
              ><dashboard-icon class="btn-icon" /> DashBoard</a
            >
          </li>
          <li class="nav-item" v-if="$store.state.auth.isAuth">
            <a class="nav-link" @click="logout"
              ><logout-icon class="btn-icon" /> Log out</a
            >
          </li>
          <li class="nav-item" v-else>
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'Auth' }"
              to="/auth"
            >
              <person-workspace-icon
                class="btn-icon"
              />Authorization</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    goToPanel() {
      let link = this.$store.state.auth.credentials.user?.roles?.at(0);

      if (!link) {
        return;
      }

      link = "/" + link.trim().toLowerCase();

      this.$router.push(link);
    },
    async logout() {
      await this.$store.dispatch("auth/onLogout");
      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  align-self: center;
}

a {
  cursor: pointer;
}
</style>
