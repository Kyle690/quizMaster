import * as firebase from "firebase";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD3XNrWTPmr8W7xXjFB7-qtMcx-wJwRN20",
    authDomain: "quizmaster-144d7.firebaseapp.com",
    databaseURL: "https://quizmaster-144d7.firebaseio.com",
    projectId: "quizmaster-144d7",
    storageBucket: "quizmaster-144d7.appspot.com",
    messagingSenderId: "556210628706",
    appId: "1:556210628706:web:68e021fe87017fd119093b"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database=app.database();