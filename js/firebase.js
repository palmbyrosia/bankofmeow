
var firebaseConfig = {
    apiKey: "AIzaSyBBDS3yxY4LPFyEs7B-cW3q2Lqh0JlnxXA",
    authDomain: "bank-of-meow.firebaseapp.com",
    projectId: "bank-of-meow",
    storageBucket: "bank-of-meow.appspot.com",
    messagingSenderId: "354671237665",
    appId: "1:354671237665:web:1f8aafdbac0d9cbe7a2160",
    measurementId: "G-TVS0E2VQ1G"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
