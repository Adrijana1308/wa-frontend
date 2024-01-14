<template>
  <div class="login-container">
    <div class="login-window">
      <form @submit.prevent="login" class="login-form">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>

        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-window {
  padding: 125px;
  background-color: rgba(173, 216, 230, 0.1); /* Adjust the color and opacity as needed */
  border: rgba(173, 216, 230, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px); /* Adjust the blur radius as needed */
  border-radius: 15px;
}

.login-form {
  text-align: left;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

button {
  margin-top: 10px;
}

</style>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Handle login logic here
    },
  },
};
</script>
