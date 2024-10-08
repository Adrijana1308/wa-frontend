<template>
  <div class="login-container">
    <div class="login-window">
      <h1 class="heading">Register</h1>
      <p class="Welcome">Welcome, let's get you set up!</p>
      <form @submit.prevent="handleSignup" class="signup-form">
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Email"
          required
        />

        <div class="password-container">
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="Full Name"
            required
          />
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="user-password"
            placeholder="Password"
            autocomplete="nope"
            required
          />
          <span @click="togglePasswordVisibility" class="password-toggle">
            <i
              :class="[
                'bi',
                showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill',
              ]"
            ></i>
          </span>

          <input
            v-model="passwordConfirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            id="password-confirmation"
            name="user-confirmation"
            placeholder="Confirm Password"
            required
          />
          <span
            @click="togglePasswordConfirmationVisibility"
            class="passwordConf-toggle"
          >
            <i
              :class="[
                'bi',
                showPasswordConfirmation ? 'bi-eye-fill' : 'bi-eye-slash-fill',
              ]"
            ></i>
          </span>
        </div>

        <select class="userType" v-model="userType">
          <option disabled value="">Select account type</option>
          <option value="customer">Customer</option>
          <option value="business">Business</option>
        </select>

        <button type="submit" class="register">Sign Up!</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      userType: "",
      showPassword: false,
      showPasswordConfirmation: false,
    };
  },
  methods: {
    ...mapActions(["signup", "login"]), // Mapping Vuex actions

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    togglePasswordConfirmationVisibility() {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    },

    async handleSignup() {
      try {
        if (
          !this.email ||
          !this.password ||
          !this.passwordConfirmation ||
          !this.userType ||
          !this.name
        ) {
          alert("All fields are required.");
          return;
        }

        if (this.password !== this.passwordConfirmation) {
          alert("Passwords do not match!");
          return;
        }

        let user = {
          username: this.email,
          fullName: this.name,
          password: this.password,
          userType: this.userType,
        };

        console.log("User data to send:", user);

        let success = await this.signup(user);
        if (success) {
          let loginResponse = await this.login({
            email: this.email,
            password: this.password,
          });
          if (loginResponse) {
            this.$router.push({ name: "home" });
          }
        } else {
          alert("Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again later.");
      }
    },
  },
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.dark .login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.dark .login-window {
  padding: 90px;
  background-color: rgba(
    173,
    216,
    230,
    0.1
  ); /* Adjust the color and opacity as needed */
  border: rgba(173, 216, 230, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px); /* Adjust the blur radius as needed */
  border-radius: 15px;
}

.login-window {
  padding: 90px;
  background-color: blanchedalmond;
  border: 10px solid #d890f530;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.dark input {
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #000000;
  padding: 15px;
  transition: 0.5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}

input {
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: none;
  color: #000000;
  padding: 15px;
  transition: 0.5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}

input:hover {
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: 0.1s ease-in-out;
  line-height: 1;
}

.dark input:hover {
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: 0.1s ease-in-out;
  line-height: 1;
}

.dark input::placeholder {
  color: black;
}

input::placeholder {
  color: black;
}

button {
  margin: 10px auto;
  display: block;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  transition: 0.5s;
  text-align: center;
}

.register {
  background-color: #d890f530;
}

.dark .register {
  background-color: #a570ef;
}

button:hover {
  color: black;
  transform: scale(1.1);
  transition: 0.1s ease-in-out;
}

.register:hover {
  color: black;
  animation: pulse 1s infinite;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 43%;
  right: 10px;
  transform: translate(-50%);
  cursor: pointer;
  z-index: 1;
}

.passwordConf-toggle {
  position: absolute;
  top: 81%;
  right: 10px;
  transform: translate(-50%);
  cursor: pointer;
  z-index: 1;
}

#password {
  padding-right: 20%;
  box-sizing: border-box;
}

#password-confirmation {
  padding-right: 20%;
  box-sizing: border-box;
}

.userType {
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: none;
  color: #000000;
  padding-left: 10px;
  transition: 0.5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}

.dark .userType {
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #000000;
  padding-left: 10px;
  transition: 0.5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
