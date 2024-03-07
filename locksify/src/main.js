import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

const switchElement = document.querySelector("#checkbox");

switchElement.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
