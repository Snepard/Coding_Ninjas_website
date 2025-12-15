"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Lightbulb, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Opening {
  _id: string;
  title: string;
  team: string;
  role: string;
}

export default function CareersPage() {
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [interestedIds, setInterestedIds] = useState<string[]>([]);
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by calling /api/hiring/me
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/hiring/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setHasToken(!!data.user);
        } else {
          setHasToken(false);
        }
      } catch (error) {
        console.error("Failed to check auth", error);
        setHasToken(false);
      }
    };

    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/hiring/admin/careers", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) {
          const sortedOpenings = [...data.careers].sort((a, b) => {
            // First, sort by role: "Head" comes before "Executive"
            if (a.role !== b.role) {
              if (a.role === "Head" && b.role === "Executive") return -1;
              if (a.role === "Executive" && b.role === "Head") return 1;
              return 0;
            }
            // Then, sort alphabetically by title within the same role
            return a.title.localeCompare(b.title);
          });
          setOpenings(sortedOpenings);
        }
      } catch (error) {
        console.error("Failed to fetch careers", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchCareers();
  }, []);

  const handleInterested = (opening: Opening) => {
    if (interestedIds.includes(opening._id)) return;

    setInterestedIds([...interestedIds, opening._id]);
    localStorage.setItem(
      "selectedRole",
      JSON.stringify({
        title: opening.title,
        team: opening.team,
        role: opening.role,
      }),
    );

    router.push(hasToken ? "/hiring/hiring-form" : "/hiring/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- Animation Variants ---

  // This controls the shine bar moving across the card
  const shineVariants = {
    rest: { x: "-100%", opacity: 0 },
    hover: {
      x: "150%",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    // REMOVED bg-black so it uses your site's background
    <div className="min-h-screen relative overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-6 pb-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur mb-10"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm tracking-widest uppercase font-bold">
              We’re Hiring
            </span>
            <Sparkles className="w-4 h-4 text-orange-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            {["Build", "the", "future", "with", "us"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                className={`inline-block mx-2 ${
                  word === "future" ? "text-orange-500" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Join a team that values creativity, speed, and impact. Your next
            career leap starts here.
          </motion.p>
        </div>
      </section>

      {/* ================= JOB HEADING ================= */}
      <section className="relative z-10 px-6  pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500/80" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white text-center">
              Join Us
            </h1>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500/80" />
          </div>
          <p className="text-center text-gray-400 text-xl">Current Openings</p>
        </div>
      </section>

      {/* ================= JOB CARDS ================= */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {openings.map((opening, index) => (
            <motion.div
              key={opening._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-orange-500 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-orange-500/5 transition-all duration-700" />

              {/* Corner borders */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500 rounded-tl-3xl transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500 rounded-br-3xl transition-all duration-500" />

              <div className="relative z-10 flex flex-col items-center gap-4 text-center h-full">
                <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-orange-500 transition-colors duration-300 tracking-tight mt-4">
                  {opening.title}
                </h2>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400 font-medium text-sm">
                    <span className="text-gray-500">Team:</span> {opening.team}
                  </p>
                  <p className="text-gray-400 font-medium text-sm">
                    <span className="text-gray-500">Role:</span> {opening.role}
                  </p>
                </div>

                <div className="flex-grow" />

                <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-orange-500/50 transition-all duration-500" />

                <button
                  onClick={() => handleInterested(opening)}
                  disabled={interestedIds.includes(opening._id)}
                  className={`mt-4 py-3 px-6 font-semibold rounded-2xl shadow-lg transition-all duration-300 w-full ${
                    interestedIds.includes(opening._id)
                      ? "bg-emerald-500 text-black"
                      : "bg-white hover:bg-orange-500 text-black hover:shadow-orange-500/50 hover:scale-[1.02]"
                  }`}
                >
                  {interestedIds.includes(opening._id)
                    ? "Interested"
                    : "I’m Interested"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
