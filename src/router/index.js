import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/login',
          component: () => import('../components/Login.vue'),
          meta: { title: '登录' }
        },
        {
            path: '/home',
            component: () => import('../components/Home'),
            meta: { title: '主页' }
        },
        {
            path: '/admin',
            component: () => import('../components/Admin'),
            meta: { title: '管理员服务' }
        }
    ]
});
