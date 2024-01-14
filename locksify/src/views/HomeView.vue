<template>
  <div class="home">
    <p>Book local beauty and wellness services</p>
    <div class="balls-container">
      <div ref="ball1" class="shadow ball ball1"></div>
      <div ref="ball2" class="shadow ball ball2"></div>
    </div>
    <div class="search-container">
      <form action="/" method="get">
        <input type="text" id="search-box" placeholder="Search...">
        <button type="submit" id="search-button"><i class="bi bi-search"></i></button>
      </form>
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
    width: 450px;
    height: 450px;
    border-radius: 50%;
    filter: blur(150px);
}

.ball1{
  background: #d890f5;
}

.ball2{
  background: #a570ef;
}

.home{
  margin-top: 15%;
  margin-left: 19%;
  margin-right: 19%;
  position: relative;
}
.home p {
  font-size: 80px;
  padding: 10px;
  text-shadow: 1px 1px 2px #fff;
}
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#search-box {
  border: 1px solid #005792;
  border-radius: 20px 0 0 20px;
  height: 70px;
  padding: 10px;
  font-size: 17px;
  background: transparent;
  color: #2c3e50;
  width: 1040px;
}

#search-box::placeholder {
  color: #005792;
}

#search-button {
  background-color: #005792;
  border: none;
  border-radius: 0 20px 20px 0;
  height: 70px;
  padding: 0 20px;
}

#search-button:hover {
  background-color: #0094f8;
  color: white;
}

.bi-search {
  color: white;
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
