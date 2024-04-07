import axios from "axios";

//instanciranje axiosa za potrebe backenda
let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

//objekt koji sadrzi metode za backend i pozive posta

let Posts = {
  _posts: [], // Privatno polje za pohranu postova

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
        _id: doc._id,
        source: doc.source,
        name: doc.name,
        location: doc.location,
        date: doc.date,
        time: doc.time,
        numOfRatings: doc.numOfRatings,
        rating: doc.rating,
        hairstyles: doc.hairstyles,
        hairstyles_short: doc.hairstyles.short,
        hairstyles_short_type: doc.hairstyles.short.type || null,
        hairstyles_short_price: doc.hairstyles.short.price || null,
        hairstyles_short_duration: doc.hairstyles.short.duration || null,
      };
    });
    return data;
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
};

let auth = {
  async login(username, password){
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });

    let user = response.data;

    localStorage.setItem('user', user);
  }, 
}

export { Service, Posts, auth };
