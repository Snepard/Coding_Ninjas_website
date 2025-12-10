"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Lightbulb, Target, Sparkles } from "lucide-react";

interface Opening {
  _id: string;
  title: string;
  role: string;
}

export default function CareersPage() {
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [interestedIds, setInterestedIds] = useState<string[]>([]);
  const [hasToken, setHasToken] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setHasToken(!!token);

    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/hiring/admin/careers", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) {
          setOpenings(data.careers);
        }
      } catch (err) {
        console.error("Failed to fetch careers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const handleInterested = (opening: Opening) => {
    if (!interestedIds.includes(opening._id)) {
      setInterestedIds([...interestedIds, opening._id]);
      localStorage.setItem(
        "selectedRole",
        JSON.stringify({
          title: opening.title,
          role: opening.role,
        }),
      );
      if (hasToken) {
        router.push("/hiring/hiring-form");
      } else {
        router.push("/hiring/signin");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-5 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <div className="inline-block mb-8">
              <div className="relative px-8 py-3 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-shimmer" />
                <span className="relative text-orange-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Join Our Team
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="block text-white mb-2">Are you ready to</span>
              <span className="block relative inline-block mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-gradient">
                  transform your
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none" />
              </span>
              <span className="block text-white mt-2">career?</span>
            </h1>
          </div>

          {/* Feature Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {[
              {
                Icon: Rocket,
                title: "Launch Your Career",
                desc: "Join a community of innovators and transform your potential into reality",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-500/5 to-red-500/5",
              },
              {
                Icon: Lightbulb,
                title: "Learn & Grow",
                desc: "Hands-on experience with industry experts and cutting-edge technologies",
                gradient: "from-orange-400 to-yellow-500",
                bgGradient: "from-orange-400/5 to-yellow-500/5",
              },
              {
                Icon: Target,
                title: "Achieve Success",
                desc: "Turn your ambitions into achievements with mentorship and support",
                gradient: "from-orange-600 to-orange-400",
                bgGradient: "from-orange-600/5 to-orange-400/5",
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${item.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                />

                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 group-hover:border-orange-500/50 rounded-3xl p-8 transition-all duration-500 overflow-hidden hover:-translate-y-3">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
                  />

                  <div
                    className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} p-[2px] group-hover:scale-110 transition-transform duration-500`}
                  >
                    <div className="w-full h-full bg-zinc-900 rounded-2xl flex items-center justify-center">
                      <item.Icon
                        className="w-7 h-7 text-orange-400"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <div
                      className={`absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl ${item.gradient} rounded-tl-full`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="relative z-10 px-6 py-20">
        <div
          className={`max-w-7xl mx-auto mb-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex items-center gap-8 mb-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500/80"></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center">
              <span className="text-white">Join Us</span>
            </h1>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500/80"></div>
          </div>
          <p className="text-center text-gray-400 text-xl mt-4">
            Current Openings
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {openings.map((opening, index) => (
            <div
              key={opening._id}
              className={`group relative bg-zinc-950 border border-zinc-800 hover:border-orange-500 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${400 + index * 50}ms` }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-orange-500/5 transition-all duration-700"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500 rounded-tl-3xl transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500 rounded-br-3xl transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col items-center gap-4 text-center h-full">
                <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-orange-500 transition-colors duration-300 tracking-tight mt-4">
                  {opening.title}
                </h2>
                <p className="text-gray-400 font-medium">{opening.role}</p>
                <div className="flex-grow"></div>
                <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-orange-500/50 transition-all duration-500"></div>
                <button
                  onClick={() => handleInterested(opening)}
                  disabled={interestedIds.includes(opening._id)}
                  className={`mt-4 py-3 px-6 font-semibold rounded-2xl shadow-lg transition-all duration-300 w-full ${interestedIds.includes(opening._id) ? "bg-emerald-500 text-black opacity-100" : "bg-white hover:bg-orange-500 text-black hover:shadow-orange-500/50 hover:scale-[1.02]"} disabled:opacity-50`}
                >
                  {interestedIds.includes(opening._id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Interested</span>
                    </span>
                  ) : (
                    "I'm Interested"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
