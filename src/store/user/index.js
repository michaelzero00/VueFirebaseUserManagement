import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit";
let slugify = require("slugify");

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            if (payload) {
                state.user = payload;
            } else {
                state.user = null;
            }
        }
    },
    actions: {
        signUserUp({ commit }, payload) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                    let userSlug = slugify(payload.username, {
                        replacement: "-",
                        remove: /[$*_+~.()'"!\-:#@]/g,
                        lower: true
                    });
                    const newUser = {
                        userRole: null,
                        uid: data.user.uid,
                        userName: payload.username,
                        userSlug,
                        displayName: data.user.displayName,
                        email: data.user.email,
                        photoUrl: data.user.photoURL
                    };
                    db.collection("users")
                        .add(newUser)
                        .then(res => {
                            commit("setLoading", false);
                            commit("setUser", newUser);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        signUserIn({ commit }, payload) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    console.log(`got an error, commiting the setError`);
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        signUserInGoogle({ commit }) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(user => {
                    commit("setLoading", false);
                    console.log(user)
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        signUserInFacebook({ commit }) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        signUserInGithub({ commit }) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        signUserInTwitter({ commit }) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithPopup(new firebase.auth.TwitterAuthProvider())
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },

        resetPasswordWithEmail({ commit }, payload) {
            const { email } = payload;
            commit("clearError");
            commit("setLoading", true);
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    commit("setLoading", false);
                    console.log("Email Sent");
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    console.log(error);
                });
        },
        logout({ commit }) {
            firebase.auth().signOut();

            commit("clearError");
            commit("setUser", null);
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    }
};