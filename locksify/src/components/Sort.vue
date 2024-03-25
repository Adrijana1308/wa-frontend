<template>
  <div class="sort">
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
          <button class="apply-btn rounded border" @click="applyFilters">
            Apply changes
          </button>
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
  props: {
    filteredPosts: Array,
    searchSalons: {
      type: Function,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
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
      posts: [],
      allPosts: [],
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

    async applyFilters() {
      try {
        // Dohvaćanje svih postova
        let allPosts = this.filteredPosts;
        // Funkcija za usporedbu po ocjeni (najviše do najmanje)
        const compareByRatingDesc = (postA, postB) => {
          return (postB.rating || 0) - (postA.rating || 0);
        };

        // Funkcija za usporedbu po ocjeni (najmanje do najviše)
        const compareByRatingAsc = (postA, postB) => {
          return (postA.rating || 0) - (postB.rating || 0);
        };

        // Funkcija za usporedbu po abecednom redu (A-Z)
        const compareAlphabeticallyAsc = (postA, postB) => {
          return postA.name.localeCompare(postB.name);
        };

        // Funkcija za usporedbu po abecednom redu (Z-A)
        const compareAlphabeticallyDesc = (postA, postB) => {
          return postB.name.localeCompare(postA.name);
        };

        // Funkcija za izračun ukupnog broja odabranih frizura za svaki post
        const calculateTotalHairstyleCount = (post) => {
          let total = 0;
          if (this.shortHairStylesChecked) {
            total += post.hairstyles.short.length;
          }
          if (this.mediumHairStylesChecked) {
            total += post.hairstyles.medium.length;
          }
          if (this.longHairStylesChecked) {
            total += post.hairstyles.long.length;
          }
          return total;
        };

        // Funkcija za usporedbu po ukupnom broju odabranih frizura
        const compareByTotalHairstyleCount = (postA, postB) => {
          const countA = calculateTotalHairstyleCount(postA);
          const countB = calculateTotalHairstyleCount(postB);
          return countB - countA; // Sortiranje od najvećeg prema najmanjem broju
        };

        // Funkcija za usporedbu po cijeni ako su vrste frizura iste
        const compareByPriceIfSameType = (postA, postB) => {
          const types = ["short", "medium", "long"];

          for (const type of types) {
            const hairstylesA = postA.hairstyles[type];
            const hairstylesB = postB.hairstyles[type];

            // Provjera postoji li sadržaj za trenutni tip frizura
            if (hairstylesA && hairstylesB) {
              for (let i = 0; i < hairstylesA.length; i++) {
                const hairstyleA = hairstylesA[i];
                const hairstyleB = hairstylesB[i];

                // Provjera jesu li obje frizure definirane
                if (hairstyleA && hairstyleB) {
                  const priceA = parseFloat(hairstyleA.price);
                  const priceB = parseFloat(hairstyleB.price);

                  // Provjera jesu li cijene dobro parsirane u brojeve
                  if (!isNaN(priceA) && !isNaN(priceB)) {
                    // Usporedba cijena frizura
                    if (hairstyleA.type === hairstyleB.type) {
                      const priceComparison = priceA - priceB;
                      if (priceComparison !== 0) {
                        return priceComparison;
                      }
                    }
                  } else {
                    console.error(
                      "Error: Price is not a valid number for type",
                      type
                    );
                  }
                }
              }
            }
          }

          return 0;
        };

        // Primjena sortiranja prema odabranim opcijama
        allPosts.sort((postA, postB) => {
          // Inicijalizacija rezultata usporedbe
          let result = 0;

          // Sortiranje po cijeni ako je odabrano
          if (this.highestPriceChecked) {
            result = compareByPriceIfSameType(postA, postB);
            if (result !== 0) return result * -1; // Sortiranje od najveće prema najmanjoj cijeni
          } else if (this.lowestPriceChecked) {
            result = compareByPriceIfSameType(postA, postB);
            if (result !== 0) return result; // Sortiranje od najmanje prema najvećoj cijeni
          }

          // Sortiranje po ocjeni ako je odabrano
          if (this.highestRatingChecked) {
            result = compareByRatingDesc(postA, postB);
            if (result !== 0) return result;
          } else if (this.lowestRatingChecked) {
            result = compareByRatingAsc(postA, postB);
            if (result !== 0) return result;
          }

          // Sortiranje abecedno ako je odabrano
          if (this.aToZChecked) {
            result = compareAlphabeticallyAsc(postA, postB);
            if (result !== 0) return result;
          } else if (this.zToAChecked) {
            result = compareAlphabeticallyDesc(postA, postB);
            if (result !== 0) return result;
          }

          // Usporedba po ukupnom broju odabranih frizura
          if (
            this.shortHairStylesChecked ||
            this.mediumHairStylesChecked ||
            this.longHairStylesChecked
          ) {
            result = compareByTotalHairstyleCount(postA, postB);
            if (result !== 0) return result;
          }

          return result; // Vraćamo 0 ako su objekti jednaki
        });
        this.filteredPosts.splice(0, this.filteredPosts.length, ...allPosts);
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja i sortiranja postova:",
          error
        );
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
  mounted() {
    this.applyFilters();
  },
};
</script>

<style scoped>
.sort {
  margin-bottom: 30px;
}

.sort-btn {
  position: relative;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  background: #000;
  color: #faf9f6;
  padding: 10px 20px;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  z-index: 1000;
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

/* START DARK MODE */
.dark .card-body {
  background: #00000079;
}
.dark .label-btn {
  color: #faf9f6;
}
.dark .apply-btn {
  margin-right: 7px;
  background: transparent;
}
.dark .apply-btn:hover {
  margin-right: 7px;
  background: #c680e5;
}
.dark .reset-btn {
  background: transparent;
}
.dark .reset-btn:hover {
  background: rgb(235, 176, 78);
}
/* END DARK MODE */
</style>
