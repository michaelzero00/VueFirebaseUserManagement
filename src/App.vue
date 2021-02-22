<template>
  <div id="app">
    <MainNavBar />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import MainNavBar from "./components/layout/MainNavBar.vue";
import firebase from "firebase/app";
import "firebase/auth";
import db from "./firebase/firebaseInit";

export default {
  name: "Home",
  components: {
    MainNavBar,
  },
};
</script>



