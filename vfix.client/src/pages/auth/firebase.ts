import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCZMAjao69LsuqMvcY3rTEK1ZmgGYcQyVQ",
  authDomain: "vfix-1d8c3.firebaseapp.com",
  projectId: "vfix-1d8c3",
  storageBucket: "vfix-1d8c3.firebasestorage.app",
  messagingSenderId: "742532325513",
  appId: "1:742532325513:web:a4c78de8dffb7cdc3c2658",
  measurementId: "G-4WTSYXGXPZ",
};

// Khởi tạo Firebase App và Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Tạo reCAPTCHA verifier
export const createRecaptcha = () => {
  if (typeof window !== "undefined") {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: unknown) => {
          console.log("reCAPTCHA verified", response);
        },
      },
      auth
    );
    return window.recaptchaVerifier.render();
  }
};

// Đăng nhập bằng Google
export const handleGoogleLogin = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, provider);
    alert("Đăng nhập bằng Google thành công");
  } catch (error) {
    console.error(error);
    alert("Google login thất bại");
  }
};

// Đăng nhập bằng số điện thoại
export const handlePhoneLogin = async (): Promise<void> => {
  const phoneNumber = window.prompt("Nhập số điện thoại (vd: +84901234567)");
  if (!phoneNumber) return;

  createRecaptcha();

  try {
    const confirmation: ConfirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    const otp = window.prompt("Nhập mã OTP vừa nhận:");
    if (otp) {
      await confirmation.confirm(otp);
      alert("Đăng nhập bằng điện thoại thành công!");
    }
  } catch (error) {
    console.error(error);
    alert("Đăng nhập bằng số điện thoại thất bại.");
  }
};

export { auth, provider };
