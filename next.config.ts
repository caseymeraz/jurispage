import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  serverExternalPackages: ["@sparticuz/chromium"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jurispage.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "jurispage.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      // ── Existing redirects ──
      {
        source: "/seo-for-family-law-firms/:path*",
        destination: "/family-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-personal-injury-law-firms/:path*",
        destination: "/personal-injury-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-employment-law-firms/:path*",
        destination: "/employment-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-estate-planning-lawyers/:path*",
        destination: "/estate-planning-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-immigration-law-firms/:path*",
        destination: "/immigration-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-real-estate-law-firms/:path*",
        destination: "/real-estate-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/seo-for-bankruptcy-lawyers/:path*",
        destination: "/bankruptcy-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/criminal-defense-lawyer-seo/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/free-market-report",
        destination: "/see-my-market-gap",
        permanent: true,
      },

      // ── GEO slug change ──
      {
        source: "/generative-engine-optimization-for-law-firms/:path*",
        destination: "/generative-engine-optimization-legal-marketing/",
        permanent: true,
      },

      // ── High-priority backlink recovery (DR 50+) ──
      {
        source: "/law-firm-marketing/law-firm-marketing-strategy/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-strategy/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/video-marketing-for-lawyers-goes-mainstream",
        destination: "/",
        permanent: true,
      },
      {
        source: "/landing-page-portfolio/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/design-portfolio/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/seo-for-lawyers/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/how-many-hours-do-lawyers-work/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-start-a-law-firm/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-seo/:path+",
        destination: "/law-firm-seo/",
        permanent: true,
      },

      // ── Practice area remapping ──
      {
        source: "/marketing-for-criminal-defense-lawyers/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/marketing-for-family-lawyers/:path*",
        destination: "/family-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/marketing-for-bankruptcy-attorneys/:path*",
        destination: "/bankruptcy-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/internet-marketing-for-personal-injury-lawyers/:path*",
        destination: "/personal-injury-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/internet-marketing-for-estate-planning-lawyers/:path*",
        destination: "/estate-planning-lawyer-marketing/",
        permanent: true,
      },

      // ── Service page remapping ──
      {
        source: "/google-advertising-lawyers/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/ppc-for-lawyers/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/local-service-ads-lawyers/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/facebook-advertising-for-lawyers/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/best-law-firm-websites-that-nail-design-trust-and-conversion/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/best-law-firm-websites/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/best-law-firm-landing-pages/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/best-criminal-defense-lawyer-websites/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/best-family-lawyer-websites/:path*",
        destination: "/family-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/law-firm-branding/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/best-law-firm-logo-designs/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/law-firm-business-cards/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/lawyer-law-domain-names/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/legal-fonts/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/content-marketing-law-firms/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/law-firm-copywriting/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/social-media-for-lawyers/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/direct-mail-for-lawyers/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/tiktok-for-lawyers/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/email-marketing-for-law-firms/:path*",
        destination: "/law-firm-email-marketing/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-services/:path*",
        destination: "/services/pricing/",
        permanent: true,
      },

      // ── Portfolio → Case studies (specific before catch-all) ──
      {
        source: "/portfolio/sands-law-group/:path*",
        destination: "/case-studies/the-sands-law-group/",
        permanent: true,
      },
      {
        source: "/portfolio/jennings-family-law/:path*",
        destination: "/case-studies/",
        permanent: true,
      },
      {
        source: "/portfolio/karen-a-schoenau/:path*",
        destination: "/case-studies/",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/case-studies/",
        permanent: true,
      },

      // ── Misc informational content ──
      {
        source: "/best-crm-law-firms/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/clio-grow-review/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/advice-for-new-lawyers/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/best-apps-for-lawyers/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/best-books-for-lawyers/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/lawyer-directories/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/lawyer-advertising-rules/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-accounting-bookkeeping/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-leave-findlaw/:path*",
        destination: "/scorpion-legal-marketing-alternative/",
        permanent: true,
      },
      {
        source: "/keyboard-shortcuts-legal-symbols-section-symbol/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/lawyer-statistics/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-marketing-helps-law-firms-succeed/:path*",
        destination: "/",
        permanent: true,
      },

      // ── GSC crawl-error redirects ──
      {
        source: "/avvo-lawyer-marketing-guide/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/feature-client-reviews-on-your-law-firms-website/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/website-design-for-lawyers/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/services/law-firm-web-design-overview/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/12-must-have-pages-on-your-law-firm-website/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/how-to-build-criminal-law-practice/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/how-to-use-reddit-for-law-firm-marketing-without-getting-burned/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/get-started/:path*",
        destination: "/contact/",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/library/:path*",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/online-marketing-for-lawyers/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-grow-a-law-firm/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/marketing-agency-for-law-firm/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/20-bizarre-law-firm-ads/:path*",
        destination: "/",
        permanent: true,
      },

      // ── Author & misc page redirects ──
      {
        source: "/author/will-chan",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/success-stories",
        destination: "/case-studies/",
        permanent: true,
      },

      // ── Screaming Frog crawl fixes (March 2026) ──
      {
        source: "/google-algorithm-updates-impact-on-law-firm-websites",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-clearwater",
        destination: "/law-firm-seo-tampa/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-brandon",
        destination: "/law-firm-seo-tampa/",
        permanent: true,
      },

      // ── Old WordPress URL patterns (catch-alls, last) ──
      {
        source: "/2013/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2014/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2015/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2018/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2023/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/",
        permanent: true,
      },

      // ── Common 404 slug mismatches ──
      {
        source: "/google-ads-for-lawyers",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/google-ads-for-lawyers-:city",
        destination: "/google-ads-lawyers-:city/",
        permanent: true,
      },
      {
        source: "/law-firm-website-design",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/lawyer-web-design/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/lawyer-seo/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/legal-content-writing/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/law-firm-ppc/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/law-firm-social-media-marketing/:path*",
        destination: "/law-firm-content-writing/",
        permanent: true,
      },
      {
        source: "/family-law-marketing/:path*",
        destination: "/family-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/tax-lawyer-marketing/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/services/pricing/",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/",
        permanent: true,
      },
      // GSC Coverage 404 fixes (2026-03-27)
      {
        source: "/small-law-firms-can-use-digital-marketing-to-compete/:path*",
        destination: "/small-law-firm-marketing/",
        permanent: true,
      },
      {
        source: "/google-local-services-ads-update-lawyers-october-2024/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/why-some-google-ads-campaigns-fail-before-they-begin/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/why-most-law-firm-websites-fail/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/how-to-reduce-friction-on-your-law-firms-website/:path*",
        destination: "/law-firm-websites/",
        permanent: true,
      },
      {
        source: "/how-to-build-criminal-law-practice/:path*",
        destination: "/criminal-defense-lawyer-marketing/",
        permanent: true,
      },
      {
        source: "/prove-law-firm-marketing-roi/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/chatgpt-for-law-firm-marketing-a-blueprint/:path*",
        destination: "/blog/ai-content-without-seo-strategy/",
        permanent: true,
      },
      {
        source: "/law-firm-seo-fremont/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-hillsboro/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-marketing-gresham/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/law-firm-seo-santa-clara/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/google-ads-lawyers-anaheim/:path*",
        destination: "/google-ads-for-law-firms/",
        permanent: true,
      },
      {
        source: "/law-firm-seo-plano/:path*",
        destination: "/law-firm-seo/",
        permanent: true,
      },
      {
        source: "/author/ryan-dahlen/:path*",
        destination: "/about-us/",
        permanent: true,
      },
      {
        source: "/local-marketing-package/:path*",
        destination: "/services/pricing/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
