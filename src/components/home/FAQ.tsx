"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

const faqs = [
  {
    question: "How do I join Coding Ninjas Chitkara?",
    answer:
      "You can join by filling out the application form on our Join Club page. We welcome students from all disciplines who are passionate about technology, design, and innovation. Our selection process focuses on your enthusiasm and commitment to learning.",
  },
  {
    question: "What are the different pods available?",
    answer:
      "We have four main pods: AI Studio (ML and AI research), Product Engineering (Full-stack development), Immersive Media (WebXR and creative coding), and Robotics & IoT (Hardware and automation). Each pod has dedicated mentors and weekly sessions.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No prior experience is required! We welcome beginners and experienced developers alike. Our community is built on learning together, and we provide mentorship, resources, and hands-on projects to help you grow regardless of your starting point.",
  },
  {
    question: "What kind of events do you organize?",
    answer:
      "We organize hackathons, technical workshops, speaker sessions with industry experts, coding competitions, and community meetups. Our events range from beginner-friendly workshops to advanced technical deep-dives.",
  },
  {
    question: "How can I contribute to the club?",
    answer:
      "You can contribute by participating in projects, mentoring other members, organizing events, creating content, or leading initiatives. We encourage active participation and provide opportunities for leadership roles within the club.",
  },
  {
    question: "Are there any membership fees?",
    answer:
      "No, membership is completely free! We believe in making quality tech education and community access available to everyone. All our resources, events, and mentorship are provided at no cost to members.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container-grid space-y-12 py-16">
      <motion.div
        variants={childFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about joining, participating, and contributing to Coding Ninjas Chitkara."
          align="center"
        />
      </motion.div>

      <motion.div
        variants={staggerChildren(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-0"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={childFade}
            className="border-b border-border/60 last:border-b-0"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-6 text-left flex items-center justify-between gap-4 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-2 -mx-2"
            >
              <h3 className="text-lg font-heading text-foreground pr-8">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-foreground/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm text-foreground/70 leading-relaxed px-2">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
