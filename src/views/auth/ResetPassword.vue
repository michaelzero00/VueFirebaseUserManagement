<template>
  <section class="is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-one-third-desktop is-offset-one-third-desktop">
          <h3 class="title has-text-black-bis" v-if="!submittedMessage">
            Reset Password
          </h3>
          <h3 class="title has-text-black-bis" v-if="submittedMessage">
            {{ submittedMessage }}
          </h3>
          <div class="box" v-if="!submittedMessage">
            <form @submit.prevent="submit">
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
              <div class="field" v-if="error">
                <label class="label has-text-danger">{{ error }}</label>
              </div>

              <button
                type="submit"
                class="button button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
              >
                <span>Reset Password</span>
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{ name: 'SignIn' }">Sign In?</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: null,
      submitted: false,
      submittedMessage: null,
    };
  },
  computed: mapState({
    error: (state) => state.shared.error,
    user: (state) => state.user.user,
    loading: (state) => state.shared.loading,
  }),

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push(`/user/${this.user.userSlug}`);
      }
    },
    loading() {
      if (!this.loading && this.submitted) {
        this.submittedMessage =
          "Thank you, please check your email for the reset instructions.";
      }
    },
  },
  methods: {
    submit() {
      this.submitted = true;
      this.$store.dispatch("resetPasswordWithEmail", {
        email: this.email,
        password: this.password,
        username: this.username,
      });
    },
  },
};
</script>

<style>
</style>