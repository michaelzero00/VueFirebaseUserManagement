<template>
  <div class="container">
    <!-- can't find a user that matches that slug in the db -->
    <div v-if="!searchedUser">No user found with that name</div>
    <!-- found the user, render the page -->
    <div class="hero-body" v-if="searchedUser">
      <h1 class="title">{{ searchedUser.userName }}</h1>
      <ul>
        <li><em>Emaiasdasdl:</em> {{ searchedUser.email }}</li>
        <li><em>UID:</em> {{ searchedUser.uid }}</li>
        <li><em>User Role:</em> {{ searchedUser.userRole }}lalala</li>
        <div v-if="currentUser">There is a current user</div>
        <div v-else>There is no current user in state</div>
        <div class="">test</div>
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
  redirect: function(){
    console.log('redirect function triggered')
          if (!this.user.userSlug) {
        this.$router.push(`/login`);
      }
  },
  mounted() {
    if (this.user) {
      console.log(`found user in state, searching db`);
      db.collection("users")
        .where("userSlug", "==", this.$route.params.userSlug)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("no matching users");
            return;
          } else {
            snapshot.forEach((doc) => {
              this.searchedUser = doc.data();
            });
          }
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(`no user in state, redirecting`);
      this.$router.push(`/signin`);
    }
  },
};
</script>

<style>
</style>