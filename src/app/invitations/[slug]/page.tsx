import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designs, getDesignBySlug } from "@/data/designs";
import { InvitationView } from "@/components/invitation/InvitationView";
import { SwansClassicInvitation } from "@/components/invitation/swans-classic/SwansClassicInvitation";

export function generateStaticParams() {
  return designs.map((design) => ({ slug: design.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) return {};
  return {
    title: `${design.name} — пример приглашения`,
    description: design.description,
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) notFound();

  if (design.customTemplate === "swans-classic") {
    return <SwansClassicInvitation design={design} />;
  }

  return <InvitationView design={design} />;
}
