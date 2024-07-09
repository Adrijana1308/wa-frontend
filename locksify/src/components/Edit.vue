<template>
    <div>
      <h1>Edit Salon</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="post.name" />
        </div>
        <div>
          <label for="location">Location</label>
          <input type="text" v-model="post.location" />
        </div>
        <div>
          <label for="source">Source</label>
          <input type="text" v-model="post.source" />
        </div>
        <div>
          <label for="open">Open</label>
          <input type="time" v-model="post.open" />
        </div>
        <div>
          <label for="close">Close</label>
          <input type="time" v-model="post.close" />
        </div>
        <button type="submit">Update</button>
      </form>
  
      <h2>Book an Appointment</h2>
      <form @submit.prevent="handleBookingSubmit">
        <div>
          <label for="date">Date</label>
          <input type="date" v-model="selectedDate" />
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" v-model="selectedTime" />
        </div>
        <div>
          <label for="hairstyle">Hairstyle</label>
          <select v-model="selectedHairstyle">
            <option value="">Select a hairstyle</option>
            <option v-for="(hairstyle, index) in availableHairstyles" :key="index" :value="hairstyle.type">
              {{ hairstyle.type }} - {{ hairstyle.price }} - {{ hairstyle.duration }} min
            </option>
          </select>
        </div>
        <button type="submit">Book</button>
      </form>
  
      <h2>Existing Bookings</h2>
      <ul>
        <li v-for="(booking, index) in bookings" :key="index">
          {{ booking.date }} at {{ booking.time }} - {{ booking.hairstyle }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { Posts } from "../Services";
  
  export default {
    data() {
      return {
        post: {
          name: "",
          location: "",
          source: "",
          open: "",
          close: "",
          hairstyles: { short: [], medium: [], long: [], other: [] },
        },
        selectedDate: "",
        selectedTime: "",
        selectedHairstyle: "",
        bookings: [],
      };
    },
    computed: {
      availableHairstyles() {
        return ["short", "medium", "long", "other"].flatMap(type => this.post.hairstyles[type]);
      },
    },
    async created() {
      let data = await Posts.getOne(this.$route.params.id);
      this.post = data;
      let bookingsData = await Posts.getBookings(this.$route.params.id);
      this.bookings = bookingsData;
    },
    methods: {
      async handleSubmit() {
        await Posts.update(this.post);
        this.$router.push("/");
      },
      async handleBookingSubmit() {
        const bookingData = {
          date: this.selectedDate,
          time: this.selectedTime,
          salon_id: this.$route.params.id,
          hairstyle: this.selectedHairstyle,
        };
        await Posts.createBooking(bookingData);
        let bookingsData = await Posts.getBookings(this.$route.params.id);
        this.bookings = bookingsData;
      },
    },
  };
  </script>
  