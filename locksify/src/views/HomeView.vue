<template>
  <div class="home">
    <p>Book local beauty and wellness services</p>
    <div class="balls-container">
      <div ref="ball1" class="shadow ball ball1"></div>
      <div ref="ball2" class="shadow ball ball2"></div>
    </div>
    <div class="search-container">
       <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-search"></i>
            <input type="text" class="search-box" placeholder="Any salon">
          </form>
        </div>
        <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-geo-alt-fill"></i>
            <input type="text" class="search-box" placeholder="Any location">
          </form>
        </div>
        <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-calendar"></i>
            <input type="text" class="search-box" placeholder="Any date">
          </form>
        </div>
        <div class="input-container time"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-clock-fill"></i>
            <input type="text" class="search-box" placeholder="Any time">
          </form>
        </div>
        <button type="submit" class="search-button">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.animateBalls();
  },
  methods: {
    getRandomPosition() {
      const maxX = window.innerWidth - 550;
      const maxY = window.innerHeight - 550;

      const randomX = Math.random() * (maxX - 0) + 0;
      const randomY = Math.random() * (maxY - 0) + 0;

      return { x: randomX, y: randomY };
    },
    setRandomPosition(refName) {
      const ball = this.$refs[refName];
      if (ball) {
        const { x, y } = this.getRandomPosition();
        ball.style.transition = "transform 5s ease-in-out";
        ball.style.transform = `translate(${x}px, ${y}px)`;
      }
    },
    animateBalls() {
      const moveBalls = () => {
        this.setRandomPosition("ball1");
        this.setRandomPosition("ball2");

        setTimeout(() => {
          requestAnimationFrame(moveBalls);
        }, 5000);
      };

      requestAnimationFrame(moveBalls);
    },
  },
};
</script>

<style scoped>

body {
      margin: 0;
      overflow-y: auto;
}

.balls-container {
    position: absolute;
    width: 20%;
    height: 40%;
    top: 0;
    left: 0;
}

.shadow {
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    filter: blur(150px);
}

.ball1{
  background: #d890f5;
  z-index: -1;
}

.ball2{
  background: #a570ef;
  z-index: -1;
}

.home{
  width: 100%;
  padding: 10%;
  overflow-y: auto;
}
.home p {
  font-size: 100px;
  padding: 10px;
  padding-top: 0;
  text-shadow: 1px 1px 2px #fff;
  font-family: 'Caprasimo', serif;
}
.search-container {
  display: flex;
  gap: 10px;
  width: 100%;
  height: auto;
  margin: auto;
  border: 7px solid #af74c636;
  border-radius: 50px;
  background: #fff;
  padding: 5px;
  justify-content: space-evenly;
  align-items: center;
}

.input-container{
  width: 21%;
  height: 30px;
  border-right: 1px solid #2c3e5069;
}

.time{
  border-right: none;
}

.form{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.search-box {
  border: none;
  height: 80%;
  width: 80%;
  margin-left: 10px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
}

.search-box::placeholder {
  color: #2c3e50;
}

.search-button {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 19px;
}

.search-button:hover {
  background-color: white;
}

.bi{
  font-size: 20px;
}

.dark p{
  color: #FAF9F6;
  text-shadow: none;
}

.dark #search-box {
  border: 1px solid #FAF9F6;
  color: #FAF9F6;
}

.dark #search-box::placeholder {
  color: #FAF9F6;
}

.dark #search-button {
  background-color: #FAF9F6;
}

.dark .bi-search {
  color: #005792;
}

@media (max-width: 1440px){
    .search-container{
        flex-direction: column;
        gap: 10px;
        width: 60%;
        height: auto;
        border-radius: 10px;
        padding: 20px;
    }

    .input-container{
        width: 100%;
        height: 60px;
        border: none;
    }

    .form{
        border: 1px solid #2c3e5069;
        border-radius: 10px;
        height: 100%;
    }

    .search-box{
        margin-left: 20px;
        border: none;
    }

    .search-button{
        border-radius: 10px;
        padding: 10px 20px;
        width: 100%;
    }

    p{
      font-size: 200px;
    }
}

@media (max-width: 1024px) {
    .search-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;
        height: auto;
        border-radius: 20px;
    }

    .input-container{
        width: 100%;
        height: 60px;
    }
    .home p{
      font-size: 70px;
    }
}

@media (max-width: 780px) {
    .search-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;
        height: auto;
        border-radius: 20px;
    }

    .input-container{
        width: 100%;
        height: 60px;
    }
    .home p{
      font-size: 50px;
    }

    .search-box{
      font-size: 15px;
    }

    .search-button{
      font-size: 15px;
    }
}
</style>
