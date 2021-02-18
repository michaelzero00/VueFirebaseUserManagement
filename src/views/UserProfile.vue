<template>
  <div class="container">
    <progress v-if="loading" class="progress is-small is-primary" max="100">15%</progress>
    <!-- can't find a user that matches that slug in the db -->
    <div v-if="!searchedUser && !loading">No user found with that name</div>
    <!-- found the user, render the page -->
    <div class="hero-body" v-if="searchedUser">
      <h1 class="title">{{ searchedUser.userName }}</h1>
      <ul>
        <li><em>Email:</em> {{ searchedUser.email }}</li>
        <li><em>UID:</em> {{ searchedUser.uid }}</li>
        <li><em>User Role:</em> {{ searchedUser.userRole }}</li>
        <li v-if="searchedUser.photoUrl">has a photo</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../firebase/firebaseInit";
export default {
  name: "UserProfile",
  computed: mapState({
    error: (state) => state.shared.error,
    user: (state) => state.user.user,
    loading: (state) => state.shared.loading,
  }),
  data(){
    return {
      searchedUser: null,
    }
  },
  mounted() {
    this.$store.commit("setLoading", true)
      db.collection("users")
        .where("userSlug", "==", this.$route.params.userSlug)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            this.searchedUser = null;
            this.$store.dispatch("setLoading", false)
            return;
          } else {
            snapshot.forEach((doc) => {
              this.searchedUser = doc.data();
              this.$store.commit("setLoading", false)
            });
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
};
</script>

<style>
</style>