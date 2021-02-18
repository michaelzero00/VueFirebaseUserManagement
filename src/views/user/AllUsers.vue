<template>
  <div class="container">
    <div>
      <ul v>
        <li v-for="user in users" :key="user.uid">
            <router-link :to="{name: 'UserProfile', params: {userSlug: user.userSlug}}">{{ user.displayName }}</router-link>
          
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.users.push(doc.data());
        });
      });
  },
};
</script>

<style>
</style>