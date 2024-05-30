<template>
  <div class="login-container">
    <div class="login-window">
      <h1 class="heading">Login</h1>
      <p class="Welcome">Welcome back, glad to see you again!</p>
      <form @submit.prevent="login" class="login-form">
        <input 
        v-model="email" 
        type="text" 
        id="email" 
        placeholder="Email" 
        required>
        
        <div class="password-container">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" name="user-password" placeholder="Password" autocomplete="nope" required>
          <span @click="togglePasswordvisibility" class="password-toggle">
            <i :class="['bi', showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill']"></i>
          </span>
        </div>
        
        <button type="submit">Sign in</button>
        <router-link class="register-link" to="/signup">
        <button type="submit" class="register">Register Now!</button>
        </router-link>
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

.dark input{
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #000000;
  padding: 15px;
  transition: .5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}

input{
  width: 100%;
  height: 35px;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: none;
  color: #000000;
  padding: 15px;
  transition: .5s;
  text-transform: none;
  overflow: hidden;
  box-sizing: border-box;
}

input:hover{
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: .1s ease-in-out;
  line-height: 1;
}

.dark input:hover{
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: .1s ease-in-out;
  line-height: 1;
}

.dark input::placeholder{
  color: black;
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

.register-link{
  text-decoration: none;
  color: black;
}

.dark .register{
  background-color: #a570ef;
}

.dark .register-link{
  text-decoration: none;
  color: black;
}

button:hover{
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: .1s ease-in-out;
}

.register:hover{
  color: black;
  animation: pulse 1s infinite;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 36%;
  right: 10px;
  transform: translate(-50%);
  cursor: pointer;
  z-index: 1;
}

#password {
  padding-right: 20%;
  box-sizing: border-box;
}

</style>

<script>
import { Auth } from '@/Services';

export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    togglePasswordvisibility(){
      this.showPassword = !this.showPassword;
    },
    mounted(){
      this.$nextTick(() => {
        const passwordInput = document.getElementById('password');
        if(passwordInput){
          passwordInput.setAttribute('autocomplete', 'off');
        }
      });
    },
    async login() {
      try {
        // Handle login logic here
        let success = await Auth.login(this.email, this.password);
        console.log('Rezultat prijave', success);
        if(success == true){
          this.$router.push({name: 'home'})
        }

      } catch (error){
        console.error(error);
      }
    },
    goToSignup(){
      this.$router.push('signup')
    },
  },
};
</script>
