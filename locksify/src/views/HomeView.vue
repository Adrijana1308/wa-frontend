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
