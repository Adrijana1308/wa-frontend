<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/locksify-logo.png" height="50" class="d-inline-block align-top" alt="">
        </a>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/SignUp">Sign Up</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <router-view/>
    
  </div>
  
</template>

<style lang="scss">

body {
	background-size: 400% 400%;
	height: 100vh;
  transition: 0.5s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: left;
  font-size: 18px;

  a {
    font-weight: bold;
    color: #4e5d6cb2;

    &.router-link-exact-active {
      color: #005792;
    }
  }
  li.nav-item {
      padding: 10px 5px;
    }
}

</style>
