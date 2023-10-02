import { createRouter, createWebHistory } from 'vue-router'
import  CourseDetail from '../components/CourseDetail.vue'
import Typer from '../components/Typer.vue'
import Courses from '../components/Courses.vue'

const routes = [
    {
        path: '/', 
        name: 'Home', 
        component: Courses, 
    },
    {
        path: '/course/:id/', 
        name: 'CourseDetail', 
        component: CourseDetail, 
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