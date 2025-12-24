"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password",
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/;
    if (
      !emailRegex.test(email) &&
      email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      setError("Only @chitkara.edu.in emails are allowed.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/hiring/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
      } else {
        setSuccess("OTP sent to your email!");
        setOtpSent(true);
        setResendTimer(60); // 60 seconds cooldown
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/hiring/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
      } else {
        setSuccess("Email verified successfully!");
        setOtpVerified(true);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // For OTP method, verify OTP first
    if (loginMethod === "otp" && !otpVerified) {
      setError("Please verify your email with OTP first.");
      return;
    }

    // For password method, validate password
    if (loginMethod === "password") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    setLoading(true);

    try {
      // Determine endpoint based on email (namespaced under /api/hiring)
      const endpoint =
        email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
          ? "/api/hiring/admin-signin"
          : "/api/hiring/signin";

      // For OTP login, only send email (password not required)
      const requestBody =
        loginMethod === "otp"
          ? { email, loginWithOtp: true }
          : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Trigger a window event so Header can refetch user immediately
      window.dispatchEvent(new Event("user-signin"));

      // Wait a moment then redirect
      setTimeout(() => {
        // Redirect based on endpoint (admin now under /admin)
        if (endpoint === "/api/hiring/admin-signin") {
          router.push("/admin");
        } else {
          // Regular user: go to careers page so they can select a role first
          router.push("/hiring");
        }
      }, 300);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12 text-white">
      {/* Form Container */}
      <div
        className={`relative z-10 w-full max-w-md md:max-w-lg transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 via-orange-500/10 to-orange-500/5"></div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500/50 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500/50 rounded-br-3xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-4"></div>
              <p className="text-gray-400 text-sm mt-4">
                Please enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Login Method Toggle */}
              <div className="flex gap-2 p-1 bg-black rounded-xl border border-zinc-700">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("password");
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtp("");
                    setError("");
                    setSuccess("");
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    loginMethod === "password"
                      ? "bg-orange-500 text-black"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("otp");
                    setPassword("");
                    setError("");
                    setSuccess("");
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    loginMethod === "otp"
                      ? "bg-orange-500 text-black"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  OTP
                </button>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@chitkara.edu.in"
                    disabled={loginMethod === "otp" && otpVerified}
                    className="flex-1 p-4 rounded-xl bg-black border border-zinc-700 focus:border-orange-500 focus:outline-none text-white placeholder-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {loginMethod === "otp" && !otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading || resendTimer > 0 || otpSent}
                      className="px-6 py-4 rounded-xl font-semibold text-black bg-orange-500 hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {resendTimer > 0
                        ? `Resend (${resendTimer}s)`
                        : otpSent
                          ? "Sent"
                          : "Send OTP"}
                    </button>
                  )}
                  {loginMethod === "otp" && otpVerified && (
                    <div className="px-6 py-4 rounded-xl bg-green-500/20 border border-green-500 flex items-center gap-2">
                      <span className="text-green-500 font-semibold">
                        ✓ Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* OTP Input */}
              {loginMethod === "otp" && otpSent && !otpVerified && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">
                    Enter OTP
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="123456"
                      maxLength={6}
                      className="flex-1 p-4 rounded-xl bg-black border border-zinc-700 focus:border-orange-500 focus:outline-none text-white placeholder-gray-600 transition-all duration-300 text-center text-2xl tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.length !== 6}
                      className="px-6 py-4 rounded-xl font-semibold text-black bg-white hover:bg-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Verify
                    </button>
                  </div>
                  {resendTimer === 0 && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-sm text-orange-500 hover:text-orange-400 transition-colors text-left"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              )}

              {/* Password */}
              {loginMethod === "password" && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:border-orange-500 focus:outline-none text-white placeholder-gray-600 transition-all duration-300"
                  />
                </div>
              )}

              {/* Error & Success */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-sm font-semibold text-red-500">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                  <p className="text-sm font-semibold text-green-500">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (loginMethod === "otp" && !otpVerified)}
                className="w-full py-4 rounded-xl font-semibold text-black bg-white hover:bg-orange-500 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <a
                  href="/hiring/signup"
                  className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Sign Up
                </a>
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-600">
                Powered by{" "}
                <span className="font-bold text-orange-500">CN_CUIET</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
