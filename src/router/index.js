import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter)
import filmRouter from "./routes/films";
import cinemaRouter from "./routes/cinemas";
import centerRouter from "./routes/center";


const routes = [
  
   ...filmRouter,
   cinemaRouter,
   centerRouter,
   { path: '/', redirect:'/films' },


  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
