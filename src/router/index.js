import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import Users from '../components/Users.vue'
Vue.use(VueRouter)

　const router = new VueRouter({
  routes: [
    {path: '/', redirect:'/login'},
    { path: '/login', component: login },
    { path: '/home', component: home ,redirect:'/welcome',children:[
      {path:'/welcome',component:welcome},
      {path:'/users',component:Users},
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