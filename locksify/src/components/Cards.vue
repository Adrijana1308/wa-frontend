<template>
  <div class="cards">
    <Sort :posts="posts" @updatePosts="posts = $event" />
    <!--ovo se nalazilo u " " od @update posts    posts = $event   -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in posts" :key="post._id">
        <div class="card h-100">
          <img :src="post.source" class="card-img-top" alt="Frizerski salon" />
          <div class="card-body">
            <h5 class="card-title">{{ post.name }}</h5>

            <p class="card-text">
              <span class="card-rew">
                {{ post.rating }}
                <i
                  v-for="index in parseInt(post.rating)"
                  :key="index"
                  class="bi bi-star-fill"
                ></i>
              </span>
              <span class="card-num-rew"> ({{ post.numOfRatings }}) • </span>
              <span class="card-city">{{ post.location }} </span>
            </p>
            <router-link :to="'/card/' + post._id" class="btn btn-dark card-btn"
              >See more</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sort from "./Sort.vue";

export default {
  // data() {
  //   return {
  //     posts: [],
  //   };
  // },
  props: {
    posts: Array,
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        console.log(response);
        this.$emit("update:posts", response.data); // Emitiranje događaja s novim podacima
        console.log(response.data);
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja podataka na Cards.vue:",
          error
        );
      }
    },
    // updatePosts(updatedPosts) {
    //   this.posts = updatedPosts;
    // },
  },
  components: {
    Sort,
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped lang="scss">
.cards {
  width: 100%;
  padding: 10%;
  overflow-y: auto;
}

.card-body {
  background: transparent;
  border: none;
}

.btn-outline::after {
  background: #2c3e50;
}

.page-link {
  color: #2c3e50;
  font-size: 20px;
  padding: 20px;
}

.nav-pages .page-link:focus {
  outline: none;
  box-shadow: none;
}

.card-img-top {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.card-btn {
  padding: 10px 20px;
  font-size: 18px;
}

/* START DARK MODE */
.dark .card {
  background: #000;
}

.dark .card-title {
  color: #faf9f6;
}
.dark .card-text {
  color: #faf9f6;
}

.dark .card-body {
  background: transparent;
}

/* END DARK MODE */
</style>
