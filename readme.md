# Vue User Management with Firebase

Firebase Auth doesn't provide customised user roles, so boilerplate adds uses Firestore to create and manage users on top of the Firebase Auth.

When a user is logged in, selected details are matched against a record in Firebase Firestore and stored in Vuex state, which can be accessessed from anywhere in the app.