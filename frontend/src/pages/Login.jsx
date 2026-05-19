import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await loginUser({ email, password });

    if (data.token) {
      setUserInfo(data);
      navigate("/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-zinc-100 rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue shopping
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 mb-6 rounded-xl text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-5">

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition text-lg">
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-600">
          New user?{" "}
          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;