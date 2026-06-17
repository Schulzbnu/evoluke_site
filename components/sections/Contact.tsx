import { Mail, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { ContactForm } from "./ContactForm";
import { contact, site } from "@/content/pt";

export function Contact() {
  return (
    <Section id={contact.id}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            intro={contact.intro}
            align="left"
          />
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-ink-muted">
              <Mail size={20} className="text-brand-800" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-800">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-ink-muted">
              <MessageCircle size={20} className="text-brand-800" aria-hidden="true" />
              <span>{site.whatsapp}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-surface-muted bg-surface-subtle p-6 shadow-soft sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
