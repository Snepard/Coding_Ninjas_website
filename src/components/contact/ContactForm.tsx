"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { CTAButton } from "../ui/CTAButton";

const contactSchema = z.object({
  name: z.string().min(2, "Tell us who you are"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Share a bit more about your request"),
});

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export const ContactForm = () => {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormState({ status: "error", message: issue.message });
      return;
    }

    setFormState({ status: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error ?? "Something went wrong");
      }
      (event.currentTarget as HTMLFormElement).reset();
      setFormState({
        status: "success",
        message: "Thanks! We will connect with you shortly.",
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn’t submit the form. Try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border/60 bg-background/80 p-8 text-sm text-foreground/70"
    >
      <div>
        <label htmlFor={nameId} className="text-xs uppercase tracking-[0.3em]">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="mt-2 w-full rounded-2xl border border-border/60 bg-surface/70 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
      </div>
      <div>
        <label htmlFor={emailId} className="text-xs uppercase tracking-[0.3em]">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="mt-2 w-full rounded-2xl border border-border/60 bg-surface/70 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
      </div>
      <div>
        <label
          htmlFor={messageId}
          className="text-xs uppercase tracking-[0.3em]"
        >
          How can we help?
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          placeholder="Share context about your idea, partnership, or mentorship request."
          rows={5}
          className="mt-2 w-full rounded-2xl border border-border/60 bg-surface/70 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
      </div>
      <CTAButton
        type="submit"
        trackingId="contact-submit"
        disabled={formState.status === "submitting"}
      >
        {formState.status === "submitting" ? "Sending..." : "Send message"}
      </CTAButton>
      {formState.message && (
        <p
          role={formState.status === "error" ? "alert" : "status"}
          className={
            formState.status === "error"
              ? "text-sm text-red-400"
              : "text-sm text-primary"
          }
        >
          {formState.message}
        </p>
      )}
    </form>
  );
};
