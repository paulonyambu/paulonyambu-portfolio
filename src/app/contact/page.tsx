import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Motion } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Hire Paul Onyambu for payments integration, AI agents, platforms and websites. Email, call or WhatsApp from Nairobi, Kenya.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Start a project | Paul Onyambu" },
};

export default function ContactPage() {
  return (
    <>
      <Contact as="h1" />
      <Motion />
    </>
  );
}
