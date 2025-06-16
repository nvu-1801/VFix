import { useState } from "react";
import { Lock, Mail, Phone } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, handleGoogleLogin, handlePhoneLogin } from "./auth/firebase";
import { mountain } from "../assets/images/index";
import { useNavigate } from "react-router-dom"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed bg-center px-4"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className="bg-white/10 backdrop-blur p-10 rounded-xl border border-white/40 shadow-xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white/40 focus-within:ring-2 focus-within:ring-green-400">
            <Mail className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="outline-none text-black flex-1 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white/40 focus-within:ring-2 focus-within:ring-green-400">
            <Lock className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="outline-none text-black flex-1 bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full !bg-green-500 hover:!bg-green-700 text-white font-semibold py-2 rounded-md shadow transition"
          >
            Login
          </button>

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:!bg-gray-100 flex items-center justify-center gap-2 !bg-white/40"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={handlePhoneLogin}
              className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:!bg-gray-100 flex items-center justify-center gap-2 !bg-white/40"
            >
              <Phone size={18} />
              Continue with Phone
            </button>
            <button
              onClick={() => navigate("/")}
              className="!bg-green-600 text-white px-4 py-1 rounded-md hover:!bg-green-700 transition"
            >
              Back to home
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-800">
          Don't have an account?{" "}
          <a href="#" className="text-green-900 font-medium hover:underline">
            Sign up
          </a>
        </p>
        <div id="recaptcha-container" className="hidden"></div>
      </div>
    </div>
  );
}
