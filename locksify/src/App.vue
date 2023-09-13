<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="@/assets/locksify-logo.png" height="50" class="d-inline-block align-top" alt="">
        </a>
          <div class="nav-items">
            <ul class="navbar-links">
              <li class="nav-link">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-link">
                <router-link to="/Login">Login</router-link>
              </li>
              <li class="nav-link">
                <router-link to="/SignUp">Sign Up</router-link>
              </li>
            </ul>
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
    color: #2c3e5098;

    &.router-link-exact-active {
      color: #005792;
    }
  }
  li.nav-link {
      padding: 10px 5px;
      
    }
}

.container{
  display: flex;
}

</style>
