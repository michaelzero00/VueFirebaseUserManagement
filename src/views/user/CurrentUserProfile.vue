<template>
  <div class="container">
    <div class="hero-body">
      <h1 class="title">{{ currentUser.userName }}</h1>
      <ul>
        <li><em>Email:</em> {{ currentUser.email }}</li>
        <li><em>UID:</em> {{ currentUser.uid }}</li>
        <li><em>User Role:</em> {{ currentUser.userRole }}</li>
        <li>Photo:{{ currentUser }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  props: [],
  data() {
    return {};
  },
  computed: mapState({
    currentUser: (state) => state.user.user,
  }),
  watch: {
    currentUser() {
      if (!this.user) {
        this.$router.push(`/signin`);
      }
    },
  },
};
</script>

<style>
</style>