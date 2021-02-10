<template>
<nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">

    <router-link 
          :to="{ name: 'Home' }"
          class="navbar-item">moodframe
          </router-link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="currentUser">
        <a class="navbar-link">
          {{currentUser.displayName ? currentUser.displayName : currentUser.userName}}
        </a>
             

        <div class="navbar-dropdown">
          <router-link 
          class="navbar-item"
          :to="{name: 'UserProfile', params: {userSlug: currentUser.userSlug}}">
          Account
          </router-link>

          <hr class="navbar-divider">
          <a @click="signOut" class="navbar-item">
            Sign Out
          </a>
        </div>
      </div>
      <div class="navbar-item" v-if="!currentUser">
        <div class="buttons">
   
                      <router-link 
          :to="{ name: 'SignUp' }"
          class="button is-primary">Sign up
          </router-link>
          <router-link 
          :to="{ name: 'SignIn' }"
          class="button is-danger">Log In
          </router-link>

        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MainNavBar',
  methods: {
    signOut() {
      this.$store.dispatch('logout')

    }
  },
computed: mapState({
    currentUser: state => state.user.user

})
}


</script>

<style>

</style>