import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';


import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
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


]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const isLogin = store.state.is_login;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      next('/login');
    } else {
      next();
    }
  }
  else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLogin) {
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
