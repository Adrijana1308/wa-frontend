import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginForm from "@/views/LoginForm.vue";
import Card from "@/components/Card.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/SignUpView.vue"),
  },
  {
    path: "/card/:_id",
    name: "card",
    component: Card,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
