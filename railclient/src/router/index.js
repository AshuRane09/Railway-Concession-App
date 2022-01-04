import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

import WelcomePage from "../components/welcome/welcome.vue";
import DashboardPage from "../components/dashboard/dashboard.vue";
import SignupPage from "../components/auth/signup.vue";
import SigninPage from "../components/auth/signin.vue";
import ManagerPage from "../components/manager/manager.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: WelcomePage,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignupPage,
    beforeEnter(to, from, next) {
      if (!store.state.token) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SigninPage,
    beforeEnter(to, from, next) {
      if (!store.state.token) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (store.state.token) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/manager",
    name: "Manager",
    component: ManagerPage,
    beforeEnter(to, from, next) {
      if (store.state.token) {
        next();
      } else {
        next("/signin");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
