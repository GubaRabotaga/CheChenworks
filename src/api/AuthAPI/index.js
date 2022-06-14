import { AuthAPIInstance, DefaultAPIInstance } from "../index";

export const AuthAPI = {
  roles: {
    user: "USER",
    admin: "ADMIN",
  },

  async login(email, password) {
    const url = "/auth/login";
    const data = { email, password };

    return DefaultAPIInstance.post(url, data);
  },

  async registration(email, password, role, name, surname, skills) {
    const url = "/auth/registration";
    const data = { email, password, role, name, surname, skills };

    return DefaultAPIInstance.post(url, data);
  },

  async logout() {
    const url = "/logout";
    return AuthAPIInstance.post(url);
  },
};
