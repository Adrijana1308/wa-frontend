import axios from "axios";
import store from "./state.js";
import { update } from "lodash";

//instanciranje axiosa za potrebe backenda
let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 60000,
});

Service.interceptors.request.use(
  (config) => {
  const token = store.getters.getuser?.token;
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//objekt koji sadrzi metode za backend i pozive posta

let Posts = {
  posts: [], // Privatno polje za pohranu postova

  getPosts() {
    return this._posts;
  },

  setPosts(posts) {
    // Setter za postavljanje vrijednosti za _posts
    this._posts = posts;
  },
  async add(post) {
    try {
      return Service.post("/posts", post);
    } catch (error) {
      console.error("Greška u dodavanju kartica:", error);
      throw error;
    }
  },
  async posts() {
    try{
      let response = await Service.get("/posts");
      let data = response.data;

      data = data.map((doc) => {
        return {
          _id: doc._id || null,
          source: doc.source || null,
          name: doc.name || null,
          location: doc.location || null,
          date: doc.date || null,
          time: doc.time || null,
          numOfRatings: doc.numOfRatings || null,
          rating: doc.rating || null,
          hairstyles: doc.hairstyles || null,
          hairstyles_short: doc.hairstyles.short || null,
          hairstyles_short_type: doc.hairstyles.short.type || null,
          hairstyles_short_price: doc.hairstyles.short.price || null,
          hairstyles_short_duration: doc.hairstyles.short.duration || null,
          hairstyles_medium: doc.hairstyles.medium || null,
          hairstyles_long: doc.hairstyles.long || null,
          hairstyles_other: doc.hairstyles.other || null,
          bookings: doc.bookings || null,
          availability: doc.availability || null,
        };
      });
      return data;
    } catch(error) {
      console.log("Greška u dohvaćanju kartica", error);
      throw error;
    }
  },
  async getAllRatings() {
    try {
      let response = await Service.get("/posts");
      let data = response.data;

      // Mapiranje ID-ja i ocjena iz postova
      let ratings = data.map((doc) => ({
        _id: doc._id,
        rating: doc.rating,
      }));
      return ratings;
    } catch (error) {
      console.error("Greška u dohvaćanju ocjena:", error);
      throw error;
    }
  },
  async getBookings() {
    try {
      let response = await Service.get("/bookings");
      let data = response.data;
      return data;
    } catch (error) {
      console.error("Greška u dohvaćanju rezervacija:", error);
      throw error;
    }
  },
  async GetBookingsDate() {
    try {
      let response = await Service.get("/bookings/:date");
      let data = response.data;
      return data;
    } catch (error) {
      console.error("Greška u dohvaćanju rezervacija:", error);
      throw error;
    }
  },
  async getPostById(postId){
    try{
      const response = await Service.get(`/posts/${postId}`);
      return response.data;
    } catch (error){
      console.error("Error fetching post by ID: ", error);
      throw error;
    }
  },
  async updatePost(postId, updatedData){
    try{
      const response = await Service.put(`/posts/${postId}`, updatedData);
      return response.data;
    } catch(error) {
      console.error("Error fetching post by ID: ", error);
      throw error;
    }
  },
};

let Auth = {
  async login(username, password) {
    try {
      let response = await Service.post("/auth", {
        username: username,
        password: password,
      });

      let user = response.data;
      store.commit('setUser', user); // Use Vuex mutation to set user
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout() {
    store.commit('clearUser'); // Use Vuex mutation to clear user
  },

  getUser() {
    const user = store.getters.getuser; // Get user from Vuex store
    console.log('Retrieved user from Vuex: OVO SAM U INDEX.JS SERVIS... ', user);
    return user;
  },

  authenticated() {
    let user = this.getUser();
    if (user && user.token) {
      store.commit('setUser', user);
      return true;
    }
    store.commit('clearUser');
    return false;
  },

  async signup(user) {
    try {
      let response = await Service.post("/register", user);
      if (response.data && response.data.id) {
        return true;
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },
};

export { Service, Posts, Auth };
