<template>
  <div class="login-container">
    <div class="login-window">
      <h1 class="heading">Login</h1>
      <p class="Welcome">Welcome back, glad to see you again!</p>
      <form @submit.prevent="login" class="login-form">
      <!--  <label for="username">Username:</label> --> <!-- Labeli su zakomentirani radi testiranja i provjere -->
        <input v-model="username" type="text" id="email" placeholder="Email" required>

      <!--  <label for="password">Password:</label> -->
        <input v-model="password" type="password" id="password" placeholder="Password" required>

        <button type="submit">Sign in</button>
        <button type="submit" class="register">Register now!</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

@keyframes pulse {
  0% {transform: scale(1);}
  50% {transform: scale(1.1);}
  100% {transform: scale(1);}
}
 .login-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
 
 .dark .login-container{
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
 }

.dark .login-window {
  padding: 90px;
  background-color: rgba(173, 216, 230, 0.1); /* Adjust the color and opacity as needed */
  border: rgba(173, 216, 230, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px); /* Adjust the blur radius as needed */
  border-radius: 15px;
}

.login-window{
  padding: 90px;
  background-color: blanchedalmond;
  border: 10px solid #d890f530;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.dark input{
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #ffffff;
  padding: 15px;
  transition: .5s;
  text-transform: capitalize;
}

input{
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: none;
  color: #ffffff;
  padding: 15px;
  transition: .5s;
  text-transform: capitalize;
}

input:hover{
  color: rgba(255, 255, 255, .4);
  transform: scale(1.1);
  transition: .1s ease-in-out;
}

.dark input::placeholder{
  color: white;
}

 input::placeholder{
   color: black;
 }

button {
  margin: 10px auto;
  display: block;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  transition: .5s;
  text-align: center;
}

.register {
  background-color: #d890f530;
}

.dark .register{
  background-color: #a570ef;
}

button:hover{
  color: rgba(255, 255, 255, .4);
  transform: scale(1.1);
  transition: .1s ease-in-out; 
}

.register:hover{
  color: black;
  animation: pulse 1s infinite;
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
