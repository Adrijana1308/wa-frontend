<template>
  <div class="cards">
    <Sort
      :searchSalons="searchSalons"
      :posts="posts"
      :filteredPosts="filteredPosts"
    />
    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="posts && posts.length > 0">
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
    <div v-else>
      No salons found.
    </div>
  </div>
</template>

<script>
import Sort from "./Sort.vue";

export default {
  props: {
    searchSalons: Function,
    filteredPosts: Array,
    posts: Array,
  },
  methods: {
    updateSearchParams(params) {
      this.searchParams = params;
    },
  },
  components: {
    Sort,
  },
  mounted() {
    // Log posts to check its contents
    console.log("Posts:", this.posts);
    // Ensure each post has a valid _id
    if (this.posts) {
      const invalidIds = this.posts.filter(post => !post._id);
      if (invalidIds.length > 0) {
        console.error("Posts with invalid _id:", invalidIds);
      }
    } else {
      console.error("Posts array is null or undefined.");
    }
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
