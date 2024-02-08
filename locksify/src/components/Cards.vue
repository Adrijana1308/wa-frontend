<template>
  <div class="cards">

    <div class="sort">
      <button class="sort-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <i class="bi bi-filter"></i>
        Filter by
      </button>

      <div class="collapse" id="collapseExample">
        <div class="card card-body">

          <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
            <label class="btn btn-outline-dark" for="btncheck1">Highest rating</label>

            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
            <label class="btn btn-outline-dark" for="btncheck2">Lowest rating</label>

            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
            <label class="btn btn-outline-dark" for="btncheck3">Highest price</label>

            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
            <label class="btn btn-outline-dark" for="btncheck4">Lowest price</label>
          </div>

        </div>

      </div>
    </div>

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

    <nav class="nav-pages" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

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

.sort{
  margin: 30px;
}

.sort-btn {
  border: 1px solid #2c3e50;
  border-radius: 10px;
  background: #000;
  color: #FAF9F6;
  padding: 10px;
  font-size: 18px;
}
.card-body{
  background: transparent;
  border: none;
}

.btn-outline::after{
  background: #2c3e50;
}

.pagination{
  margin-left:auto;
}

.page-link{
  color:#2c3e50;
  font-size: 20px;
  padding: 20px;
}

.nav-pages .page-link:focus {
  outline: none;
  box-shadow: none;
}

</style>
