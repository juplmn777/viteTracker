import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
//Element-plus :
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
//router pages :
import HomePage from './pages/Home.vue';

//Lasy Loading
const LoginPage = () => import('./pages/Login.vue');
const NotFoundPage = () => import('./pages/NotFound.vue');

const SettingsPage = () => import('./pages/Settings.vue');
const SettingsApp = () => import('./components/SettingsApp.vue');

const SettingsUser = () => import('./components/SettingsUser.vue');

//definition des pages du router :
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      alias: '/home',
      component: HomePage,
      meta: {
        needToBeLogged: false,
      },
      children: [
        {
          path: 'home/:taskID',
          component: HomePage,
        },
      ],
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
      metta: { needToBeLogged: false },
      children: [
        {
          path: 'app',
          component: SettingsApp,
          meta: { needToBeLogged: false },
        },
        {
          path: 'user',
          component: SettingsUser,
          meta: { needToBeLogged: false },
        },
      ],
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFoundPage,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('isLogged')) {
          return '/';
        }
      },
    },
    {
      path: '/:wrongPath(.*)', //n'importe quel caractère (.), plusieurs fois (*)
      redirect: (to) => {
        return {
          name: 'NotFound',
          params: {
            wrongPath: to.params.wrongPath,
          },
        };
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.needToBeLogged && !localStorage.getItem('isLogged')) {
    return '/login';
  }
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
