// firebase-config.js

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDWCj1utZYEfECasEiIVjcC-mcOXL-EN0M",

  authDomain: "portfolio-ngone.firebaseapp.com",

  projectId: "portfolio-ngone",

  storageBucket: "portfolio-ngone.firebasestorage.app",

  messagingSenderId: "390074684136",

  appId: "1:390074684136:web:4357507af8a0e9ee326f5d"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };