import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./Services/state";

createApp(App)
.use(router)
.use(store)
.mount("#app");

const switchElement = document.querySelector("#checkbox");

switchElement.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
