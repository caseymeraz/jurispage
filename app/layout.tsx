import type { Metadata } from "next";
import { Quicksand, Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
  "@type": "MarketingAgency",
  "@id": "https://jurispage.com/#organization",
  name: "JurisPage",
  alternateName: "Ethical SEO Consulting LLC",
  url: "https://jurispage.com",
  logo: "https://jurispage.com/images/jurispage-logo-dark.svg",
  description: "Law firm marketing agency providing SEO, Google Ads, website design, and digital strategy for small and mid-market law firms.",
  telephone: "+1-855-593-6935",
  email: "hello@jurispage.com",
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "Law Firm Digital Marketing",
  priceRange: "$$$",
  sameAs: [
    "https://www.linkedin.com/company/jurispage",
    "https://www.facebook.com/p/JurisPage-61567289636310/",
    "https://x.com/JurisPage",
  ],
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
        <SchemaOrg schema={[orgSchema, websiteSchema]} />
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-53WNLQH5');
        `}</Script>
      </head>
      <body className="bg-white text-gray-900 font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53WNLQH5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
        <Script id="hs-script-loader" strategy="afterInteractive" src="//js.hs-scripts.com/50142530.js" />
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w6dn7bv8im");
        `}</Script>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
