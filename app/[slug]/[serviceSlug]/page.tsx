import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { intersections, getIntersection } from "@/data/intersections";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getServiceBySlug } from "@/data/services";
import PracticeAreaServicePage, {
  generateIntersectionMetadata,
} from "@/components/PracticeAreaServicePage";

interface PageProps {
  params: Promise<{ slug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
  return intersections.map((i) => ({
    slug: i.practiceAreaSlug,
    serviceSlug: i.serviceSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const intersection = getIntersection(slug, serviceSlug);
  if (!intersection) return {};
  return generateIntersectionMetadata(intersection);
}

export default async function Page({ params }: PageProps) {
  const { slug, serviceSlug } = await params;

  const intersection = getIntersection(slug, serviceSlug);
  if (!intersection) notFound();

  const practiceArea = getPracticeAreaBySlug(slug);
  if (!practiceArea) notFound();

  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  return (
    <PracticeAreaServicePage
      intersection={intersection}
      practiceArea={practiceArea}
      service={service}
    />
  );
}
