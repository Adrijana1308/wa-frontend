import { createStore } from "vuex";
import { Auth } from "@/Services";
import axios from "axios";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    isBusinessUser:
      JSON.parse(localStorage.getItem("user"))?.userType === "business" ||
      false,
    isSuperAdmin:
      JSON.parse(localStorage.getItem("user"))?.role === "superadmin" || false,
    token: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null,
    posts: [],
  },

  mutations: {
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    SET_POST(state, posts) {
      state.posts = posts;
    },
    setUser(state, user) {
      console.log("Setting user in vuex: U STATE.JSU SAM...", user);
      state.user = user;
      state.isAuthenticated = !!user;
      state.isBusinessUser = user?.userType === "business";
      state.isSuperAdmin = user?.role === "superadmin";
      state.token = user.token;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isBusinessUser = false;
      state.isSuperAdmin = false;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
  actions: {
    async add({ commit, getters }, postData) {
      try {
        const token = getters.getuser?.token;
        const response = await axios.post(
          "https://wa-backend-c3kr.onrender.com/posts",
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("ADD_POST", response.data);
      } catch (error) {
        console.error("Error creating post: STATE.JS", error);
        throw error;
      }
    },
    async fetcPosts({ commit }) {
      try {
        const response = await axios.get(
          "https://wa-backend-c3kr.onrender.com/posts"
        );
        commit("SET_POST", response.data);
      } catch (error) {
        console.error("Error fetching posts: STATE.JS", error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const success = await Auth.login(email, password);
        if (success) {
          const user = Auth.getUser();
          commit("setUser", user);
          return true;
        }
      } catch (error) {
        console.error("Login failed: ", error);
        return false;
      }
    },
    async signup({ commit }, userData) {
      try {
        const response = await axios.post(
          "https://wa-backend-c3kr.onrender.com/register",
          userData
        );
        if (response.data && response.data.id) {
          const user = {
            ...userData,
            _id: response.data._id,
          };
          commit("setUser", user);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Signup error:", error);
        return false;
      }
    },
    clearUser({ commit }) {
      commit("clearUser");
    },
  },

  getters: {
    getuser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    isBusinessUser: (state) => state.isBusinessUser,
    isSuperAdmin: (state) => state.isSuperAdmin,
    currentUserId: (state) => state.user?._id || null,
    posts: (state) => state.posts,
    token: (state) => state.user?.token,
  },
});

export default store;
