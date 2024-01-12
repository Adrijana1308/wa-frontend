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
  margin-top: 15%;
  margin-left: 19%;
  margin-right: 19%;
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
  height: 75px;
  padding: 10px;
  font-size: 17px;
  background: transparent;
  color: #2c3e50;
  width: 740px;
}

#search-box::placeholder {
  color: #005792;
}

#search-button {
  background-color: #005792;
  border: none;
  border-radius: 0 20px 20px 0;
  height: 75px;
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
