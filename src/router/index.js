import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import FoundView from '../views/FoundView.vue'
import OrderView from '../views/OrderView.vue'
import MineView from '../views/MineView.vue'
import TestView from '../views/TestView.vue'

const routes = [

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guestOnly: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/found',
    name: 'found',
    component: FoundView,
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
    meta: { requiresAuth: true }
  },
  {
    path: '/mine',
    name: 'mine',
    component: MineView,
    meta: { requiresAuth: true }
  },



  {
    path: '/test',
    name: 'test',
    component: TestView,
    meta: { requiresAuth: true }
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const is_login = store.state.is_login;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!is_login) {
      next('/login');
    } else {
      next();
    }
  }
  else if (to.matched.some(record => record.meta.guestOnly)) {
    if (is_login) {
      next('/');
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router
