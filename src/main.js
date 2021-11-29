import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
//Element-plus :
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
//router pages :
import HomePage from './pages/Home.vue';
import SettingsPage from './pages/Settings.vue';

//definition des pages du router :
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
    },
  ],
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
