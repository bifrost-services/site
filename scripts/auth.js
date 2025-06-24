// Placeholder
// scripts/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtJfrKttnVgeJByJdRGpkmTvn9OqXa-s4",
  authDomain: "bifrost-portal-c9bee.firebaseapp.com",
  projectId: "bifrost-portal-c9bee",
  storageBucket: "bifrost-portal-c9bee.firebasestorage.app",
  messagingSenderId: "202792670874",
  appId: "1:202792670874:web:f424347f80b4af3e9fb123",
  measurementId: "G-3VXD9EY7V5"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle login form
document.getElementById("bifrost-login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("bifrost-email").value.trim();
  const password = document.getElementById("bifrost-password").value;
  const errorMsg = document.getElementById("bifrost-login-error");
  errorMsg.textContent = "";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      errorMsg.textContent = "User data not found in Firestore.";
      return;
    }

    const userData = userSnap.data();
    sessionStorage.setItem("userRole", userData.role);
    sessionStorage.setItem("userCompany", userData.company);

    // Redirect to dashboard
    window.location.href = "/dashboard/index.html";
  } catch (error) {
    console.error("Login error:", error);
    errorMsg.textContent = "Login failed. Check your email and password.";
  }
});