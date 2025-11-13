import type { Route } from "next";
import Link from "next/link";
import { navigationLinks, siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "Join the Club", href: "/#join" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const Footer = () => (
  <footer className="mt-24 border-t border-border/60 bg-background/80">
    <div className="container-grid grid gap-10 py-16 md:grid-cols-[1.3fr,1fr] md:py-20">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-foreground/60">
            Coding Ninjas
          </span>
        </div>
        <p className="max-w-xl text-lg text-foreground/70">
          We are a student-led innovation guild expanding what&apos;s possible
          through code, creativity, and community impact.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(siteConfig.social).map(([key, url]) => (
            <a
              key={key}
              href={url}
              className="text-sm text-foreground/60 transition hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {key}
            </a>
          ))}
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-foreground/60">
            Explore
          </p>
          <ul className="space-y-3 text-sm text-foreground/60">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                {link.href.includes("#") ? (
                  <a href={link.href} className="transition hover:text-primary">
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href as Route}
                    className="transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-foreground/60">
            Quick Links
          </p>
          <ul className="space-y-3 text-sm text-foreground/60">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container-grid flex flex-col gap-3 py-6 text-xs text-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Crafted for the next
          wave of creators.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className={cn("hover:text-primary")}>
            Privacy
          </Link>
          <Link href="/terms" className={cn("hover:text-primary")}>
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
