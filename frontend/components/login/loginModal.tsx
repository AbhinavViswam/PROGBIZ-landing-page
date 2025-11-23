"use client";

import { useContext, useState } from "react";
import {
  IconX,
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
} from "@tabler/icons-react";
import { login } from "@/backend/user/user.api";
import { UserContext } from "@/config/userContext";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);

  const { setUser } = useContext(UserContext);

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }

  async function handleclick(e: any) {
    e.preventDefault();
    try {
      setError("");
      const res = await login({ email: email, password: password });
      const token = res?.token;
      localStorage.setItem("token", token);
      setUser(res?.user);
      setEmail("");
      setPassword("");
    } catch (err) {
      //@ts-ignore
      setError(err?.message);
    }
  }

  return (
    <div>
      <button
        onClick={() => setModal(true)}
        className="shadow-sm px-4 py-2 rounded-2xl text-sm cursor-pointer font-semibold"
      >
        Admin login
      </button>
      {modal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={onBackdropClick}
        >
          {/* Modal */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IconX size={22} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            {/* Form */}
            <div className="flex flex-col gap-5">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <IconMail size={20} className="text-gray-500" />
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Password</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 relative">
                  <IconLock size={20} className="text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-600 hover:text-black"
                  >
                    {showPassword ? (
                      <IconEyeOff size={20} />
                    ) : (
                      <IconEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-red-500">{error}</div>

              {/* Submit Button */}
              <button
                onClick={handleclick}
                disabled={!email || !password}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
