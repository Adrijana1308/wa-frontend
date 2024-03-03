<template>
  <div class="sort">
    <div class="test">
      <button
        class="sort-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <i class="bi bi-filter"></i>
        Sort by
      </button>
    </div>

    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <div class="btn-group" aria-label="Basic checkbox toggle button group">
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck1"
            v-model="highestRatingChecked"
            @change="handleCheckboxChange('highestRating')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck1"
          >
            Highest rating
          </label>

          <input
            type="checkbox"
            class="btn-check"
            id="btncheck2"
            v-model="lowestRatingChecked"
            @change="handleCheckboxChange('lowestRating')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck2"
          >
            Lowest rating
          </label>

          <input
            type="checkbox"
            class="btn-check"
            id="btncheck3"
            v-model="highestPriceChecked"
            @change="handleCheckboxChange('highestPrice')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck3"
          >
            Highest price
          </label>

          <input
            type="checkbox"
            class="btn-check"
            id="btncheck4"
            v-model="lowestPriceChecked"
            @change="handleCheckboxChange('lowestPrice')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck4"
          >
            Lowest price
          </label>
        </div>
        <div class="btn-group" aria-label="Basic checkbox toggle button group">
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck5"
            v-model="aToZChecked"
            @change="handleCheckboxChange('aToZ')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck5"
          >
            A - Z
          </label>

          <input
            type="checkbox"
            class="btn-check"
            id="btncheck6"
            v-model="zToAChecked"
            @change="handleCheckboxChange('zToA')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck6"
          >
            Z - A
          </label>

          <input
            type="checkbox"
            class="btn-check"
            id="btncheck7"
            v-model="shortHairStylesChecked"
            @change="handleCheckboxChange('shortHairStyles')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck7"
          >
            Short hair styles
          </label>
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck8"
            v-model="mediumHairStylesChecked"
            @change="handleCheckboxChange('mediumHairStyles')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck8"
          >
            Medium hair styles
          </label>
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck9"
            v-model="longHairStylesChecked"
            @change="handleCheckboxChange('longHairStyles')"
            autocomplete="off"
          />
          <label
            class="label-btn btn btn-outline-dark rounded border"
            for="btncheck9"
          >
            Long hair styles
          </label>
        </div>
        <div class="dicision-btns">
          <button class="apply-btn rounded border">Apply changes</button>
          <button class="reset-btn rounded border" @click="resetFilters">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      highestRatingChecked: false,
      lowestRatingChecked: false,
      highestPriceChecked: false,
      lowestPriceChecked: false,
      aToZChecked: false,
      zToAChecked: false,
      shortHairStylesChecked: false,
      longHairStylesChecked: false,
      mediumHairStylesChecked: false,
    };
  },
  methods: {
    handleCheckboxChange(option) {
      if (option === "highestRating" && this.highestRatingChecked) {
        this.lowestRatingChecked = false;
      } else if (option === "lowestRating" && this.lowestRatingChecked) {
        this.highestRatingChecked = false;
      } else if (option === "highestPrice" && this.highestPriceChecked) {
        this.lowestPriceChecked = false;
      } else if (option === "lowestPrice" && this.lowestPriceChecked) {
        this.highestPriceChecked = false;
      } else if (option === "aToZ" && this.aToZChecked) {
        this.zToAChecked = false;
      } else if (option === "zToA" && this.zToAChecked) {
        this.aToZChecked = false;
      } else if (option === "shortHairStyles" && this.shortHairStylesChecked) {
        this.longHairStylesChecked = false;
        this.mediumHairStylesChecked = false;
      } else if (option === "longHairStyles" && this.longHairStylesChecked) {
        this.shortHairStylesChecked = false;
        this.mediumHairStylesChecked = false;
      } else if (
        option === "mediumHairStyles" &&
        this.mediumHairStylesChecked
      ) {
        this.shortHairStylesChecked = false;
        this.longHairStylesChecked = false;
      }
    },
    resetFilters() {
      this.highestRatingChecked = false;
      this.lowestRatingChecked = false;
      this.highestPriceChecked = false;
      this.lowestPriceChecked = false;
      this.aToZChecked = false;
      this.zToAChecked = false;
      this.shortHairStylesChecked = false;
      this.longHairStylesChecked = false;
      this.mediumHairStylesChecked = false;
    },
  },
};
</script>

<style scoped>
.sort {
  margin-bottom: 30px;
}

.test {
  display: flex;
  justify-content: flex-start;
}

.sort-btn {
  border: 1px solid #2c3e50;
  border-radius: 10px;
  background: #000;
  color: #faf9f6;
  padding: 10px 20px;
  font-size: 18px;
  margin-bottom: 10px;
}

.label-btn {
  margin: 10px;
  font-weight: bolder;
  border: none;
  padding: 20px;
}
.dicision-btns button {
  padding: 10px;
  font-size: 18px;
  font-weight: bolder;
  color: #faf9f6;
  margin-top: 10px;
}

.apply-btn {
  margin-right: 7px;
  background: #d890f5;
}
.apply-btn:hover {
  margin-right: 7px;
  background: #c680e5;
}
.reset-btn {
  background: rgb(255, 196, 108);
}
.reset-btn:hover {
  background: rgb(235, 176, 78);
}
</style>
