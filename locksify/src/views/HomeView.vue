<template>
  <div class="home">
    <p class="title">Book local beauty and wellness services</p>
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
        <a href="#cards" class="search-button-link"><button @click="toggleCards" type="submit" class="search-button">Search</button></a>
    </div>
    <p class="salon-p"> View over <span> 500 </span> salons on the app!</p>
  </div>
  <Cards id="cards" v-show="showCards" />
</template>


<script>
import Cards from '@/components/Cards.vue';

export default {
  components: {
    Cards
  },
  data() {
    return {
      showCards: false
    };
  },
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
    toggleCards() {
      this.showCards = !this.showCards;
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
  background: rgb(255, 196, 108);
  z-index: -1;
}

.ball2{
  background: #d890f5;
  z-index: -1;
}

.home{
  width: 100%;
  padding: 10%;
  overflow-y: auto;
  transition: transform 0.5s ease-in-out;
}
.title {
  font-size: 110px;
  padding: 10px;
  padding-top: 0;
  text-shadow: 1px 1px 2px #fff;
  font-family: 'Playfair Display', serif;
  text-align: left;
  line-height: 120%;
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
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 80px;
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

.search-box:focus {
  outline: none;
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

.search-button-link{
  text-decoration: none;
  color: #fff;
}

.bi{
  font-size: 20px;
}

.salon-p{
  font-size: 25px;
  padding: 10px;
  margin-top: 6%;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

.salon-p span{
  font-weight: bold;
}


/* START DARK MODE */

.dark p{
  color: #FAF9F6;
  text-shadow: none;
}

.dark .search-container{
  background: transparent;
  border-color: #aa45d26f;
}

.dark .search-button{
  background: #d890f5;
  color: #2c3e50;
  font-weight: bold;
}

.dark .form{
  background: transparent;
  color:#FAF9F6;
}
.dark .search-box{
  background: transparent;
  color:#FAF9F6;
}
.dark .search-box::placeholder {
  color: #FAF9F6;
}

/* END DARK MODE */

@media (max-width: 1024px) {
    .title{
      margin-top: 20px;
      font-size: 60px;
      text-align: center;
    }
    .search-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 5px;
        width: 60%;
        height: auto;
        border-radius: 20px;
        padding: 20px;
    }

    .input-container{
        width: 100%;
        height: 50px;
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

    .search-button-link{
      width: 100%;
    }

    .salon-p{
      font-size: 20px;
    }
}

@media (max-width: 780px) {
    .title{
      margin-top: 0;
      font-size: 50px;
    }
    .search-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;
        height: auto;
        border-radius: 20px;
        margin-top: 0;
    }

    .input-container{
        width: 100%;
        height: 40px;
    }

    .search-box{
      font-size: 15px;
    }

    .search-button{
      font-size: 15px;
    }

    .salon-p{
      font-size: 15px;
      margin-top: 3%;
    }
}

@media (max-width: 426px) {

    .home{
      margin-top: 10%;
    }

    .title{
      font-size: 35px;
    }

    .search-container{
        width: 100%;
        height: auto;
        border-radius: 20px;
        padding: 10px;
    }

    .bi{
        font-size: 12px;
    }

    .search-box{
      font-size: 12px;
    }

    .search-button{
      font-size: 12px;
    }
    .input-container{
        height: 40px;
    }

    .salon-p{
      margin-top: 5%;
    }
}
</style>
