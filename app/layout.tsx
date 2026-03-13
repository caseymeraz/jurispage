import type { Metadata } from "next";
import { Quicksand, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaOrg from "@/components/SchemaOrg";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://jurispage.com/#organization",
  name: "JurisPage",
  alternateName: "Ethical SEO Consulting LLC",
  url: "https://jurispage.com",
  logo: "https://jurispage.com/images/jurispage-logo-dark.svg",
  description: "Law firm marketing agency providing SEO, Google Ads, website design, and digital strategy for small and mid-market law firms.",
  telephone: "+1-855-593-6935",
  email: "hello@jurispage.com",
  foundingDate: "2026",
  address: [
    { "@type": "PostalAddress", addressLocality: "Minneapolis", addressRegion: "MN", addressCountry: "US" },
    { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
    { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
  ],
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "Law Firm Digital Marketing",
  priceRange: "$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JurisPage",
  url: "https://jurispage.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jurispage.com/blog?q={q}",
    "query-input": "required name=q",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JurisPage",
  url: "https://jurispage.com",
  telephone: "+1-855-593-6935",
  email: "hello@jurispage.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Minneapolis",
    addressRegion: "MN",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "44.9778",
    longitude: "-93.2650",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jurispage.com"),
  title: {
    default: "JurisPage - Law Firm Marketing That Gets Cases, Not Just Clicks",
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
    <html lang="en" className={`${quicksand.variable} ${poppins.variable}`}>
      <head>
        <SchemaOrg schema={[orgSchema, websiteSchema, localBusinessSchema]} />
      </head>
      <body className="bg-white text-gray-900 font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FQJLT879FN" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FQJLT879FN');
        `}</Script>
        <Script id="hs-script-loader" strategy="afterInteractive" src="//js.hs-scripts.com/23597402.js" />
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
