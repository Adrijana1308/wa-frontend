<template>
  <div class="home">
    <p>Book local beauty and wellness services</p>
    <div class="search-container">
      <form action="/" method="get">
        <input type="text" id="search-box" placeholder="Search...">
        <button type="submit" id="search-button"><i class="bi bi-search"></i></button>
      </form>
    </div>

  </div>
</template>

<style scoped>

.home{
  margin-top: 13%;
  margin-left: 20%;
  margin-right: 20%;
}
.home p {
  font-size: 60px;
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
  height: 50px;
  padding: 10px;
  font-size: 18px;
  background: transparent;
  color: #2c3e50;
  width: 640px;
}

#search-box::placeholder {
  color: #005792;
}

#search-button {
  background-color: #005792;
  border: none;
  border-radius: 0 20px 20px 0;
  height: 50px;
  padding: 0 20px;
}

#search-button:hover {
  background-color: #0094f8;
  color: white;
}

.bi-search {
  color: white;
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
