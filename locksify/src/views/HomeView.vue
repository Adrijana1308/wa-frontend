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
            <input type="text" class="search-box" placeholder="Search...">
          </form>
        </div>
        <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-search"></i>
            <input type="text" class="search-box" placeholder="Search...">
          </form>
        </div>
        <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-search"></i>
            <input type="text" class="search-box" placeholder="Search...">
          </form>
        </div>
        <div class="input-container"> 
          <form class="form" action="/" method="get">
            <i class="bi bi-search"></i>
            <input type="text" class="search-box" placeholder="Search...">
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
      overflow: hidden;
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
  margin-top: 15%;
  margin-left: 19%;
  margin-right: 19%;
}
.home p {
  font-size: 80px;
  padding: 10px;
  text-shadow: 1px 1px 2px #fff;
  font-family: 'Caprasimo', serif;
}
.search-container {
  display: flex;
  gap: 10px;
  width: 60%;
  height: 70px;
  margin: auto;
  border: 10px solid #d890f530;
  border-radius: 50px;
  padding: 5px;
  justify-content: space-evenly;
  align-items: center;
}

.input-container{
  width: 200px;
  height: 60px;
}

.form{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.search-box {
  border: none;
  height: 80%;
  width: 80%;
  margin-left: 10px;
}

.search-box::placeholder {
  color: #2c3e50;
}

.search-button {
  background-color: #2c3e50;
  border: none;
  border-radius: 0 50px 50px 0;
  height: 70px;
  padding: 0 20px;
}

.search-button:hover {
  background-color: white;
}

.bi-search {
  color: white;
}

.bi-search:hover {
  color: #2c3e50;
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
    p{
      font-size: 200px;
    }
}

@media (max-width: 1024px) {
    #search-box{
      width: 450px;
    }
}

@media (max-width: 780px) {
    #search-box{
      width: 350px;
    }
}
</style>
