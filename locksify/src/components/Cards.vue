<template>
  <div class="cards">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card h-100">
          <img src="../assets/salon_1.jpg" class="card-img-top" alt="Frizerski salon">
          <div class="card-body">
            <h5 class="card-title">Ime salona</h5>
            <p class="card-text">
              <span class="card-rew">5 </span>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <span class="card-num-rew"> (6) • </span>
              <span class="card-city">Zagreb</span>
            </p>
            <a href="#" class="btn btn-dark">See more</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="../assets/salon_1.jpg" class="card-img-top" alt="Frizerski salon">
          <div class="card-body">
            <h5 class="card-title">Ime salona</h5>
            <p class="card-text">
              <span class="card-rew">5 </span>
              <span class="card-num-rew">(6) • </span>
              <span class="card-city">Zagreb</span>
            </p>
            <a href="#" class="btn btn-dark">See more</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="../assets/salon_1.jpg" class="card-img-top" alt="Frizerski salon">
          <div class="card-body">
            <h5 class="card-title">Ime salona</h5>
            <p class="card-text">
              <span class="card-rew">5 </span>
              <span class="card-num-rew">(6) • </span>
              <span class="card-city">Zagreb</span>
            </p>
            <a href="#" class="btn btn-dark">See more</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="../assets/salon_1.jpg" class="card-img-top" alt="Frizerski salon">
          <div class="card-body">
            <h5 class="card-title">Ime salona</h5>
            <p class="card-text">
              <span class="card-rew">5 </span>
              <span class="card-num-rew">(6) • </span>
              <span class="card-city">Zagreb</span>
            </p>
            <a href="#" class="btn btn-dark">See more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">

.cards{
  width: 100%;
  padding: 10%;
  overflow-y: auto;
}

</style>
