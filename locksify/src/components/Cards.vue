<template>
  <div class="cards">
    <Sort
      :searchSalons="searchSalons"
      :posts="posts"
      :filteredPosts="filteredPosts"
    />
    <div
      class="row row-cols-1 row-cols-md-3 g-4"
      v-if="paginatedPosts && paginatedPosts.length > 0"
    >
      <div class="col" v-for="post in paginatedPosts" :key="post._id">
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
            <!-- Show edit button only if current user is the owner -->
            <router-link
              v-if="isOwner(post.userId)"
              :to="'/edit-post/' + post._id"
              @click="editPost(post)"
              class="btn btn-primary"
              >Edit</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>No salons found.</div>
    <EditPost
      v-if="showEditModal"
      :postId="editPostId"
      @close="closeEditModal"
    />
    <!-- Pagination -->
    <nav class="pagination-nav" aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage - 1)"
            >Previous</a
          >
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Sort from "./Sort.vue";
import EditPost from "./EditPost.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    searchSalons: Function,
    filteredPosts: Array,
    posts: Array,
  },
  data() {
    return {
      showEditModal: false, // Control whether to show the edit modal
      editPostId: null, // Track ID of the post being edited
      currentPage: 1, // Track the current page
      postsPerPage: 9,
    };
  },
  computed: {
    ...mapGetters(["currentUserId", "isSuperAdmin", "userType"]),
    //...mapGetters(['posts']),
    // Total number of pages
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },

    // Paginated posts based on the current page
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  methods: {
    updateSearchParams(params) {
      this.searchParams = params;
    },
    isOwner(userId) {
      if (!userId || !this.currentUserId) {
        return false;
      }
      return userId === this.currentUserId || this.isSuperAdmin;
    },
    editPost(post) {
      // Show the edit modal and set id of the post to be edited
      this.showEditModal = true;
      this.editPostId = post._id;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editPostId = null; // Reset the editPostId after closing the modal
    },
    handleUpdatePost(updatedPost) {
      const index = this.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index !== -1) {
        this.$set(this.posts, index, updatedPost);
        this.$set(this.filteredPosts, index, updatedPost);
      }
      this.closeEditModal(); // Close the modal after updating
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  components: {
    Sort,
    EditPost, // Register EditPost component
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
.btn-primary {
  margin-left: 5px;
  background: #e9aaf1dc;
  color: #000;
  outline: none;
  outline-width: none;
  font-size: 18px;
}

.pagination-nav {
  margin-top: 5%;
}

.pagination .page-item.active .page-link {
  background-color: #e9aaf1dc; /* Change background color */
  border-color: #e9aaf1dc; /* Change border color */
  color: white; /* Change text color */
}

.pagination .page-item .page-link {
  color: #2c3e50; /* Default page link color */
}

.pagination .page-item .page-link:hover {
  background-color: #f0f0f0; /* Hover effect */
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
