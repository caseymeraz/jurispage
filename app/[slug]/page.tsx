import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/data/services";
import { getPracticeAreaBySlug, practiceAreas } from "@/data/practiceAreas";
import { parseMetroPageSlug, metroServiceCombos } from "@/data/metros";
import ServicePage, { generateServiceMetadata } from "@/components/ServicePage";
import PracticeAreaPage, { generatePracticeAreaMetadata } from "@/components/PracticeAreaPage";
import MetroPage, { generateMetroMetadata } from "@/components/MetroPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const serviceSlugs = services.map((s) => ({ slug: s.slug }));
  const practiceAreaSlugs = practiceAreas.map((p) => ({ slug: p.slug }));
  const metroSlugs = metroServiceCombos.map((m) => ({ slug: m.pageSlug }));
  return [...serviceSlugs, ...practiceAreaSlugs, ...metroSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = getServiceBySlug(slug);
  if (service) return generateServiceMetadata(service);

  const practiceArea = getPracticeAreaBySlug(slug);
  if (practiceArea) return generatePracticeAreaMetadata(practiceArea);

  const metroData = parseMetroPageSlug(slug);
  if (metroData) return generateMetroMetadata(metroData.metro, metroData.service);

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);
  if (service) return <ServicePage service={service} />;

  const practiceArea = getPracticeAreaBySlug(slug);
  if (practiceArea) return <PracticeAreaPage practiceArea={practiceArea} />;

  const metroData = parseMetroPageSlug(slug);
  if (metroData) return <MetroPage metro={metroData.metro} service={metroData.service} />;

  notFound();
}
