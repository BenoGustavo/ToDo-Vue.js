import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/home/HomePage.vue";
import TodosPage from "@/views/todos/TodoListPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: '/list/:listId/todos',
    name: 'TodosPage',
    component: TodosPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
