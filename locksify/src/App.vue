<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/locksify-logo.png" height="50" class="d-inline-block align-top" alt="">
        </a>
        <div class="d-flex">
            <form class="d-flex mt-1" id="lightOrDark" role="search">
              <label for="checkbox" class="toggler">
                  <input type="checkbox" id="checkbox">
                  <span class="ball"></span>
                  <i class="bi bi-sun"></i>
                  <i class="bi bi-moon"></i>
              </label>
            </form> 
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Izbornik</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
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

@import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Source+Sans+3&display=swap');


html, body {
  overflow: hidden;
}

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
  font-size: 20px;
  background-color: transparent;
  font-family: 'Caprasimo', serif;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #a570ef;
    }
  }
  li.nav-item {
      padding: 10px 5px;
    }
}

#checkbox {
    display: none;
  }

  .navbar-toggler{
    color: #2c3e50;
    border-color: #2c3e50;
  }

  .toggler {
    display: block;
    width: 60px;
    height: 31px;
    border: 1px solid #2c3e50;
    border-radius: 30px;
    position: relative;
    cursor: pointer;
  }

  .ball, .bi-sun, .bi-moon {
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

  .dark {
    transition: 0.5s;
    background: linear-gradient(-45deg, #000000, #17153f, #080e36, #020430);
    background-size: 400% 400%;
    //animation: gradient 15s ease infinite;
    height: 100vh;
    background-image: url("assets/PanoramicPurple.jpeg");
    background-size: cover;
  }

  .dark > * {
    color: #FAF9F6;
  }

  .dark .ball {
    background-color: #005792;
  }

  .dark .toggler {
    border-color: #005792;
  }

  .dark .bi-sun {
    color: #005792;
  }

  #checkbox:checked + .ball {
    transform: translate(29px, -50%);
  }
  #lightOrDark{
    padding-right: 15px;
  }

/*  .dark .offcanvas-body{
    background-color:#17153f;  //Adri ovo rješava problem sa linijom Dark mode-a, ti vidi dali brišemo ili ne
  }*/

  .dark .offcanvas-header{
    background-color:#17153f;
    color:#FAF9F6;
  }

  .dark .nav-item{
    color: #FAF9F6;
  }

</style>
