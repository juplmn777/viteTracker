import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
//Element-plus :
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
//router pages :
import HomePage from './pages/Home.vue';
import SettingsPage from './pages/Settings.vue';

import SettingsApp from './components/SettingsApp.vue';
import SettingsUser from './components/SettingsUser.vue';

//definition des pages du router :
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      alias: '/home',
      component: HomePage,
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
      children: [
        {
          path: 'app',
          component: SettingsApp,
        },
        {
          path: 'user',
          component: SettingsUser,
        },
      ],
    },
  ],
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
