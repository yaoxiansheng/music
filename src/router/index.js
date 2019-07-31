import Vue from 'vue'
import Router from 'vue-router'
import Rank from "components/page/rank/index"
import Recommend from "components/page/recommend/index"
import Seacher from "components/page/seacher/index"
import Singer from "components/page/singer/index"
import Detal from "components/page/detal/index"
import Detalrecommend from "components/page/detalrecommend/index"
import DetalRank from "components/page/detalRank/index"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children:[
        {
          path: '/detalRank',
          name: 'detalRank',
          component: DetalRank,
        }
      ]
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: Recommend,
        children:[
          {
            path: '/detalrecommend',
            name: 'detalrecommend',
            component: Detalrecommend,
          }
        ]
    },
    {
        path: '/seacher',
        name: 'seacher',
        component: Seacher
    },
    {
        path: '/singer',
        name: 'singer',
        component: Singer,
        children:[
          {
            path: '/detal',
            name: 'detal',
            component: Detal,
          }
        ]
    },
    {
      path:'/',
      redirect:'/recommend' //重定向
  }
  ]
})
