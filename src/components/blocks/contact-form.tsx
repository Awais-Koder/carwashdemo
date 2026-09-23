"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";

const TOPICS = [
  "A booking I already have",
  "Fleet or commercial account",
  "Something about a recent wash",
  "Careers",
  "Something else",
] as const;

type Errors = { name?: string; email?: string; topic?: string; message?: string };

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Add your name.";
    if (!values.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "That email doesn't look right.";
    if (!values.topic) next.topic = "Pick a topic so it reaches the right person.";
    if (values.message.trim().length < 10)
      next.message = "A sentence or two helps us answer properly.";
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      toast.error("Check the form", {
        description: "A few fields still need attention.",
      });
      return;
    }

    setState("sending");
    /* Demo build: no backend. Wire this to a form endpoint before launch. */
    await new Promise((resolve) => setTimeout(resolve, 850));
    setState("sent");
    toast.success("Message sent", {
      description: "We reply to most messages the same working day.",
    });
    setValues({ name: "", email: "", phone: "", topic: "", message: "" });
    window.setTimeout(() => setState("idle"), 2600);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="cf-name" error={errors.name} errorId="cf-name-error">
          <Input
            id="cf-name"
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Alex Morgan"
          />
        </Field>

        <Field label="Phone (optional)" htmlFor="cf-phone">
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="(555) 000-0000"
          />
        </Field>

        <Field label="Email" htmlFor="cf-email" error={errors.email} errorId="cf-email-error">
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Topic" htmlFor="cf-topic" error={errors.topic} errorId="cf-topic-error">
          <select
            id="cf-topic"
            name="topic"
            value={values.topic}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "cf-topic-error" : undefined}
            onChange={(event) => update("topic", event.target.value)}
            className="h-11 w-full cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 text-[length:var(--text-sm)] text-ink transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <option value="">Choose one…</option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Message"
        htmlFor="cf-message"
        hint="Vehicle, location and roughly when — that's usually enough for us to answer in one reply."
        error={errors.message}
        errorId="cf-message-error"
      >
        <Textarea
          id="cf-message"
          name="message"
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : "cf-message-hint"}
          onChange={(event) => update("message", event.target.value)}
          placeholder="I run six vans out of Eastfield and want to move to a monthly account."
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          data-state={
            state === "sending" ? "loading" : state === "sent" ? "success" : undefined
          }
          disabled={state === "sending"}
        >
          {state === "sending" ? (
            "Sending…"
          ) : state === "sent" ? (
            "Message sent"
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-[length:var(--text-xs)] text-ink-3">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}
