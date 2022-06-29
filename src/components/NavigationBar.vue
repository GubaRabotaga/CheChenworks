<template>
  <nav class="bg-light navbar">
    <router-link class="navbar-brand nav-link m-0" to="/"
      >Project manager</router-link
    >
    <button class="btn menu-btn p-0" @click="expand">
      <menu-icon />
    </button>
    <ul class="nav-buttons no-text" id="nav-buttons">
      <li class="nav-item" v-if="$store.state.auth.isAuth">
        <a
          class="nav-link"
          :class="{
            active: $route.name === 'UserPanel' || $route.name === 'AdminPanel',
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
          <person-workspace-icon class="btn-icon" />Authorization</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: true,
    };
  },
  methods: {
    expand() {
      const element = document.querySelector("#nav-buttons");

      if (this.isExpanded) {
        element.classList.remove("no-text");
      } else {
        element.classList.add("no-text");
      }

      this.isExpanded = !this.isExpanded;
    },
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
a {
  cursor: pointer;
}

@media only screen and (max-width: 992px) {
  .menu-btn {
    display: block !important;
  }
}
@media only screen and (max-width: 992px) {
  .nav-buttons.no-text > .nav-item > .nav-link {
    font-size: 0;
    justify-content: center !important;
  }

  .nav-buttons.no-text > .nav-item > .nav-link > .btn-icon {
    margin: 0 !important;
  }
}

.menu-btn {
  display: none;
  width: 100%;
  margin-left: 5px;
  margin-bottom: 20px;
}
</style>
