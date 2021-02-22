<template>
  <section class="is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-one-third-desktop is-offset-one-third-desktop">
          <h3 class="title has-text-black-bis">Sign In</h3>
          <p class="subtitle has-text-grey">Please sign in to proceed.</p>
          <div class="box">
            <div class="buttons">
              <button
                type="button"
                class="button button has-margin-bottom-25 google is-fullwidth"
                @click.prevent="onSigninGoogle"
              >
                <span class="icon">
                  <i class="mdi mdi-24px mdi-google"></i>
                </span>
                <span> Continue with Google </span>
              </button>
            </div>
            <hr />
            <h3 class="mb-5">or sign in via email or username</h3>
            <form @submit.prevent="handleLoginSubmit">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                  />
                  <span class="icon is-left">
                    <i class="mdi mdi-email"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                  <span class="icon is-left">
                    <i class="mdi mdi-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field" v-if="error">
                <label class="label has-text-danger">{{ error }}</label>
              </div>

              <button
                type="submit"
                class="button button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
              >
                <span>Sign In</span>
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{ name: 'ResetPassword' }"
              >Forgot Password?</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    mounted() {
      if (this.user){
      this.$router.push(`/profile`)
    }
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: mapState({
    error: (state) => state.shared.error,
    user: (state) => state.user.user,
    loading: (state) => state.shared.loading,
    currentUser: (state) => state.user.user,
  }),
  methods: {
    handleLoginSubmit() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push(`/profile`);
      }
    },
  },
};
</script>

<style>
.buttons .button.google {
  background-color: #de5246;
  color: white;
}
.buttons .button.facebook {
  background-color: #4267b2;
  color: white;
}
</style>