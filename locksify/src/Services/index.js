import axios from "axios";
import state from "./state";

//instanciranje axiosa za potrebe backenda
let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
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
  },
  async getAllRatings() {
    try {
      let response = await Service.get("/posts");
      //let data = response.data;

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

  async GetBookings() {
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
  async bookAppointment(appointment) {
    try {
      return Service.post("/bookings", appointment);
    } catch (error) {
      console.error("Greška u dodavanju rezervacija:", error);
      throw error;
    }
  },
};

let Auth = {
  async login(username, password){
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });

    let user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    state.actions.setUser(user);

    return true;
  }, 
  logout(){
    localStorage.removeItem('user');
    state.actions.clearUser();
  },
  getUser(){
    // console.log(localStorage.getItem('user')); ako mi ikad za sad treba...
    return JSON.parse(localStorage.getItem('user'));
  },
  authenticated(){
    let user = Auth.getUser();
    if(user && user.token){
      state.actions.setUser(user);
      return true;
    }
    state.actions.clearUser();
    return false;
  },
  // isBusinessUser(){
  //   let user = Auth.getUser();
  //   if(user && user.isBusinessUser){      mozda ne treba??? brisati ako radi!!!!
  //     return true;
  //   }
  //   return false;
  // },
  state: {
    get authenticated(){
      return Auth.authenticated();
    },
    // get isBusinessUser(){
    //   return Auth.isBusinessUser();
    // }
  },
  async signup(user){
    try{
      let response = await Service.post("/register", user);
      if(response.data && response.data.id){
        return true;
      }
      //throw new Error("Signup failed");
      console.log(response.data);
      return response.data;
    }catch(error){
      console.error("Signup error: ", error);
      throw error;
    }
  }
};

export { Service, Posts, Auth };
