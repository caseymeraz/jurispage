import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaOrg from "@/components/SchemaOrg";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://jurispage.com/#organization",
  name: "JurisPage",
  alternateName: "Ethical SEO Consulting LLC",
  url: "https://jurispage.com",
  logo: "https://jurispage.com/logo.png",
  description: "Law firm marketing agency providing SEO, Google Ads, website design, and digital strategy for small and mid-market law firms.",
  telephone: "+1-888-767-7447",
  email: "hello@jurispage.com",
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
    addressRegion: "CO",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: "Law Firm Digital Marketing",
  priceRange: "$$$",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jurispage.com"),
  title: {
    default: "JurisPage — Law Firm Marketing That Gets Cases, Not Just Clicks",
    template: "%s | JurisPage",
  },
  description: "JurisPage provides transparent, ethical digital marketing for law firms. SEO, Google Ads, website design, and GEO optimization. Month-to-month contracts, pricing published online.",
  keywords: ["law firm marketing", "law firm SEO", "legal marketing agency", "attorney marketing", "lawyer SEO"],
  authors: [{ name: "JurisPage" }],
  creator: "JurisPage",
  openGraph: {
    type: "website",
    siteName: "JurisPage",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <SchemaOrg schema={orgSchema} />
      </head>
      <body className="bg-white text-gray-900 font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
