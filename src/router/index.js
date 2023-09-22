import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import Typer from '../components/Typer.vue'

const routes = [
    {
        path: '/', 
        name: 'Home', 
        component: MainPage, 
    },
    {
        path: '/level/:id/', 
        name: 'Level', 
        component: Typer, 
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router