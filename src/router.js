import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/UserRegisterPage";
import LoginPage from "@/pages/UserLoginPage";
import ErrorPage from "@/pages/ErrorPage";
import UserInfoPage from "@/pages/UserInfoPage";
import ConfirmPage from "@/pages/ConfirmPage";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/confirm',
        component: ConfirmPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/error',
        component: ErrorPage
    },
    {
        path: '/info',
        component: UserInfoPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;