<template>
  <div>
    <div class="field">
      <div 
      class="control has-icons-left has-icons-right"
      :class="{'is-loading': loadingIcon }">
        <input
          @keyup="searchTimeOut"
          class="input"
          type="text"
          v-model="testUserName"
          placeholder="Username"
          required
         
        />
        <span class="icon is-left">
          <i class="mdi mdi-account"></i>
        </span>
        <span v-if="userNameTaken" class="icon is-small is-right">
          <i class="mdi mdi-alert"></i>
        </span>
      </div>
    </div>
    <div v-if="userNameTaken">
      <p class="help is-danger">This username is taken</p>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
export default {
  name: "UsernameTester",
  data() {
    return {
      testUserName: "",
      userNameTaken: false,
      loadingIcon: false
    };
  },
  methods: {
    searchTimeOut() {
      this.userNameTaken = false;
      // create a delay before sending the data
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        //search db for username
        this.loadingIcon = true;
        db.collection("users")
          .where("userName", "==", this.testUserName)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              this.userNameTaken = false;
              this.$emit("isUserNameTaken", this.userNameTaken);
              this.$emit("whatIsUserName", this.testUserName);
              this.loadingIcon = false;
            } else {
              snapshot.forEach((doc) => {
                if (doc.data().userName == this.testUserName) {
                  this.userNameTaken = true;
                  this.$emit("isUserNameTaken", this.userNameTaken);
                  this.loadingIcon = false;   
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 600);
    },
  },
};
</script>

<style>
</style>