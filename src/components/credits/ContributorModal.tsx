"use client";

import { motion } from "framer-motion";
import React from "react";
import { Linkedin, Github } from "lucide-react";

type Contributor = {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  contributions?: string[];
  linkedin?: string; // added
  github?: string; // added
};

type Props = {
  open: boolean;
  onClose: () => void;
  contributor?: Contributor | null;
};

export default function ContributorModal({
  open,
  onClose,
  contributor,
}: Props) {
  if (!open || !contributor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contrib-title"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className="relative z-10 w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex gap-6 p-6">
          {/* profile image */}
          <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-slate-800">
            {contributor.image ? (
              <img
                src={contributor.image}
                alt={contributor.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-500">
                {contributor.title
                  ?.split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </div>

          {/* text content */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  id="contrib-title"
                  className="text-xl font-semibold text-slate-900 dark:text-white "
                >
                  {contributor.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {contributor.description}
                </p>
              </div>

              {/* <button
                onClick={onClose}
                aria-label="Close contributor card"
                className="rounded-full p-2 ml-4 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button> */}
              <button
                onClick={onClose}
                aria-label="Close contributor card"
                className="rounded-full p-2 ml-4 hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white"
              >
                ✕
              </button>
            </div>

            {/* contributions list */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Contributions
              </h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {contributor.contributions?.length ? (
                  contributor.contributions.map((c, i) => <li key={i}>{c}</li>)
                ) : (
                  <li>No contributions listed yet.</li>
                )}
              </ul>
            </div>

            {/* social icons */}
            <div className="mt-6 flex items-center gap-4">
              {contributor.linkedin && (
                <a
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-sky-700 dark:text-sky-400" />
                </a>
              )}

              {contributor.github && (
                <a
                  href={contributor.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6 text-black dark:text-white" />
                </a>
              )}

              {/* <button
                onClick={onClose}
                className="ml-auto text-sm px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700"
              >
                Close
              </button> */}
              <button
                onClick={onClose}
                className="ml-auto text-sm px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 
             text-black dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
