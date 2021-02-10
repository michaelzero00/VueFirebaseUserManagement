import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

//firebase imports
import firebase from "firebase/app";
import "firebase/auth";
import "./firebase/firebaseInit";

// import the bulma scss
require('@/assets/main.scss');

Vue.config.productionTip = false;

// prevents firebase from querying auth state change on page refresh by user
let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            el: "#app",
            router,
            store,
            render: h => h(App),
            template: "<App/>",
            components: { App }
        });
    }
});