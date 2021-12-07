import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
//Element-plus :
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
//router pages :
import HomePage from './pages/Home.vue';

//Lasy loading
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
        needJsonBin: true,
      },
      children: [
        {
          path: 'home/:taskID',
          component: HomePage,
        },
      ],
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
      meta: { needJsonBin: true },
      children: [
        {
          path: 'app',
          component: SettingsApp,
          meta: { needJsonBin: false },
        },
        {
          path: 'user',
          component: SettingsUser,
          meta: { needJsonBin: true },
        },
      ],
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('jsonBinAccess')) {
          return '/';
        }
      },
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFoundPage,
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
  /* Global localStorage */
  if (to.meta.needJsonBin && !localStorage.getItem('jsonBinAccess')) {
    return '/settings/app';
  }
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
