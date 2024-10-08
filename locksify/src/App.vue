<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg fixed-top"
      :class="{ scrolled: isScrolled }"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/locksify-logo.png"
            height="50"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <div class="d-flex">
          <form class="d-flex mt-1" id="lightOrDark" role="search">
            <label for="checkbox" class="toggler">
              <input type="checkbox" id="checkbox" />
              <span class="ball"></span>
              <i class="bi bi-sun"></i>
              <i class="bi bi-moon"></i>
            </label>
          </form>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul
              class="navbar-nav justify-content-end flex-grow-1 pe-3"
              key="auth.authenticate"
            >
              <li class="nav-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="!isAuthenticated" to="/Login">
                  Login
                </router-link>
                <span v-if="isAuthenticated">
                  <a @click="logout" href="#">Logout</a>
                </span>
              </li>
              <li class="nav-item">
                <router-link v-if="!isAuthenticated" to="/signup">
                  Sign Up
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  v-if="(isBusinessUser || isSuperAdmin) && isAuthenticated"
                  to="/business-feature"
                  id="business"
                  >Create a post</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Service, Posts, Auth } from "@/Services";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "isBusinessUser",
      "currentUserId",
      "isSuperAdmin",
      "userType",
    ]),
  },
  setup() {
    const router = useRouter();
    const isScrolled = ref(false);
    const posts = ref([]);

    // Hook to handle scrolling
    const handleScroll = (event) => {
      isScrolled.value = event.deltaY > 0;
    };

    // Fetch posts when component is mounted
    const getPosts = async () => {
      posts.value = await Posts.posts();
    };

    // Logout function
    const logout = () => {
      Auth.logout();
      router.go();
    };

    // Mount and unmount lifecycle hooks
    onMounted(() => {
      window.addEventListener("wheel", handleScroll);
      getPosts();
    });

    onUnmounted(() => {
      window.removeEventListener("wheel", handleScroll);
    });

    return {
      isScrolled,
      logout,
      posts,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Caprasimo&family=Source+Sans+3&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap");

html,
body {
  overflow: hidden;
  scroll-behavior: smooth;
  transition: scroll-behavior 0.5s ease-in-out;
}

body {
  background-size: 400% 400%;
  height: 100vh;
  transition: 0.5s;
  overflow-y: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

body::-webkit-scrollbar {
  width: 1px;
}

body::-webkit-scrollbar-thumb {
  background-color: transparent;
}

nav {
  text-align: left;
  font-size: 20px;
  background-color: transparent;
  font-family: "Poppins", sans-serif;
  transition: background-color 0.3s ease;

  &.scrolled {
    background: white;
    box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1);
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #d890f5;
    }
  }
  li.nav-item {
    padding: 10px 5px;
  }
}

.container-fluid {
  padding: 15px;
}

#checkbox {
  display: none;
}

.navbar-toggler {
  color: #2c3e50;
  border-color: #2c3e50;
}

.toggler {
  display: block;
  padding: 15px;
  width: 60px;
  height: 31px;
  border: 1px solid #2c3e50;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
}

.bi-sun,
.bi-moon {
  position: absolute;
  top: 48%;
  transform: translateY(-50%);
}

.ball {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.ball {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-color: #2c3e50;
  border-radius: 50%;
  left: 1px;
  z-index: 10;
  transition: 0.3s;
}

.bi-sun {
  left: 5px;
  bottom: -11px;
}

.bi-moon {
  right: 5px;
  bottom: -11px;
  color: #2c3e50;
}

/* START DARK MODE */

#checkbox:checked + .ball {
  transform: translate(29px, -50%);
}

.dark {
  transition: 0.5s;
  background-size: 400% 400%;
  height: 100vh;
  background-image: url(../src/assets/panoramic-purple.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.dark .navbar.scrolled {
  background-color: #000000ad;
}

.dark > * {
  color: #faf9f6;
}

#checkbox:checked + .ball {
  transform: translate(29px, -50%);
}

#lightOrDark {
  padding-right: 15px;
}

.dark .offcanvas-header {
  background-color: #1a1625;
  color: #faf9f6;
}

.dark .nav-item a {
  color: #faf9f6;

  .dark .nav-item a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #a73cd1;
    }
  }

  .dark span {
    color: #d890f5;
  }

  &.router-link-exact-active {
    color: #c75bf2;
  }
}

.dark span {
  color: #d890f5;
}

.dark .ball {
  background: #fff;
}

.dark .bi-sun {
  color: #fff;
}

.dark .toggler {
  border: 1px solid #fff;
}

/* END DARK MODE */

@media (max-width: 768px) {
  .dark .offcanvas-body {
    background: #1a1625;
    color: #faf9f6;
  }
}

@media (max-width: 426px) {
  nav {
    padding: 30px;
    text-align: left;
  }

  .d-inline-block {
    height: 40px;
  }

  .nav-item {
    font-size: 15px;
  }

  .navbar-toggler {
    height: 40px;
  }
}
</style>
