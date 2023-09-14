<template>
  <div class="home">
    <h1>Book local beauty and wellness services</h1>
    <div class="search-container">
      <form action="/" method="get">
        <input type="text" id="search-box" placeholder="Search...">
        <button type="submit" id="search-button"><i class="bi bi-search"></i></button>
      </form>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home{
  margin-top: 10%;
  margin-left: 20%;
  margin-right: 20%;
}
.home h1 {
  font-size: 90px;
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
  color: white;
}

#search-box::placeholder {
  color: #f5f2f2;
}


#search-button {
  background-color: #005792;
  border: none;
  border-radius: 0 20px 20px 0;
  height: 50px;
  padding: 0 20px;
}

#search-button:hover {
  background-color: #555;
  color: white;
}

.bi-search {
  color: white;
}

</style>
