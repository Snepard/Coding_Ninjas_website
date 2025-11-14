"use client";

import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigationLinks } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { CTAButton } from "../ui/CTAButton";

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsScrolled(window.scrollY > 24);
    };
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-300 ease-out",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          "container-grid flex items-center justify-between gap-6 rounded-full border border-border/60 bg-background/80 px-6 py-4 backdrop-blur-xl transition-all duration-300",
          isScrolled && "shadow-soft"
        )}
      >
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src="/images/cn_logo.png"
              alt="Coding Ninjas Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            Coding Ninjas
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-10 lg:flex">
          {navigationLinks.map((link) => {
            const isAnchor = link.href.includes("#");
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace(/#.*$/, ""));
            const className = cn(
              "text-sm text-foreground/70 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive && "text-foreground"
            );

            return isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className={className}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href as Route}
                onClick={() => setIsMenuOpen(false)}
                className={className}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex">
          <CTAButton href="/careers" trackingId="header-join">
            Join Club
          </CTAButton>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-sm text-foreground transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all duration-300",
                  isMenuOpen && idx === 0 && "translate-y-2 rotate-45",
                  isMenuOpen && idx === 1 && "opacity-0",
                  isMenuOpen && idx === 2 && "-translate-y-2 -rotate-45"
                )}
              />
            ))}
          </div>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-full mt-3 px-4 lg:hidden"
          >
            <div className="container-grid flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/95 p-6 backdrop-blur-2xl">
              {navigationLinks.map((link) => {
                const isAnchor = link.href.includes("#");
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href.replace(/#.*$/, ""));

                const className = cn(
                  "text-base transition",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                );

                return isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={className}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href as Route}
                    className={className}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <CTAButton
                href="/careers"
                trackingId="mobile-join"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Club
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
