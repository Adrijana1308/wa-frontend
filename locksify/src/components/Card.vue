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
        <button type="submit" class="book-button">Book now!</button>
      </a>
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
          <p class="appointment-p">Picked hairstyle/service</p>
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
        </div>
        <div>
          <div class="booking-dropdown">
            <label for="bookingDropdown">Select a Booking:</label>
            <select id="bookingDropdown" v-model="selectedBooking">
              <option
                v-for="booking in sortedBookings"
                :key="booking._id"
                :value="booking"
              >
                {{ formatBooking(booking) }}
              </option>
            </select>

            <div v-if="selectedBooking" class="selected-booking">
              <h3>Selected Booking Details:</h3>
              <p>Service: {{ selectedBooking.service }}</p>
              <p>Date: {{ selectedBooking.date }}</p>
              <p>
                Time: {{ selectedBooking.startTime }} -
                {{ selectedBooking.endTime }}
              </p>
              <p>Customer: {{ selectedBooking.customerName || "N/A" }}</p>
              <button
                v-if="canCancel(selectedBooking)"
                type="submit"
                @click="cancelBooking(selectedBooking._id)"
              >
                Cancel
              </button>
            </div>
          </div>
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Posts } from "../Services/index.js";
import axios from "axios";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import { _ } from "core-js";

const store = useStore();
const route = useRoute();

const post = ref(null);
const selectedCategory = ref("short");
const selectedHairstyles = ref([]);
const bookings = ref([]);
const date = ref(new Date());
const disabledDates = ref([]);
const selectedBooking = ref(null);

const postId = computed(() => route.params._id);
const currentUserId = computed(() => store.getters.currentUserId);

const sortedBookings = computed(() => {
  return bookings.value.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`);
    const dateB = new Date(`${b.date} ${b.startTime}`);
    return dateA - dateB;
  });
});

const formatBooking = (booking) => {
  return `${booking.date} | ${booking.startTime} - ${booking.endTime} | ${booking.service}`;
};

// const toggleDetails = (index) => {
//     // If already selected, close it by setting selectedIndex to null
//     openIndex.value = openIndex.value === index ? null : index;
// };

const canCancel = (booking) => {
  return (
    booking.userId === currentUserId.value ||
    post.value.userId === currentUserId.value ||
    store.getters.isSuperAdmin
  );
};

const fetchPostDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/posts/${postId.value}`
    );
    post.value = response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
};

const fetchBookings = async () => {
  try {
    const response = await axios.get("http://localhost:3000/bookings", {
      // params: {salonId: post.value._id}
    });
    bookings.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

onMounted(() => {
  fetchPostDetails();
  fetchBookings();
});

const isOwner = computed(
  () => post.value && post.value.userId === currentUserId
);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const selectHairstyle = (hairstyle) => {
  if (
    !selectedHairstyles.value.some(
      (selected) => selected.type === hairstyle.type
    )
  ) {
    selectedHairstyles.value.push(hairstyle);
  } else {
    alert("This hairstyle is already selected.");
  }
};

const removeHairstyle = (index) => {
  selectedHairstyles.value.splice(index, 1);
};

const confirmSelection = () => {
  if (selectedHairstyles.value.length === 0) {
    alert("Please select at least one hairstyle before confirming.");
    return;
  }

  if (!date.value) {
    alert("Please select a date and time for your appointment.");
    return;
  }

  try {
    confirmBooking();
  } catch (error) {
    console.error("Error confirming booking");
  }
};

const customDateFormatter = (date) => {
  return date instanceof Date && !isNaN(date)
    ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    : "Invalid date";
};

const attributes = computed(() => {
  // Ensure no phantom bookings are rendered by checking the correct salon ID and date format
  return bookings.value
    .filter((booking) => booking.salonId === post.value._id)
    .map((booking) => ({
      key: booking._id,
      dates: new Date(booking.date),
      customData: booking,
      highlight: { color: "blue" },
      popover: {
        label: `Booking: ${booking.service} - ${
          booking.customerName || "Unknown"
        }`,
      },
    }));
});

const handleDateClick = async (date) => {
  const formattedDate = customDateFormatter(date);
  console.log("Selected date:", formattedDate);
  await fetchDescription(formattedDate);
};

const fetchDescription = async (date) => {
  try {
    const response = await axios.get(`http://localhost:3000/bookings/${date}`);
    console.log("Fetched data for selected date:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const totalPrice = computed(() => {
  return selectedHairstyles.value.reduce(
    (total, hairstyle) => total + hairstyle.price,
    0
  );
});

const calculateEndTime = (startTime, duration) => {
  const startDate = new Date(Date.parse(startTime));
  if (isNaN(startDate)) {
    return "Invalid Date"; // Return a fallback if the start time is invalid
  }
  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + duration);
  return endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}.`;
};

const confirmBooking = async () => {
  try {
    const selectedService = selectedHairstyles.value
      .map((h) => h.type)
      .join(", ");

    // Start time format
    const startTime = date.value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Date format DD/MM/YY
    const formattedDate = formatDate(date.value);

    const duration = selectedHairstyles.value.reduce(
      (total, h) => total + h.duration,
      0
    );
    const endTime = calculateEndTime(date.value, duration);

    const bookingData = {
      salonId: post.value._id,
      userId: currentUserId.value,
      customerName: store.getters.getuser.fullName,
      date: formattedDate,
      startTime,
      service: selectedService,
      endTime,
    };

    console.log("Booking data: ", bookingData);

    const response = await axios.post(
      "http://localhost:3000/bookings",
      bookingData
    );

    if (response.data.success) {
      alert("Booking confirmed! Confirmation email sent.");
      fetchBookings();
    } else {
      alert("Booking failed: " + response.data.error);
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    alert("An error occured while confimring your booking!");
  }
};

const cancelBooking = async (bookingId) => {
  console.log("Booking ID to cancel:", bookingId);
  const token = store.getters.token; // Log the booking ID
  if (!bookingId) {
    alert("Booking ID is not available.");
    return;
  }

  const confirmation = confirm("Are you sure you want to cancel this booking?");
  if (!confirmation) return;

  try {
    const response = await axios.delete(
      `http://localhost:3000/bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Booking canceled successfully.");
      selectedBooking.value = null;
      // Optionally refresh bookings after canceling
      await fetchBookings();
    } else {
      alert("Failed to cancel booking.");
    }
  } catch (error) {
    console.error("Error canceling booking:", error);
    alert("An error occurred while canceling the booking.");
  }
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
  overflow-y: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 2% auto;
  font-family: "Poppins", sans-serif;
  max-width: 80%;
}

.booking-dropdown {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f4f4f9;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Light shadow for depth */
}

.booking-dropdown label {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  display: block;
  color: #333;
}

.booking-dropdown select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s ease;
}

.booking-dropdown select:focus {
  outline: none;
  border-color: #007bff; /* Border change on focus */
}

.booking-dropdown option {
  padding: 10px;
  font-size: 16px;
}

/* Selected Booking Details */
.selected-booking {
  margin-top: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05); /* Subtle shadow for separation */
}

.selected-booking h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.selected-booking p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.selected-booking button {
  display: inline-block;
  padding: 12px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.selected-booking button:hover {
  background-color: #e60000;
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
  font-size: 60px;
  font-family: "Playfair Display", serif;
}
.c-text {
  font-size: 18px;
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
  margin-bottom: 5%;
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

.dark .hairstyles {
  background: #000000ad;
  color: #fff;
  border-color: #000;
  border-radius: 10px;
  padding: 10px;
}

.dark .select-button {
  color: #fff;
}

.dark .appointment {
  background: #000000ad;
  color: #fff;
  border-color: #000;
  border-radius: 10px;
}

.dark .appointment-time,
.dark .appointment-price {
  background: #000000ad;
  border-color: #000;
  border-radius: 10px;
}

.dark .remove-button {
  color: #fff;
}

.dark .confirm-button {
  background: #000000ad;
  border-color: #fff;
}

.dark .booking-dropdown {
  background: #000000ad;
  border-color: #000;
  color: #fff;
  border-radius: 10px;
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
  justify-content: center;
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

/* mali ekrani */
/* Styles for screens 1024px or smaller */
@media screen and (max-width: 1024px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    margin: 15%;
  }

  .card-rating,
  .card-title,
  .card-img,
  .hairstyles,
  .appointment,
  .calendar {
    width: 100%;
    margin-bottom: 30px;
  }

  .card-text {
    font-size: 18px;
  }

  .card-title {
    text-align: center;
    padding-top: 5%;
  }

  .c-title {
    font-size: 40px;
  }

  .c-text {
    font-size: 18px;
  }

  .hours {
    font-size: 20px;
  }
  .book-button-link {
    width: 72%;
    margin: auto;
  }
  .book-button {
    width: 50%;
    font-size: 18px;
  }

  .hair-title {
    font-size: 30px;
  }

  .hair-info {
    font-size: 18px;
  }

  .type {
    font-size: 18px;
  }

  .price {
    font-size: 18px;
  }

  .calendar,
  .appointment {
    width: 90%;
    margin: auto;
  }

  .total-price {
    font-size: 20px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .confirm-button {
    width: 80%;
  }

  .select-button {
    font-size: 15px;
  }

  .appointment-time,
  .appointment-p {
    font-size: 18px;
  }
}

/* Styles for screens 768px or smaller */
@media screen and (max-width: 768px) {
  .wrapper {
    margin: 10%; /* Reduce margin for smaller screens */
  }

  .card-rating,
  .card-title,
  .card-img,
  .hairstyles,
  .appointment,
  .calendar {
    width: 100%;
    margin-bottom: 20px; /* Reduce space between sections */
  }

  .card-title {
    padding-top: 3%; /* Reduce padding for smaller screens */
  }

  .c-title {
    font-size: 35px; /* Adjust font size for smaller screens */
  }

  .c-text {
    font-size: 16px; /* Adjust text size */
  }

  .hours {
    font-size: 18px;
  }

  .book-button {
    width: 70%;
    font-size: 16px;
  }

  .hair-title {
    font-size: 28px; /* Slightly smaller titles */
  }

  .hair-info {
    font-size: 16px;
  }

  .type {
    font-size: 16px;
  }

  .price {
    font-size: 16px;
  }

  .calendar,
  .appointment {
    width: 95%; /* More compact layout */
  }

  .total-price {
    font-size: 18px;
  }

  .confirm-button {
    width: 100%; /* Full width for buttons */
    font-size: 16px;
  }
}

@media screen and (max-width: 426px) {
  .wrapper {
    margin: 20% 8%; /* Reduce margin for smaller screens */
  }

  .card-rating,
  .card-title,
  .card-img,
  .hairstyles,
  .appointment,
  .calendar {
    width: 100%;
    margin-bottom: 20px; /* Reduce space between sections */
  }

  .card-title {
    padding-top: 3%; /* Reduce padding for smaller screens */
  }

  .c-title {
    font-size: 35px; /* Adjust font size for smaller screens */
  }

  .c-text {
    font-size: 16px; /* Adjust text size */
  }

  .hours {
    font-size: 18px;
  }

  .book-button {
    width: 70%;
    font-size: 16px;
  }

  .hair-title {
    font-size: 28px; /* Slightly smaller titles */
  }

  .hair-info {
    font-size: 16px;
  }

  .type {
    font-size: 16px;
  }

  .price {
    font-size: 16px;
  }

  .calendar,
  .appointment {
    width: 95%; /* More compact layout */
  }

  .total-price {
    font-size: 18px;
  }

  .confirm-button {
    width: 100%; /* Full width for buttons */
    font-size: 16px;
  }

  .hair-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 30px;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding-bottom: 20px;
  }

  .hair-title {
    grid-column: span 2;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    justify-self: center;
  }

  .select-button {
    padding: 10px 35px;
    font-size: 14px; /* Font size for small screens */
    border-radius: 5px;
    font-family: "Poppins", sans-serif;
    width: 100%;
    max-width: 150px;
    text-align: center;
  }

  .card-services > .select-button {
    margin-left: auto;
    margin-right: 0;
  }

  .remove-button {
    font-size: 14px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: 0;
  }

  .appointment-time,
  .appointment-p,
  .total-price {
    font-size: 17px;
  }
}

/* end mali ekrani */
</style>
