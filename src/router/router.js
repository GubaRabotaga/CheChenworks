import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import UserPanelView from "@/views/UserPanelView.vue";
import AuthView from "@/views/AuthView.vue";
import PermissionDeniedView from "@/views/PermissionDeniedView.vue";
import EmployeeView from "@/views/EmployeeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: { needAuth: false },
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanelView,
    meta: { needAuth: true },
    beforeEnter: (to, from, next) => {
      let roles = store.state.auth.credentials.user?.roles;

      if (!roles || !roles.includes("ADMIN")) {
        next({ name: "403" });
      } else {
        next();
      }
    },
  },
  {
    path: "/user",
    name: "UserPanel",
    component: UserPanelView,
    meta: { needAuth: true },
    beforeEnter: (to, from, next) => {
      let roles = store.state.auth.credentials.user?.roles;

      if (!roles || !roles.includes("USER")) {
        next({ name: "403" });
      } else {
        next();
      }
    },
  },
  {
    path: "/employee/:id",
    name: "Employee",
    component: EmployeeView,
    meta: { needAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
    meta: { needAuth: false },
  },
  {
    path: "/403",
    name: "403",
    component: PermissionDeniedView,
    meta: { needAuth: false },
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuth = store.state.auth.isAuth;

  if (to.meta.needAuth && !isAuth) {
    next({ name: "Auth" });
  } else {
    next();
  }
});

export default router;
