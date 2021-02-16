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
                    console.log(`commiting user to state from signUserIn function`)
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
                .then(firebaseUserData => {
                    // check db to see if this user exsists in users table
                    db.collection("users")
                        // cross ref against UID
                        .where("uid", "==", firebaseUserData.user.uid)
                        .get()
                        .then(snapshot => {
                            // if it returns empty snapshot then user does not exsist in table
                            if (snapshot.empty) {
                                console.log(`didn't find a user in the table so creating one`)
                                    // slugify displayname
                                let userSlug = slugify(firebaseUserData.user.displayName, {
                                    replacement: "-",
                                    remove: /[$*_+~.()'"!\-:#@]/g,
                                    lower: true
                                });
                                // form user object for the firestore table
                                const newUser = {
                                    userRole: null,
                                    uid: firebaseUserData.user.uid,
                                    userName: firebaseUserData.user.displayName,
                                    displayName: firebaseUserData.user.displayName,
                                    email: firebaseUserData.user.email,
                                    photoUrl: firebaseUserData.user.photoURL,
                                    userSlug: userSlug

                                };
                                // add new user to the firebase table
                                db.collection("users")
                                    .add(newUser)
                                    .then(res => {
                                        // form object for state
                                        const newStateUser = {
                                            uid: firebaseUserData.user.uid,
                                            userName: firebaseUserData.user.displayName,
                                            photoUrl: firebaseUserData.user.photoURL,
                                            userSlug: userSlug
                                        }
                                        commit("setLoading", false);
                                        console.log('commiting user to state after creating them in the firebase db')
                                        commit("setUser", newStateUser);
                                    })
                                    .catch(error => {
                                        commit("setLoading", false);
                                        commit("setError", error);
                                    });

                            } else {
                                snapshot.forEach((doc) => {
                                    console.log(doc.data())
                                })

                            }
                        });
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