"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Full Name is required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/;
    if (!emailRegex.test(email)) {
      setError("Only @chitkara.edu.in emails are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/hiring/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        setSuccess("Signed up successfully!");
        setFullName("");
        setEmail("");
        setPassword("");

        // Auto-sign in the user so they don't need to manually log in.
        // This will set the auth cookie on the client via the signin API.
        try {
          const signinRes = await fetch("/api/hiring/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          if (signinRes.ok) {
            // fetch user info and persist for UI
            try {
              const meRes = await fetch("/api/hiring/me", {
                credentials: "include",
              });
              const meData = await meRes.json();
              if (meRes.ok && meData.user) {
                localStorage.setItem("cn_user", JSON.stringify(meData.user));
              }
            } catch (e) {
              console.warn("Could not fetch user after signup signin", e);
            }

            // then navigate to hiring
            router.push("/hiring");
            return;
          }
        } catch (e) {
          console.warn("Auto-signin failed after signup", e);
        }

        // Fallback: navigate to signin page if auto-signin failed
        setTimeout(() => {
          router.push("/signin");
        }, 600);
      }
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
                Create Your Account
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-4"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:border-orange-500 focus:outline-none text-white placeholder-gray-600 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@chitkara.edu.in"
                  className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:border-orange-500 focus:outline-none text-white placeholder-gray-600 transition-all duration-300"
                />
              </div>

              {/* Password */}
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
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-black bg-white hover:bg-orange-500 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Sign In
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
