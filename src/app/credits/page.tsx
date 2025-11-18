"use client";

import React, { useState } from "react";
import { Github, Linkedin, Sparkles } from "lucide-react";

export default function CreditsPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const contributors = [
    {
      name: "Bhavyan",
      items: ["Home Page", "Contact Page", "Join club component"],
      github: "https://github.com/Vaelkrith",
      linkedin: "https://www.linkedin.com/in/bhavyan-gupta-aa7617211",
    },
    {
      name: "Rohitash",
      items: [
        "Home page: Fundamental Pathway",
        "Events page: stack component & images",
        "Home page: Sponsors carousel",
      ],
      github: "https://github.com/Rohit12-web",
      linkedin: "https://www.linkedin.com/in/rohitash3386",
    },
    {
      name: "Khushboo Jain",
      items: [
        "About Us page",
        "Credits page",
        "Minor adjustments across the website",
      ],
      github: "https://github.com/KhushbooJain0618",
      linkedin: "https://www.linkedin.com/in/khushboo-jain-7003a3301/",
    },
    {
      name: "Aryan Garg",
      items: ["Events Page: Floating Ninja", "Home Page: Grow with CN"],
      github: "https://github.com/Aryangarg1804",
      linkedin: "https://www.linkedin.com/in/aryan18042007",
    },
    {
      name: "Arshia Sharma",
      items: ["Home Page: Meet Our Team component", "Credits page"],
      github: "https://github.com/arshia-sharma",
      linkedin: "https://linkedin.com/in/arshia-sharma",
    },
    {
      name: "Samel Dhingra",
      items: ["Events Page: Floating Ninja", "Home Page: Grow with CN"],
      github: "https://github.com/samel22",
      linkedin: "https://www.linkedin.com/in/samel-dhingra-1a7a48244/",
    },
    {
      name: "Aryan Singh",
      items: ["Home Page: Ninja Game component"],
      github: "https://github.com/Snepard",
      linkedin: "https://www.linkedin.com/in/aryan-singh-992b6a328",
    },
    {
      name: "Aryan Balodi",
      items: ["Home Page: Ninja Game component", "The Code component"],
      github: "https://github.com/Aryanbalodi123",
      linkedin: "https://www.linkedin.com/in/aryan-balodi-522a6334b",
    },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm text-orange-500 font-semibold tracking-wide">Meet the Team</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-pulse">
              Credits
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Exceptional individuals who brought the Coding Ninjas Club website to life
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <div
              key={contributor.name}
            //   onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-orange-600/30 to-orange-500/30 rounded-2xl blur-xl transition-all duration-500 ${
                  hoveredCard === index ? "opacity-100 scale-105" : "opacity-0 scale-95"
                }`}
              ></div>

              <div className="relative h-full bg-gradient-to-br from-zinc-900 to-black border border-orange-500/20 rounded-2xl p-7 transition-all duration-500 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col">
                {/* <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-orange-500/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300 truncate">
                      {contributor.name}
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-transparent mt-3 rounded-full group-hover:w-24 transition-all duration-500"></div>
                  </div>

                  <div className="flex gap-2.5 flex-shrink-0 ml-3">
                    {contributor.github && (
                      <a
                        href={contributor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300 group/icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5 text-orange-500 group-hover/icon:text-black transition-colors" />
                      </a>
                    )}
                    {contributor.linkedin && (
                      <a
                        href={contributor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300 group/icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-5 h-5 text-orange-500 group-hover/icon:text-black transition-colors" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-3 flex-grow">
                  {contributor.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-6 right-6 text-7xl font-black text-orange-500/5 group-hover:text-orange-500/10 transition-all duration-500 select-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24 pt-12 border-t border-orange-500/20">
          <p className="text-gray-400 text-base font-medium">
            Built with passion by the Coding Ninjas Club team
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-orange-500/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-orange-500/50"></div>
          </div>
        </div>
      </div>
 </div>
  );
}
