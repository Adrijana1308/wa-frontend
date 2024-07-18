import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginForm from "@/views/LoginForm.vue";
import signup from "@/views/SignUpView.vue";
import Card from "@/components/Card.vue";
import {Auth} from "@/Services";
import BusinessFeatureTest from "@/components/BusinessFeatureTest.vue";
import Edit from "@/components/Edit.vue";

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
  { // Sada se zapravo zove Create post :D
    path: "/business-feature",
    name: "business-feature",
    component: BusinessFeatureTest,
    meta: {requiresAuth: true, requiresBusiness: true},
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
    meta: {requiresAuth: true, requiresBusiness: true},
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Interceptor logic
/* U ovom slučaju, interceptiramo sve rute, ako je korisnik ulogiran */
router.beforeEach((to, from, next) => {
  const publicSites = ["/home", "/login", "/signup"];
  const needLogin = !publicSites.includes(to.path);
  const user = Auth.getUser();

  if(needLogin && !user){
    next("/login");
    return 
  }

  if(to.matched.some(record => record.meta.requiresBusiness)){
    if(user && user.userType !== "business"){
      return next("/home");
    }
  }
  next();
})

export default router;
