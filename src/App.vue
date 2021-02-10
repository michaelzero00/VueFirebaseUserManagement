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
  // is user refreshes browser and firestore user logged in, set that in the store
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log("no matching users");
              return;
            } else {
              snapshot.forEach((doc) => {
                const newUser = doc.data();
                this.$store.commit("setUser", newUser);
              });
            }
          })
          .catch((err) => {
            console.log(`app.vue error ${err}`);
          });
      } else {
        this.$store.commit("setUser", null);
        console.log(`no user logged in`);
      }
    });
  },
};
</script>



