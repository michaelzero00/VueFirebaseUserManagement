<template>
  <div class="container">
    <!-- can't find a user that matches that slug in the db -->
    <div v-if="!searchedUser">No user found with that name</div>
    <!-- found the user, render the page -->
    <div class="hero-body" v-if="searchedUser">
      <h1 class="title">{{ searchedUser.userName }}</h1>
      <ul>
        <li><em>Email:</em> {{ searchedUser.email }}</li>
        <li><em>UID:</em> {{ searchedUser.uid }}</li>
        <li><em>User Role:</em> {{ searchedUser.userRole }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
export default {
  name: "UserProfile",
  data() {
    return {
      searchedUser: null,
    };
  },
  mounted() {
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
  },
};
</script>

<style>
</style>