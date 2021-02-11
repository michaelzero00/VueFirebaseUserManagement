# Vue User Management with Firebase

<!-- ABOUT THE PROJECT -->
## About The Project

Firebase Auth doesn't provide customised user roles, so this boilerplate project uses Firebase Firestore to create and manage users on top of the Firebase Auth.

When a user is logged in, selected details are matched against a record in Firebase Firestore and stored in Vuex state, which can be accessessed from anywhere in the app.

### Built With

* [Vue 2](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)  
* [Firebase](https://firebase.google.com/)
* [Bulma](https://bulma.io/) 

<!-- GETTING STARTED -->
## Getting Started

You'll need a free Firebase account.

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/michaelzero00/VueFirebaseUserManagement.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start a new Firebase project and enable Firebase Auth (at least the email and password option) and Firebase Firestore.
4. Copy your project settings from the Project Overview => Firebase SDK snippet => Config screen
5. Rename `src/firebase/firebaseInit_template.js` to `src/firebase/firebaseInit.js` and enter your details from step 4.
6. Run    
    ```sh
   npm run serve
   ```