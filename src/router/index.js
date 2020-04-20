import Vue from "vue";
import VueRouter from "vue-router";
import AddContactPage from "../views/AddContactPage.vue";
import UserAccountPage from "../views/UserAccountPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "addcontact",
    component: AddContactPage,
  },
  {
    path: "/user/:id",
    component: UserAccountPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
