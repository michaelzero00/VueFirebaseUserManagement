<template>
  <section class="is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-one-third-desktop is-offset-one-third-desktop">
          <h3 class="title has-text-black-bis">Sign Up</h3>
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
              <!-- <button type="button" 
                    class="button button has-margin-bottom-25 facebook is-fullwidth">
              <span class="icon">
                <i class="mdi mdi-24px mdi-facebook"></i>
                </span> 
                <span> Continue with Facebook </span>
            </button> -->
            </div>
            <hr />
            <h3 class="mb-5">or sign up via email</h3>
            <form @submit.prevent="submit">
              <TestUserName
                class="pb-3"
                @isUserNameTaken="handleIsUserNameTaken"
                @whatIsUserName="handleWhatIsUserName"
              />

              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="email"
                    v-model="email"
                    placeholder="Email"
                    required
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
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    required
                  />

                  <span class="icon is-left">
                    <i class="mdi mdi-lock"></i>
                  </span>
                </div>
              </div>
              <button
                type="submit"
                class="button button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
                :disabled="disableSubmit"
              >
                <span>Sign Up</span>
              </button>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import TestUserName from "./UsernameTester.vue";

export default {
  mounted() {
    if (this.user) {
      if (this.user.userSlug !== null) {
        this.$router.push(`/profile`);
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      isUserNameUnique: false,
      passwordLength: null,
      submitted: false,
      emittedUserNameData: null,
      disableSubmit: false,
    };
  },
  components: {
    TestUserName,
  },
  computed: mapState({
    error: (state) => state.shared.error,
    user: (state) => state.user.user,
    loading: (state) => state.shared.loading,
  }),

  watch: {
    user(value) {
      console.log(`current user state is ${value}`);
      if (value !== null && value !== undefined) {
        this.$router.push(`/profile`);
      }
    },
  },

  methods: {
    submit() {
      if (this.passwordLength >= 0) {
        if (this.isUserNameUnique && !this.submitted) {
          this.submitted = true;
          this.disableSubmit = true;
          this.$store.dispatch("signUserUp", {
            email: this.email,
            password: this.password,
            displayName: this.username,
          });
        }
      } else {
        this.error = "Password must be more than 6 characters";
      }
      // only enable form submit if the username is unique
    },
    handleIsUserNameTaken(isUserNameTaken) {
      if (!isUserNameTaken) {
        this.isUserNameUnique = true;
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    },
    handleWhatIsUserName(whatIsUserName) {
      this.username = whatIsUserName;
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
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