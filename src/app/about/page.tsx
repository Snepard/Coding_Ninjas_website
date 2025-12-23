"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Instagram,
  X,
  Zap,
  Rocket,
  UsersRound,
  ShieldCheck,
  Atom,
  Terminal,
  Target,
  BookOpen,
  Puzzle,
  Brain,
  GitBranch,
  Workflow,
  BrainCircuit,
  Network,
  Key,
  Shield,
  Eye,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { achievements } from "@/data/club";

const achievementIcons = [Rocket, UsersRound, ShieldCheck, Atom];

// Type definitions
interface Director {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  insta?: string;
  bio: string;
  year?: string;
  branch?: string;
  [key: string]: unknown;
}

interface Leader {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  insta?: string;
  bio: string;
  year?: string;
  branch?: string;
  [key: string]: unknown;
}

interface Pillar {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  insta?: string;
  bio: string;
  year?: string;
  branch?: string;
  [key: string]: unknown;
}

// Specialized tech elements for first pillar and leader
const specialTechElements = [
  {
    icon: <BrainCircuit className="w-7 h-7 text-orange-400" />,
    text: "Visionary Architecture",
    color: "from-purple-500/20 to-orange-500/20",
    stats: "15+ Years Experience",
    gradient: "bg-gradient-to-r from-purple-600/40 to-orange-600/40",
    description: "Strategic technical roadmap development & mentorship",
    borderColor: "border-purple-500",
    level: "Master",
    levelColor: "text-purple-300",
  },
  {
    icon: <Network className="w-7 h-7 text-orange-400" />,
    text: "Ecosystem Development",
    color: "from-blue-500/20 to-orange-500/20",
    stats: "50+ Industry Links",
    gradient: "bg-gradient-to-r from-blue-600/40 to-orange-600/40",
    description: "Academic-industry collaboration & bridge building",
    borderColor: "border-blue-500",
    level: "Expert",
    levelColor: "text-blue-300",
  },
  {
    icon: <Workflow className="w-7 h-7 text-orange-400" />,
    text: "Innovation Catalyst",
    color: "from-green-500/20 to-orange-500/20",
    stats: "100+ Projects",
    gradient: "bg-gradient-to-r from-green-600/40 to-orange-600/40",
    description: "Research to implementation pipeline management",
    borderColor: "border-green-500",
    level: "Master",
    levelColor: "text-green-300",
  },
  {
    icon: <GitBranch className="w-7 h-7 text-orange-400" />,
    text: "Tech Evangelism",
    color: "from-cyan-500/20 to-orange-500/20",
    stats: "500+ Students",
    gradient: "bg-gradient-to-r from-cyan-600/40 to-orange-600/40",
    description: "Community growth & knowledge transfer",
    borderColor: "border-cyan-500",
    level: "Expert",
    levelColor: "text-cyan-300",
  },
];

export default function AboutUsPage() {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(
    null,
  );
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Mouse position tracked but not used in current version
      void e;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation for popups
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDirector(null);
        setSelectedLeader(null);
        setSelectedPillar(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (selectedDirector || selectedLeader || selectedPillar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedDirector, selectedLeader, selectedPillar]);

  // Split leaders into rows based on screen size
  const leaderRows = [
    leadershipTeam.slice(0, 1),
    leadershipTeam.slice(1, 3),
    leadershipTeam.slice(3, 6),
  ];

  return (
    <main
      className="min-h-screen text-white font-sans overflow-x-hidden relative"
      ref={containerRef}
    >
      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-full backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300 tracking-wider">
                CUIET OFFICIAL CLUB
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 leading-tight">
              <span className="block text-white">CODING</span>
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-2"
              >
                NINJAS
              </motion.span>
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent w-full max-w-2xl mx-auto my-6 md:my-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
            >
              Where{" "}
              <span className="text-orange-400 font-semibold">innovation</span>{" "}
              meets excellence, crafting the future through{" "}
              <span className="text-orange-400 font-semibold">code </span>
              and strategic execution
            </motion.p>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {achievements.map((item, index) => {
                const Icon = achievementIcons[index];
                return (
                  <motion.div
                    key={item.metric}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                      <CountUp
                        end={item.value}
                        duration={2.5}
                        suffix={item.suffix}
                        enableScrollSpy
                      />
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                      {item.metric}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sensei Section with Tech Elements for First Pillar */}
      <section
        id="pillars"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Zap className="w-5 h-5 md:w-6 md:h-6" />}
            title="The Sensei"
            subtitle="Visionary leaders who shape our path to technological excellence and innovation"
            badge="ARCHITECTS OF VISION"
          />

          {/* Pillars Grid - Responsive layout */}
          <div className="space-y-8 md:space-y-12 relative">
            {/* First pillar with side tech elements */}
            <div className="relative">
              {/* Left Tech Elements */}
              <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 space-y-6 w-60">
                {specialTechElements.slice(0, 2).map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.7 }}
                    className="relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-xl border-l-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10"
                  >
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg">
                        {element.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          {element.text}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-orange-500/20 rounded-full text-orange-300">
                            {element.level}
                          </span>
                          <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`w-4/5 h-full ${element.gradient} rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      {element.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
                        {element.stats}
                      </span>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-gray-400">Active</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* First Pillar Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg relative">
                  <MemoizedMemberCard
                    member={pillars[0]}
                    onClick={() => setSelectedPillar(pillars[0])}
                  />
                </div>
              </motion.div>

              {/* Right Tech Elements */}
              <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 space-y-6 w-60">
                {specialTechElements.slice(2, 4).map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.7 }}
                    className="relative bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-xl border-r-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10 text-right"
                  >
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                    <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                      <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg">
                        {element.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          {element.text}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 flex-row-reverse">
                          <span className="text-xs px-2 py-0.5 bg-orange-500/20 rounded-full text-orange-300">
                            {element.level}
                          </span>
                          <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`w-4/5 h-full ${element.gradient} rounded-full ml-auto`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      {element.description}
                    </p>
                    <div className="flex items-center justify-between flex-row-reverse">
                      <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
                        {element.stats}
                      </span>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-gray-400">Active</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second row - two pillars */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
            >
              {pillars.slice(1).map((member, idx) => (
                <MemoizedMemberCard
                  key={member.name}
                  member={member}
                  onClick={() => setSelectedPillar(member)}
                  delay={idx * 0.1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="leadership"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Terminal className="w-5 h-5 md:w-6 md:h-6" />}
            title="Shinobi Leaders"
            subtitle="The brilliant minds driving innovation, strategy, and operational excellence"
            badge="STRATEGIC COMMAND"
          />

          {/* Responsive Leadership Grid */}
          <div className="space-y-8 md:space-y-12 relative">
            {/* First leader row with enhanced tech elements */}
            <div className="relative">
              {/* Left Tech Elements for First Leader - Enhanced */}
              {/* Left Tech Elements */}
              <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 space-y-6 w-56">
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border-l-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10"
                >
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Key className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Strategic Vision
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
                        <span className="text-xs text-orange-300 font-semibold">
                          Level 9
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Driving long-term innovation through advanced strategic
                    planning and roadmap development
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-9/12 h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-orange-400">
                      90%
                    </span>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border-l-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10"
                >
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Operational Mastery
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
                        <span className="text-xs text-orange-300 font-semibold">
                          Level 10
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Ensuring seamless execution across all initiatives with
                    precision and efficiency
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-11/12 h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-orange-400">
                      95%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Center Leader Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 max-w-sm sm:max-w-md md:max-w-lg mx-auto relative"
              >
                <MemoizedMemberCard
                  member={leadershipTeam[0]}
                  onClick={() => setSelectedLeader(leadershipTeam[0])}
                />
              </motion.div>

              {/* Right Tech Elements */}
              <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 space-y-6 w-56">
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border-r-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10 text-right"
                >
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                  <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Brain className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Innovation Catalyst
                      </h4>
                      <div className="flex items-center gap-1 mt-1 flex-row-reverse">
                        <div className="w-16 h-1 bg-gradient-to-l from-orange-500 to-orange-300 rounded-full" />
                        <span className="text-xs text-orange-300 font-semibold">
                          Level 8
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Fostering creative problem-solving and disruptive innovation
                    approaches
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-row-reverse">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-10/12 h-full bg-gradient-to-l from-orange-500 to-orange-300 rounded-full ml-auto" />
                    </div>
                    <span className="text-xs font-semibold text-orange-400">
                      85%
                    </span>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border-r-4 border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/10 text-right"
                >
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" />
                  <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Eye className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Future Focus
                      </h4>
                      <div className="flex items-center gap-1 mt-1 flex-row-reverse">
                        <div className="w-20 h-1 bg-gradient-to-l from-orange-500 to-orange-300 rounded-full" />
                        <span className="text-xs text-orange-300 font-semibold">
                          Level 9
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Anticipating tech trends and creating strategic
                    opportunities for growth
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-row-reverse">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-9/12 h-full bg-gradient-to-l from-orange-500 to-orange-300 rounded-full ml-auto" />
                    </div>
                    <span className="text-xs font-semibold text-orange-400">
                      88%
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Rest of leaders */}
            {leaderRows.slice(1).map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
                className={`grid gap-6 md:gap-8 ${
                  row.length === 1
                    ? "grid-cols-1 max-w-sm sm:max-w-md md:max-w-lg mx-auto"
                    : row.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                }`}
              >
                {row.map((member, idx) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    onClick={() => setSelectedLeader(member)}
                    delay={rowIndex * 0.2 + idx * 0.1}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Operatives Section - Updated grid spacing */}
      <section
        id="directors"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Target className="w-5 h-5 md:w-6 md:h-6" />}
            title="Field Operatives"
            subtitle="The operational backbone ensuring seamless execution across all initiatives"
            badge="OPERATIONAL NEXUS"
          />

          {/* Updated grid with increased gap */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {directors.map((director, index) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex justify-center"
              >
                <MemoizedDirectorCard
                  director={director}
                  onClick={() => setSelectedDirector(director)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="The Code"
            subtitle="Our guiding principles that define the Ninja way of coding"
          />

          <NinjaPhilosophyGrid />
        </div>
      </section>

      {/* Popups with Flip Effect */}
      <AnimatePresence>
        {selectedDirector && (
          <FlipCardPopup
            member={selectedDirector}
            onClose={() => setSelectedDirector(null)}
          />
        )}
        {selectedLeader && (
          <FlipCardPopup
            member={selectedLeader}
            onClose={() => setSelectedLeader(null)}
          />
        )}
        {selectedPillar && (
          <FlipCardPopup
            member={selectedPillar}
            onClose={() => setSelectedPillar(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function FlipCardPopup({
  member,
  onClose,
}: {
  member: Director | Leader | Pillar;
  onClose: () => void;
}) {
  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      style={{ overscrollBehavior: "contain" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          perspective: "1000px",
          maxHeight: "90vh",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 transition-colors"
          aria-label="Close profile"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Flip Card Container */}
        <div
          className="relative transition-transform duration-700 [transform-style:preserve-3d] w-full"
          style={{
            minHeight: "auto",
            maxHeight: "none",
          }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col [backface-visibility:hidden]"
            style={{ WebkitBackfaceVisibility: "hidden", position: "relative" }}
          >
            {/* Header with Flip Button */}
            <div className="relative p-4 sm:p-6 md:p-8 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-orange-500/50 relative flex-shrink-0">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mt-2">
                      <span className="text-xs sm:text-sm font-semibold text-orange-300 uppercase tracking-wide truncate">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Improved scroll for mobile */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
              <div
                className="space-y-4"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-3">
                  {member.year && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Academic Year</p>
                      <p className="text-white font-medium truncate">
                        {member.year}
                      </p>
                    </div>
                  )}
                  {member.branch && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Branch</p>
                      <p className="text-white font-medium truncate">
                        {member.branch}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">
                    Profile Overview
                  </h4>
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Social Links */}
            <div className="p-4 sm:p-6 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3">
                {member.linkedin && member.linkedin !== "#" && (
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-white font-semibold"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="truncate">LinkedIn</span>
                  </motion.a>
                )}
                {member.insta && member.insta !== "#" && (
                  <motion.a
                    href={member.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors text-white font-semibold"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="truncate">Instagram</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>

          {/* BACK SIDE - REMOVED */}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ... rest of the components (SectionHeader, MemberCard, DirectorCard, NinjaPhilosophyGrid) remain exactly the same ...

function SectionHeader({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      {badge && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-orange-500/50 rounded-full backdrop-blur-sm"
        >
          {icon}
          <span className="text-sm font-bold text-orange-400 tracking-wider">
            {badge}
          </span>
        </motion.div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function MemberCard({
  member,
  onClick,
  delay = 0,
}: {
  member: Director | Leader | Pillar;
  onClick: () => void;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer h-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-lg group-hover:shadow-orange-500/10">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={member.img}
            alt={member.name}
            fill
            priority={false}
            quality={75}
            loading="lazy"
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">
            {member.name}
          </h3>
          <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3">
            <span className="text-xs sm:text-sm font-semibold text-orange-300 uppercase tracking-wide">
              {member.role}
            </span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base line-clamp-3">
            {member.bio}
          </p>

          {/* Social Links */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
            {member.linkedin && member.linkedin !== "#" && (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray rounded-lg transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect</span>
              </motion.a>
            )}
            {member.insta && member.insta !== "#" && (
              <motion.a
                href={member.insta}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MemoizedMemberCard = memo(MemberCard);

function DirectorCard({
  director,
  onClick,
}: {
  director: Director;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer w-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-lg group-hover:shadow-orange-500/10 h-full">
        {/* Image */}
        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
          <Image
            src={director.img}
            alt={director.name}
            fill
            priority={false}
            quality={75}
            loading="lazy"
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-300 transition-colors">
            {director.name}
          </h3>
          <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mb-3 group-hover:bg-orange-500/30 transition-colors">
            <p className="text-xs sm:text-sm font-semibold text-orange-300 uppercase tracking-wide">
              {director.role}
            </p>
          </div>
          <p className="text-gray-300 text-sm sm:text-base line-clamp-3 leading-relaxed group-hover:text-gray-200 transition-colors">
            {director.bio}
          </p>

          {/* Social Links (Optional - add if directors have social links) */}
          {(director.linkedin || director.insta) && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
              {director.linkedin && director.linkedin !== "#" && (
                <motion.a
                  href={director.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs sm:text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>LinkedIn</span>
                </motion.a>
              )}
              {director.insta && director.insta !== "#" && (
                <motion.a
                  href={director.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors text-xs sm:text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Instagram</span>
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const MemoizedDirectorCard = memo(DirectorCard);

/* NINJA PHILOSOPHY GRID COMPONENT */
function NinjaPhilosophyGrid() {
  const philosophies = [
    {
      title: "ASPIRE",
      description:
        "Aim for excellence in every line of code. Dream big, code bigger.",
      Icon: Target,
    },
    {
      title: "LEARN",
      description:
        "Continuous growth through challenges. Every bug is a lesson.",
      Icon: BookOpen,
    },
    {
      title: "SOLVE",
      description:
        "Transform complex problems into elegant solutions with precision.",
      Icon: Puzzle,
    },
    {
      title: "INNOVATE",
      description:
        "Push boundaries and create what doesn't exist. Be the future.",
      Icon: Rocket,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-4">
      {philosophies.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className="group"
          style={{ perspective: "1000px" }}
        >
          {/* INNER CARD */}
          <div
            className="
              relative h-48 sm:h-56 md:h-64 w-full transition-all duration-700 
              [transform-style:preserve-3d]
              group-hover:[transform:rotateY(180deg)]
            "
          >
            {/* FRONT SIDE */}
            <div
              className="
                absolute inset-0 
                rounded-2xl sm:rounded-3xl 
                backdrop-blur-xl 
                border border-orange-500/10 
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                flex flex-col items-center justify-center text-center 
                p-4 sm:p-5 md:p-6
              "
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              {/* Icon Wrapper */}
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl
                  bg-gradient-to-br from-orange-500/20 to-orange-600/10
                  border border-orange-400/20
                  shadow-[0_0_20px_rgba(255,120,0,0.15)]
                  mb-3 sm:mb-4
                "
              >
                <item.Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-400 drop-shadow-[0_2px_8px_rgba(255,120,0,0.35)]" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-orange-300">
                {item.title}
              </h3>

              {/* Divider */}
              <div className="w-10 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent my-2 sm:my-3"></div>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#FF6C0C]/30 via-black to-[#FF6C0C]/10 
              border-2 border-[#FF6C0C]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-center flex items-center justify-center 
              shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Data arrays remain the same...
const pillars = [
  {
    name: "Dr. Rishu Chhabra",
    role: "University Level Designated Officer",
    img: "/team/RISHU.jpg",
    linkedin: "https://www.linkedin.com/in/rishuchhabra/",
    bio: "As the University Level Designated Officer, Dr. Rishu Chhabra provides strategic leadership and academic oversight for all technical initiatives. With over 15 years of experience in computer science education, she mentors students in cutting-edge technologies while fostering industry-academia collaborations. Her visionary approach integrates practical learning with theoretical foundations, creating an ecosystem where innovation thrives. Dr. Chhabra's dedication to excellence has transformed the coding culture across campus, making technology education accessible and impactful for every student.",
  },
  {
    name: "Dr. Chetna Sharma",
    role: "Lead, Coding Ninjas CUIET",
    img: "/team/CHETNA.jpg",
    linkedin: "https://www.linkedin.com/in/dr-chetna-sharma-12579467/",
    bio: "Dr. Chetna Sharma leads Coding Ninjas CUIET with unparalleled passion and commitment to technological advancement. Her innovative teaching methodologies and student-centric approach have revolutionized how coding education is delivered. With expertise in multiple programming paradigms and software development practices, she guides students through complex technical challenges while nurturing their creative potential. Dr. Sharma's leadership has established a vibrant community where students transform into skilled developers, ready to tackle real-world problems with confidence and technical excellence.",
  },
  {
    name: "Dr. Gagandeep Kaur",
    role: "Associate Lead, Coding Ninjas CUIET",
    img: "/team/GAGANDEEP.jpg",
    linkedin: "https://www.linkedin.com/in/dr-gagandeep-kaur-09284526a/",
    bio: "Ms. Gagandeep Kaur serves as the Associate Lead, bringing dynamic operational management and strategic execution to Coding Ninjas CUIET. Her exceptional organizational skills and student engagement strategies ensure seamless coordination of all technical events and workshops. With a focus on practical skill development, she designs learning pathways that bridge academic knowledge with industry requirements. Ms. Kaur's innovative approaches to technical education have significantly enhanced student participation and learning outcomes across all programming domains and technology stacks.",
  },
];

const leadershipTeam = [
  {
    name: "Ansh Chahal",
    role: "Chairman",
    img: "/team/ANSH.jpeg",
    linkedin: "https://www.linkedin.com/in/anshchahal/",
    insta: "https://www.instagram.com/anshchahall/",
    bio: "As Chairman, Ansh Chahal provides visionary leadership and strategic direction for Coding Ninjas CUIET. His exceptional management skills and innovative thinking have been instrumental in scaling the club's operations and impact across campus. With a deep understanding of technology trends and student needs, he fosters an environment of collaboration and continuous learning. Ansh's ability to identify talent and nurture leadership qualities has built a strong foundation for sustainable growth, making the club a premier destination for aspiring developers and tech enthusiasts.",
  },
  {
    name: "Aditya Pathania",
    role: "Chief Executive Officer",
    img: "/team/ADITYA.jpeg",
    linkedin: "https://www.linkedin.com/in/aditya-pathania2194/",
    insta: "https://www.instagram.com/aditya._.pathania/",
    bio: "Aditya Pathania, as Chief Executive Officer, drives the operational excellence and strategic vision of Coding Ninjas CUIET. His exceptional leadership ensures seamless execution of all technical initiatives and learning programs. With a keen eye for innovation and process optimization, he has implemented efficient workflows that enhance member experience and learning outcomes. Aditya's commitment to technological advancement and community building has positioned the club as a hub for cutting-edge development practices and collaborative problem-solving among students.",
  },
  {
    name: "Anishka",
    role: "Operations and HR Director",
    img: "/team/ANISHKA.jpeg",
    linkedin: "https://www.linkedin.com/in/anishka-3b94022a3/",
    insta: "https://www.instagram.com/_anishkachhabra_/",
    bio: "Anishka, as Operations and HR Director, cultivates a thriving organizational culture while ensuring operational efficiency across all departments. Her innovative HR practices and talent management strategies have built a cohesive team of passionate developers and tech enthusiasts. With exceptional interpersonal skills and systematic approach to workflow optimization, she creates an inclusive environment where every member can grow and contribute effectively. Anishka's dedication to team development and process improvement has been crucial in maintaining the club's dynamic and productive atmosphere.",
  },
  {
    name: "Astha",
    role: "Chief Operating Officer",
    img: "/team/ASTHA.jpeg",
    linkedin: "https://www.linkedin.com/in/astha-balda-40735b291/",
    insta: "https://www.instagram.com/asthabalda/",
    bio: "Astha, serving as Chief Operating Officer, orchestrates the seamless execution of all technical operations and strategic initiatives. Her exceptional organizational skills and attention to detail ensure that every workshop, hackathon, and learning session runs with precision and impact. With a talent for resource management and process optimization, she has streamlined club operations while maintaining the highest quality standards. Astha's ability to coordinate multiple projects simultaneously while fostering team collaboration has been instrumental in the club's consistent delivery of exceptional technical education.",
  },
  {
    name: "Monal",
    role: "Chief Marketing Officer",
    img: "/team/MONAL.jpeg",
    linkedin: "https://www.linkedin.com/in/monal-sehrawat-021517342/",
    insta: "https://www.instagram.com/monaal.x/",
    bio: "Monal, as Chief Marketing Officer, crafts compelling narratives and strategic communication that amplify Coding Ninjas CUIET's presence across digital platforms. Her innovative marketing campaigns and brand development strategies have significantly increased club visibility and member engagement. With expertise in digital marketing trends and audience analytics, she creates targeted content that resonates with the tech community. Monal's creative approach to brand storytelling and community outreach has established the club as a prominent voice in the campus technology ecosystem.",
  },
  {
    name: "Jagjot",
    role: "Visual Media Lead",
    img: "/team/JAGJOT.jpeg",
    linkedin: "https://www.linkedin.com/in/jagjotsinghhh/",
    insta: "https://www.instagram.com/jagjotsinghhh/",
    bio: "Jagjot, as Visual Media Lead, transforms technical concepts into stunning visual experiences that define Coding Ninjas CUIET's creative identity. His exceptional design skills and artistic vision create compelling visual narratives that communicate complex technical ideas with clarity and impact. With expertise in graphic design, video production, and digital media, he develops engaging content that captures the club's innovative spirit. Jagjot's creative direction has established a distinctive visual language that resonates with the tech community while maintaining professional excellence.",
  },
];

const directors = [
  {
    name: "Archita",
    role: "HR Manager",
    img: "/team/ARCHITA.jpeg",
    linkedin: "https://www.linkedin.com/in/archita-sethi-60357227b/",
    insta: "https://www.instagram.com/architasethi24/",
    bio: "As HR Manager, Archita oversees talent management and organizational development, ensuring smooth team coordination and member engagement through effective human resource strategies and interpersonal communication.",
  },
  {
    name: "Jaskirat",
    role: "Secretary",
    img: "/team/JASKIRAT.jpeg",
    linkedin: "https://www.linkedin.com/in/jaskiratkaur68/",
    insta: "https://www.instagram.com/kiratttkaurrr/",
    bio: "Jaskirat serves as Secretary, maintaining organizational records and facilitating inter-departmental communication while ensuring efficient documentation and administrative support for all club activities and initiatives.",
  },
  {
    name: "Manya",
    role: "Joint Secretary",
    img: "/team/MANYA.jpeg",
    linkedin: "https://www.linkedin.com/in/manya-35a05b298/",
    insta: "https://www.instagram.com/_.manya._0/",
    bio: "Manya, as Joint Secretary, supports secretarial functions and coordinates departmental activities while assisting in maintaining organizational efficiency and smooth operational workflow across all teams.",
  },
  {
    name: "Mohit",
    role: "Community Coordinator",
    img: "/team/MOHIT.jpeg",
    linkedin: "https://www.linkedin.com/in/mohit-chaudhary-a66555320/",
    insta: "https://www.instagram.com/belike_mohit/",
    bio: "Mohit builds and nurtures the coding community as Community Coordinator, fostering engagement and collaboration among members while organizing interactive sessions and networking opportunities.",
  },
  {
    name: "Akshat Anand",
    role: "Events Director",
    img: "/team/AKSHAT.jpeg",
    linkedin: "https://www.linkedin.com/in/akshat-anand-bb1038309",
    insta: "https://www.instagram.com/akshat.anand__/",
    bio: "Akshat Anand plans and executes technical events as Events Director, coordinating hackathons and workshops while ensuring seamless organization and participant engagement in all activities.",
  },
  {
    name: "Himani Batra",
    role: "Events Director",
    img: "/team/HIMANI.jpeg",
    linkedin: "https://www.linkedin.com/in/himani-batra",
    insta: "https://www.instagram.com/himani_batra06/",
    bio: "Himani Batra manages event coordination and participant experience as Events Director, creating engaging technical competitions and learning sessions that foster skill development.",
  },
  {
    name: "Bhavyan",
    role: "Technical Advisor",
    img: "/team/BHAVYAN.jpeg",
    linkedin: "https://www.linkedin.com/in/bhavyan-gupta-aa7617211/",
    insta: "https://www.instagram.com/bhavyan_1499/",
    bio: "Bhavyan provides technical guidance and mentorship as Technical Advisor, offering expertise in programming concepts and development practices to enhance member learning outcomes.",
  },
  {
    name: "Ashita",
    role: "Outreach Director",
    img: "/team/ASHITA.jpeg",
    linkedin: "https://www.linkedin.com/in/ashita-arora-8235a0343/",
    insta: "https://www.instagram.com/arora_ash1/",
    bio: "Ashita leads outreach initiatives as Outreach Director, building partnerships with external organizations and expanding the club's network within the broader tech community.",
  },
  {
    name: "Harshil Mahajan",
    role: "Outreach Director",
    img: "/team/HARSHILM.jpeg",
    linkedin: "https://www.linkedin.com/in/harshil-mahajan-3880ab324/",
    insta: "https://www.instagram.com/mahajan_harshil/",
    bio: "Harshil Mahajan develops strategic partnerships as Outreach Director, establishing valuable connections with industry professionals and tech companies for collaborative opportunities.",
  },
  {
    name: "Ankit",
    role: "Outreach Director",
    img: "/team/ANKIT.jpeg",
    linkedin: "https://www.linkedin.com/in/ankit-rana-344814350/",
    insta: "https://www.instagram.com/ankitrana_82/",
    bio: "Ankit expands community engagement as Outreach Director, coordinating with external stakeholders and organizing collaborative events that bridge academia and industry.",
  },
  {
    name: "Roshnee Loona",
    role: "Content Director",
    img: "/team/ROSHNEE.jpeg",
    linkedin: "https://www.linkedin.com/in/roshnee-loona-3b167a324/",
    insta: "https://www.instagram.com/roshnee_loona/",
    bio: "Roshnee Loona oversees content creation as Content Director, developing educational materials and technical documentation that support member learning and skill development.",
  },
  {
    name: "Sarthak Dey",
    role: "Documentation Director",
    img: "/team/SARTHAK.jpeg",
    linkedin: "https://www.linkedin.com/in/sharthak-dey-519137339/",
    insta: "https://www.instagram.com/__shubro_/",
    bio: "Sarthak Dey manages organizational documentation as Documentation Director, maintaining records and creating comprehensive reports that track club activities and achievements.",
  },
  {
    name: "Abhinav",
    role: "Media Director",
    img: "/team/ABHINAV.jpeg",
    linkedin: "http://linkedin.com/in/abhinav-4b730a31a",
    insta: "https://www.instagram.com/theabhinxv/",
    bio: "Abhinav coordinates media production as Media Director, overseeing content creation and distribution across various platforms to enhance club visibility and engagement.",
  },
  {
    name: "Sehaj",
    role: "Media Director",
    img: "/team/SEHAJ.jpeg",
    linkedin: "https://www.linkedin.com/in/sehaj-kapoor-752aa9331/",
    insta: "https://www.instagram.com/sehajkapoor_2006/",
    bio: "Sehaj manages digital media operations as Media Director, creating engaging content and maintaining consistent brand presence across all communication channels.",
  },
  {
    name: "Apran",
    role: "Social Media Director",
    img: "/team/APRAN.jpeg",
    linkedin: "https://www.linkedin.com/in/apran-khunger-6a5234325/",
    insta: "https://www.instagram.com/apran_khunger/",
    bio: "Apran leads social media strategy as Social Media Director, developing engaging content and managing online presence to build community interaction and awareness.",
  },
  {
    name: "Sukhpreet Singh",
    role: "Graphics Director",
    img: "/team/SUKHPREET.jpeg",
    linkedin: "https://www.linkedin.com/in/sukhpreet-singh-3270a2308/",
    insta: "https://www.instagram.com/singh_sukhpreet1313/",
    bio: "Sukhpreet Singh creates visual assets as Graphics Director, designing compelling graphics and visual content that enhance club branding and communication materials.",
  },
  {
    name: "Kashak",
    role: "Logistics Director",
    img: "/team/KASHAK.jpeg",
    linkedin: "https://www.linkedin.com/in/kashak-thakur/",
    insta: "https://www.instagram.com/kashak.thakur_17/",
    bio: "Kashak manages operational logistics as Logistics Director, coordinating resources and facilities to ensure smooth execution of all club events and activities.",
  },
  {
    name: "Harshit",
    role: "Marketing Director",
    img: "/team/HARSHIT.jpeg",
    linkedin:
      "https://www.linkedin.com/in/harshit-batra-0135b22b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    insta:
      "https://www.instagram.com/_harshit.batra28?igsh=MWtwc3lvbzgyZThwcQ%3D%3D&utm_source=qr",
    bio: "Harshit develops marketing strategies as Marketing Director, creating campaigns that promote club initiatives and attract participation from the student community.",
  },
];
