import Vue from "vue";
import VueRouter from "vue-router";
import SignUpPage from "../views/SignUpPage.vue";
import UserAccountPage from "../views/UserAccountPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "signup",
    component: SignUpPage,
  },
  {
    path: "/user",

    children: [
      {
        path: "account",
        name: "user",
        component: UserAccountPage,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
