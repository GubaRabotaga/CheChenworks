<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container">
      <router-link class="navbar-brand m-0" to="/">Project manager</router-link>
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
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">User</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/auth">Authorization</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-item {
  align-self: center;
}
</style>
