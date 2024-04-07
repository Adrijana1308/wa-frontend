<template>
  <div v-if="post" class="wrapper">
    <div class="card-rating">
      <p class="card-text">
        <span class="card-rat">
          {{ post.rating }}
          <i
            v-for="index in parseInt(post.rating)"
            :key="index"
            class="bi bi-star-fill"
          ></i>
        </span>
        <span class="card-num-rew"> ({{ post.numOfRatings }})</span>
        <span class="dot"> • </span>
        <span class="card-city">{{ post.location }}</span>
        <span class="dot"> • </span>
        <span class="card-open"> Open until {{ post.close }} </span>
      </p>
    </div>
    <div class="card-title">
      <h5 class="c-title">{{ post.name }}</h5>
      <br />
      <h3>About Us:</h3>
      <p class="c-text">
        The place where beauty meets professionalism! Our salon is dedicated to
        providing top-notch hairdressing services, creating unique and modernly
        styled hairstyles that enhance your natural beauty. Our team of skilled
        hairdressers is dedicated not only to your appearance but also to your
        sense of confidence. Whether you seek a refreshing trendy cut, a
        sophisticated color, or simply the perfect hairstyle that reflects your
        personality, {{ post.name }} is here to make your hairdressing dreams
        come true.
      </p>
      <h3 class="hours-title">Work hours:</h3>
      <p class="hours">{{ post.open }} - {{ post.close }}</p>
      <a href="#services" class="book-button-link">
        <button type="submit" class="book-button">Book now!</button></a
      >
    </div>
    <div class="card-img">
      <img :src="post.source" class="c-img" alt="..." />
    </div>
    <div id="services" class="hairstyles">
      <div class="hair-container">
        <h3 class="hair-title">Services</h3>
        <button @click="selectCategory('short')" class="select-button">
          Short
        </button>
        <button @click="selectCategory('medium')" class="select-button">
          Medium
        </button>
        <button @click="selectCategory('long')" class="select-button">
          Long
        </button>
        <button @click="selectCategory('other')" class="select-button">
          Other
        </button>
      </div>
      <div
        v-for="(hairstyle, index) in post.hairstyles[selectedCategory]"
        :key="index"
        class="card-services"
      >
        <div class="hair-info">
          <p class="type">{{ hairstyle.type }}</p>
          <p class="duration">{{ hairstyle.duration }} min</p>
          <p class="price">€ {{ hairstyle.price }}</p>
        </div>

        <button
          @click="selectHairstyle(hairstyle)"
          type="submit"
          class="select-button"
        >
          Select
        </button>
      </div>
    </div>

    <div class="calendar">
      <DatePicker
        v-model="date"
        expanded
        mode="dateTime"
        :formatter="customDateFormatter"
        :attributes="attributes"
        :disabled-dates="disabledDates"
        :firstDayOfWeek="2"
        @click:date="handleDateClick"
      >
        <template #day-popover="{ dayTitle, attributes }">
          <div class="px-2">
            <div
              class="text-xs text-gray-700 dark:text-gray-300 font-semibold text-center"
            >
              {{ dayTitle }}
            </div>
            <ul>
              <li
                v-for="{ key, customData } in attributes"
                :key="key"
                class="block text-xs text-gray-700 dark:text-gray-300 bg-red-100"
              >
                {{ customData.description }}
              </li>
            </ul>
          </div>
        </template>
      </DatePicker>
    </div>

    <div class="appointment">
      <h3 class="hair-title">Appointment details</h3>
      <div class="appointmein-details">
        <div class="appointment-time">
          <p>Selected date and time: {{ customDateFormatter(date) }}</p>
        </div>
        <div class="appointment-price">
          <p class="appointment-p">Picked hairstyle/servise</p>
          <ul class="type-selected">
            <li v-for="(hairstyle, index) in selectedHairstyles" :key="index">
              <p>{{ hairstyle.type }}</p>
              <button
                type="submit"
                class="remove-button"
                @click="removeHairstyle(index)"
              >
                Remove
              </button>
            </li>
          </ul>
          <p class="total-price">Total price: € {{ totalPrice }}</p>
        </div>
        <div class="buttons">
          <button
            @click="confirmSelection"
            type="submit"
            class="confirm-button"
          >
            Confirm
          </button>
          <button
            type="submit"
            class="cancel-button"
            @click="cancelAppointment"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Posts } from "../Services/index.js";
import axios from "axios";

const bookings = ref([]);
const descriptionData = ref({});
const todos = ref([]);

// Funkcija za dohvaćanje rezervacija
const fetchBookings = async () => {
  try {
    const data = await Posts.GetBookings();
    bookings.value = data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
  }
};

fetchBookings();

const date = ref(new Date());

const disabledDates = ref([
  {
    repeat: {
      weekdays: [1],
    },
  },
]);

const customDateFormatter = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  } else {
    return "Invalid date"; // Povratna vrijednost ako je date null ili nije valjani datum
  }
};

const attributes = computed(() => [
  ...todos.value.map((todo) => ({
    dates: todo.dates,
    dot: {
      color: todo.color,
      class: todo.isComplete ? "opacity-75" : "",
    },
    popover: true,
    customData: todo,
  })),
]);

// Funkcija koja se poziva kada se promijeni odabrani datum na kalendaru
const handleDateClick = async (date) => {
  const formattedDate = customDateFormatter(date); // Formatiranje odabranog datuma koristeći customDateFormatter
  console.log("Odabrani datum:", formattedDate);

  // Dohvat informacija iz baze podataka na temelju odabranog datuma
  await fetchDescription(formattedDate);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  console.log("dan:", day, "mjesec: ", month, "godina: ", year);
  const formattedDate = `${year}-${month}-${day}`;
  console.log("Formatirani datum:", formattedDate); // Premještanje console.log izvan return statementa
  return formattedDate;
};

const fetchDescription = async (date) => {
  try {
    // Dohvat informacija iz baze podataka na temelju datuma
    const response = await Posts.GetBookingsDate();

    // Ovdje možete ažurirati sučelje s dohvaćenim informacijama
    console.log("Dohvaćeni podaci za odabrani datum:", response.data);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja informacija:", error);
  }
};
</script>

<script>
import axios from "axios";
import { VCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

export default {
  components: {
    VCalendar,
    DatePicker,
    Calendar,
  },
  data() {
    return {
      post: null,
      selectedCategory: "short",
      selectedHairstyles: [],
    };
  },
  mounted() {
    const postId = this.$route.params._id;

    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        this.post = response.data;
        console.log("Fetched data:", this.post);
      })
      .catch((error) => {
        console.error(
          "Greška prilikom dohvaćanja podataka na Card.vue:",
          error
        );
      });
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    selectHairstyle(hairstyle) {
      if (!Array.isArray(this.selectedHairstyles)) {
        this.selectedHairstyles = []; // Ako nije niz, inicijalizirajte ga kao prazan niz
      }
      const alreadySelected = this.selectedHairstyles.some(
        (selected) => selected.type === hairstyle.type
      );

      if (alreadySelected) {
        alert("Već ste odabrali ovaj hairstyle.");
      } else {
        this.selectedHairstyles.push(hairstyle);
      }
    },
    removeHairstyle(index) {
      this.selectedHairstyles.splice(index, 1);
    },
    cancelAppointment() {
      this.selectedHairstyles = [];
    },
    confirmSelection() {
      console.log("Selected hairstyles:", this.selectedHairstyles);
    },
  },
  computed: {
    totalPrice() {
      return this.selectedHairstyles.reduce(
        (total, hairstyle) => total + hairstyle.price,
        0
      );
    },
  },
};
</script>

<style setup>
.vc-container {
  font-family: "Poppins", sans-serif;
}
.vc-arrow,
.vc-title {
  background: none;
}
.vc-base-icon,
.vc-title span {
  color: #d890f5;
}

.vc-time-month,
.vc-time-day {
  color: #d890f5;
}
.vc-time-select-group .vc-base-icon {
  color: #d890f5;
}
.vc-day > .vc-blue,
.vc-day-content:focus {
  background: #d890f5;
}
.vc-focus:focus-within {
  box-shadow: #c661ed;
}
.vc-focus {
  border: none;
}
.vc-nav-item.is-current {
  color: #d890f5;
}
.vc-nav-item.is-active {
  background: #d890f5;
}
.vc-base-select .vc-focus option:hover {
  background: #d890f5;
}
</style>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 2% auto;
  font-family: "Poppins", sans-serif;
  max-width: 80%;
}
.card-rating {
  grid-column: 1 / 3;
  grid-row: 2;
  display: flex;
  align-items: center;
}
.card-text {
  display: flex;
  justify-content: space-evenly;
  font-size: 25px;
  min-width: 35%;
}
.dot {
  padding-left: 7px;
  padding-right: 7px;
}
.card-open {
  color: #d890f5;
}
.card-title {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;
}
.c-title {
  font-size: 80px;
  font-family: "Playfair Display", serif;
}
.c-text {
  font-size: 20px;
  padding: 10px;
}
.hours-title {
  margin-top: 15px;
  margin-bottom: 15px;
}
.hours {
  font-weight: bolder;
  font-size: 25px;
  padding: 10px;
  width: 50%;
  margin: 5px auto;
  border: 1px solid #d890f5;
  border-radius: 10px;
}
.book-button {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 15px 30px;
  margin-top: 5%;
  width: 50%;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
}
.book-button-link {
  text-decoration: none;
  color: #fff;
}
.card-img {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}

.c-img {
  border-radius: 10px;
}

.hairstyles {
  grid-column: 1 / 4;
  grid-row: 4 / 8;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 30px;
  margin-bottom: 30px;
}

.hair-container {
  margin-bottom: 20px;
}

.hair-container h3 {
  text-align: left;
  margin-bottom: 20px;
}

.hair-title {
  font-size: 40px;
  font-weight: bolder;
}

.card-services {
  border-bottom: 1px solid lightgrey;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: start;
}

.hair-info {
  font-family: "Poppins", sans-serif;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.type {
  font-size: 22px;
  margin-bottom: auto;
}

.duration {
  font-size: 17px;
  margin-top: auto;
}

.price {
  font-size: 20px;
  font-weight: bolder;
}

.select-button,
.remove-button {
  background-color: transparent;
  border: 2px solid lightgray;
  border-radius: 50px;
  max-height: 50px;
  padding: 10px 25px;
  margin-left: auto;
  margin-right: 20px;
  font-weight: bolder;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
  align-self: center;
}

.calendar {
  grid-column: 1;
  grid-row: 8 / 12;
}

.c-container {
  display: grid;
  margin-top: 6%;
}
.cardContiner {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
.c-img {
  max-width: 100%;
}

.appointment {
  grid-column: 2 / 4;
  grid-row: 8 / 12;
  background: transparent;
  width: 80%;
  margin: auto;
  padding-top: 10px;
  border-left: 3px solid #d890f5;
  border-right: 3px solid #d890f5;
}

.appointmein-details {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: auto;
  font-family: "Poppins", sans-serif;
  max-width: 80%;
}

.appointment-price {
  background: white;
}

.type-selected {
  font-size: 22px;
  margin-bottom: auto;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.type-selected li {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgray;
}

.type-selected p {
  margin-bottom: 0;
  align-self: center;
}

.appointment-time {
  padding-top: 20px;
  background: white;
  font-size: 22px;
  display: flex;
  flex-direction: column;
}

.appointment-time p {
  justify-content: center;
  display: flex;
  width: 100%;
}

.appointment-time button {
  float: right;
}

.appointment-p {
  font-family: "Poppins", sans-serif;
  font-size: 25px;
}

.total-price {
  font-weight: bolder;
  font-size: 22px;
  margin-bottom: auto;
  float: left;
  margin-left: 30px;
  padding-top: 10px;
}

.buttons {
  display: flex;
  width: 100%;
}

.confirm-button {
  background: #000;
  border: 1px solid #000;
  border-radius: 10px;
  margin-top: 5%;
  margin-left: 27px;
  width: 50%;
  height: 50%;
  margin-right: 20px;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
  color: #fff;
  justify-self: end;
}
.cancel-button {
  background: lightgray;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-top: 5%;
  margin-left: 20px;
  width: 50%;
  height: 50%;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
  color: gray;
}

/* START DARK MODE */
.dark .wrapper span {
  color: #000;
}

.dark .card-title {
  background: #000000ad;
  color: #fff;
  border-color: #000;
}

/* END DARK MODE */
</style>
