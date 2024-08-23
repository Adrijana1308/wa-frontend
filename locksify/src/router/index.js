import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginForm from "@/views/LoginForm.vue";
import signup from "@/views/SignUpView.vue";
import Card from "@/components/Card.vue";
import {Auth} from "@/Services";
import BusinessFeatureTest from "@/components/BusinessFeatureTest.vue";
import EditPost from "@/components/EditPost.vue";
import store from "@/Services/state.js"

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
    name: "signup",
    component: signup,
  },
  {
    path: "/card/:_id",
    name: "card",
    component: Card,
    props: true,
  },
  { // Dodano za potrebe testa
    path: "/business-feature",
    name: "business-feature",
    component: BusinessFeatureTest,
    meta: {requiresAuth: true, requiresBusiness: true},
  },
  {
    path: "/edit-post/:postId",
    name: "EditPost",
    component: EditPost,
    meta: {requiresAuth: true},
  },
  // {
  //   path: "/profile",
  //   name: "profile",
  //   component: () => import("../views/ProfileView.vue"),
  //   meta: {requiresAuth: true},
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Interceptor logic
/* U ovom slučaju, interceptiramo sve rute, ako je korisnik ulogiran */
router.beforeEach((to, from, next) => {
  const publicSites = ["/login", "/signup"];
  const needLogin = !publicSites.includes(to.path);
  const user = Auth.getUser();
  const isAuthenticated = store.getters.isAuthenticated;
  console.log('User from Auth.getUser():', user);

  console.log('Navigating to:', to.path);
  console.log('User:', user);
  console.log('Is authenticated:', isAuthenticated);

  if(needLogin && !user){
    console.log('Redirecting to login...');
    next("/login");
    return 
  }

  if(to.matched.some(record => record.meta.requiresBusiness)){
    if(user && user.userType !== "business"){
      console.log('User is not business user, redirecting to home')
      return next("/home");
    }
  }
  next();
})

export default router;
