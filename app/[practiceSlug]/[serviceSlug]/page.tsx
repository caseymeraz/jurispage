import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { intersections, getIntersection } from "@/data/intersections";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getServiceBySlug } from "@/data/services";
import PracticeAreaServicePage, {
  generateIntersectionMetadata,
} from "@/components/PracticeAreaServicePage";

interface PageProps {
  params: Promise<{ practiceSlug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
  return intersections.map((i) => ({
    practiceSlug: i.practiceAreaSlug,
    serviceSlug: i.serviceSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { practiceSlug, serviceSlug } = await params;
  const intersection = getIntersection(practiceSlug, serviceSlug);
  if (!intersection) return {};
  return generateIntersectionMetadata(intersection);
}

export default async function Page({ params }: PageProps) {
  const { practiceSlug, serviceSlug } = await params;

  const intersection = getIntersection(practiceSlug, serviceSlug);
  if (!intersection) notFound();

  const practiceArea = getPracticeAreaBySlug(practiceSlug);
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
