import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/seo";

export const revalidate = 3600;

const contactChannels = [
  {
    title: "Collaborations",
    description:
      "Partner with us on events, mentoring, or product sprints. We move fast and love co-creating outcomes.",
    action: `Email ${siteConfig.contactEmail}`,
    link: `mailto:${siteConfig.contactEmail}`,
  },
  {
    title: "Join the Club",
    description:
      "Applications open every semester. Tell us about your craft, goals, and projects you want to build.",
    action: "Apply now",
    link: "/#join",
  },
  {
    title: "Mentorship",
    description:
      "Alumni and industry pros can host office hours, design reviews, or run Club sessions.",
    action: "Schedule a session",
    link: "https://cal.com/coding-ninjas-chitkara/mentorship",
  },
];

const ContactPage = () => (
  <div className="container-grid space-y-16 pt-10">
    <SectionTitle
      eyebrow="Contact"
      title="Let’s build something remarkable together"
      description="Drop us a note and the core team will respond within two working days. We track every request and follow up personally."
    />
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <ContactForm />
      <div className="space-y-6">
        {contactChannels.map((channel) => (
          <Card key={channel.title} className="bg-background/80">
            <h3 className="text-lg font-heading text-foreground">
              {channel.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {channel.description}
            </p>
            <a
              href={channel.link}
              className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-primary/80"
              target={channel.link.startsWith("http") ? "_blank" : undefined}
              rel={
                channel.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {channel.action} →
            </a>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default ContactPage;
