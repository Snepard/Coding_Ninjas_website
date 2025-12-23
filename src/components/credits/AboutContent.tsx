"use client";

import dynamic from "next/dynamic";
import TrueFocus from "./TrueFocus";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

// Lazy load heavy components
const InfiniteMenu = dynamic(() => import("./InfiniteMenu"), {
  loading: () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-white/60">Loading contributors...</div>
    </div>
  ),
  ssr: false,
});

const ContributorModal = dynamic(() => import("./ContributorModal"), {
  ssr: false,
});

type MenuItem = {
  id?: string;
  image: string;
  link?: string;
  title?: string;
  description?: string;
  contributions?: string[];
  linkedin?: string;
  github?: string;
};

export default function AboutContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === undefined;

  // modal state (must be inside component)
  const [selectedContributor, setSelectedContributor] =
    useState<MenuItem | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  function openContributor(item: MenuItem) {
    setSelectedContributor(item);
    setIsModalOpenTrue();
  }
  function setIsModalOpenTrue() {
    setModalOpen(true);
  }
  function closeContributor() {
    setModalOpen(false);
    // optional: clear after animation
    setTimeout(() => setSelectedContributor(null), 240);
  }

  const teamMembers: MenuItem[] = [
    {
      id: "Bhavyan",
      image: "/credits/alias.png",
      link: "/credits/bhavyan",
      title: "Bhavyan",
      description: "Technical Advisor",
      contributions: ["Home Page", "Contact Page", "Join club component"],
      linkedin:
        "https://www.linkedin.com/in/bhavyan-gupta-aa7617211?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      github: "https://github.com/Vaelkrith",
    },
    {
      id: "arshia-sharma",
      image: "/credits/arshia.jpg",
      link: "/credits/arshia-sharma",
      title: "Arshia Sharma",
      description: "Technical Executive",
      contributions: ["Home Page: Meet Our Team component", "Credits Page"],
      linkedin: "https://www.linkedin.com/in/arshia-sharma-71a705336/",
      github: "https://github.com/Arshia1505",
    },
    {
      id: "aryan-singh",
      image: "/credits/aryan-singh.png",
      link: "/credits/aryan-singh",
      title: "Aryan Singh",
      description: "Technical Executive",
      contributions: ["Home Page: Ninja Game component"],
      linkedin:
        "https://www.linkedin.com/in/aryan-singh-992b6a328?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/Snepard",
    },
    {
      id: "aryan-balodi",
      image: "/credits/aryan-balodi.png",
      link: "/credits/aryan-balodi",
      title: "Aryan Balodi",
      description: "Technical Executive",
      contributions: ["Ninja Game component", "Code component"],
      linkedin:
        "https://www.linkedin.com/in/aryan-balodi-522a6334b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Aryanbalodi123",
    },
    {
      id: "rohitash",
      image: "/credits/alias.png",
      link: "/credits/rohitash",
      title: "Rohitash",
      description: "Technical Executive",
      contributions: [
        "Home page: Fundamental Pathway",
        "Events page: stack component & images",
        "Home page: Sponsors carousel",
      ],
      linkedin: "https://www.linkedin.com/in/rohitash3386",
      github: "https://github.com/Rohit12-web",
    },
    {
      id: "khushboo-jain",
      image: "/credits/khushboo.png",
      link: "/credits/khushboo-jain",
      title: "Khushboo Jain",
      description: "Technical Executive",
      contributions: ["About Us Page", "Minor Adjustments across website"],
      linkedin: "https://www.linkedin.com/in/khushboo-jain-7003a3301/",
      github: "https://github.com/KhushbooJain0618",
    },
    {
      id: "aryan-garg",
      image: "/credits/aryan-garg.png",
      link: "/credits/aryan-garg",
      title: "Aryan Garg",
      description: "Technical Executive",
      contributions: ["Events Page: Floating Ninja", "Home Page: Grow with CN"],
      linkedin:
        "https://www.linkedin.com/in/aryan18042007?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Aryangarg1804",
    },
    {
      id: "samel-dhingra",
      image: "/credits/alias.png",
      link: "/credits/aryan-garg",
      title: "Samel Dhingra",
      description: "Technical Executive",
      contributions: ["Events Page: Floating Ninja", "Home Page: Grow with CN"],
      linkedin: "https://www.linkedin.com/in/samel-dhingra-1a7a48244/",
      github: "https://github.com/samel22",
    },
  ];

  return (
    <>
      {/* Contributors header */}
      <section className="pt-12 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={isDark ? "text-white" : "text-black"}
        >
          <TrueFocus
            sentence="Contributors"
            manualMode={false}
            blurAmount={5}
            borderColor="#84cc16"
            glowColor="rgba(132,204,22,0.6)"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </motion.div>
      </section>

      {/* Team section */}
      <section className="px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto"
        >
          <p
            className={`text-3xl text-center max-w-2xl mx-auto mb-16 ${isDark ? "text-white/80" : "text-black/80"}`}
          >
            Meet the talented individuals driving innovation at
            <span className="italic text-[#f76c6c]"> Coding Ninjas</span>.
          </p>

          <InfiniteMenu items={teamMembers} onSelect={openContributor} />
        </motion.div>
      </section>

      {/* modal */}
      <ContributorModal
        open={isModalOpen}
        onClose={closeContributor}
        contributor={selectedContributor}
      />
    </>
  );
}
