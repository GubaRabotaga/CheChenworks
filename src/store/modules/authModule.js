import { AuthAPI } from "@/api/AuthAPI";
import { DefaultAPIInstance } from "@/api";

export const authModule = {
  namespaced: true,

  state: () => {
    return {
      isAuth: localStorage.getItem("token") !== null,
      credentials: {
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      },
    };
  },

  mutations: {
    setToken(state, token) {
      state.credentials.token = token;
      localStorage.setItem("token", token);
    },
    deleteToken(state) {
      state.credentials.token = null;
      localStorage.removeItem("token");
    },
    setUser(state, user) {
      state.credentials.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    deleteUser(state) {
      state.credentials.user = null;
      localStorage.removeItem("user");
    },
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
  },

  actions: {
    async onLogin({ commit }, { email, password }) {
      try {
        const response = await AuthAPI.login(email, password);

        console.log(response);

        commit("setToken", response.data.accessToken);
        commit("setUser", response.data.user);
        commit("setIsAuth", true);

        return response;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async onRegistration(
      { commit },
      { email, password, role, name, surname, skills }
    ) {
      try {
        const response = await AuthAPI.registration(
          email,
          password,
          role,
          name,
          surname,
          skills
        );

        console.log(response);

        commit("setToken", response.data.accessToken);
        commit("setUser", response.data.user);
        commit("setIsAuth", true);

        return response;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async onLogout({ commit }) {
      try {
        const response = await AuthAPI.logout();

        console.log(response);

        commit("setIsAuth", false);
        commit("deleteToken");
        commit("setUser", null);

        return response;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async refreshToken({ commit }) {
      try {
        const response = await DefaultAPIInstance.get("/refresh");

        console.log(response);

        commit("setToken", response.data.accessToken);
        commit("setUser", response.data.user);
        commit("setIsAuth", true);

        location.reload();

        return response;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
};
