import Vue from 'vue'
import Router from 'vue-router'
import main from "@/components/main"
import Home from "@/components/contents/Home"
import Map from "@/components/contents/Maps"
import Web from "@/components/contents/Web"
import Mood from "@/components/contents/Mood"
import Message from "@/components/contents/Message"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: main,
      children: [{
        path: '/Home',
        name: 'Home',
        component: Home
      },
      {
        path: '/Map',
        name: 'Map',
        component: Map
      },
      {
        path: '/Web',
        name: 'Web',
        component: Web
      },
      {
        path: '/Mood',
        name: 'Mood',
        component: Mood
      },
      {
        path: '/Message',
        name: 'Message',
        component: Message
      },
      ]
    },
  ]
})
