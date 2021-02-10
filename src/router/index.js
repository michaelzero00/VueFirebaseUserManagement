import Vue from "vue";
import VueRouter from "vue-router";
// import views
import Home from "../views/Home.vue";
import SignUp from '../views/auth/SignUp.vue'
import SignIn from '../views/auth/SignIn.vue'
import UserProfile from '../views/UserProfile.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import Profile from '../views/user/Profile.vue'
//import firebase for route guards
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/signup",
        name: 'SignUp',
        component: SignUp
    },
    {
        path: "/signin",
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/user/:userSlug',
        name: 'UserProfile',
        component: UserProfile,
        props: true
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    }

];



const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()) {
        next('SignIn');
    } else {
        next();
    }
});
export default router;