import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'
import rights from '../components/power/rights.vue'
import roles from '../components/power/roles.vue'
import cate from '../components/goods/cate.vue'
import params from '../components/goods/params.vue'
import list from '../components/goods/list.vue'
import add from '../components/goods/add.vue'
import order from '../components/order/order.vue';
import report from '../components/report/report.vue'
Vue.use(VueRouter)

　const router = new VueRouter({
  routes: [
    {path: '/', redirect:'/login'},
    { path: '/login', component: login },
    { path: '/home', component: home ,redirect:'/welcome',children:[
      {path:'/welcome',component:welcome},
      {path:'/users',component:Users},
      {path:'/rights',component:rights},
      {path:'/roles',component:roles},
      {path:'/categories',component:cate},
      {path:'/params',component:params},
      {path:'/list',component:list},
      {path:'/list/add',component:add},
      {path:'/order',component:order},
      {path:'/report',component:report},
    ]},
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login')
    return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr)
    return next('/login');
  next();
});

export default router;

