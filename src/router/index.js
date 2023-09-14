import { createRouter, createWebHistory } from 'vue-router'
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'

const routes = [
    {
        path: '/', 
        name: 'Home', 
        component: Nav, 
    },
    {
        path: '/about', 
        name: 'About', 
        component: Footer, 
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router