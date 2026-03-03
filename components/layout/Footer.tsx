import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#1a1a1a] border-t border-gray-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/jurispage-logo-white.svg"
                alt="JurisPage Law Firm Marketing"
                width={182}
                height={34}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Law firm marketing built on ethics, not empty promises. Transparent pricing, month-to-month contracts, 100% legal focus.
            </p>
            <a href="tel:+18555936935" className="text-gray-300 hover:text-white text-sm font-medium no-underline block mb-1">(855) 593-6935</a>
            <Link href="/contact/" className="text-sm no-underline" style={{ color: "#EE6C13" }}>Let&apos;s Talk Growth →</Link>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Law Firm SEO", "/law-firm-seo/"],
                ["Google Ads for Law Firms", "/google-ads-for-law-firms/"],
                ["Law Firm Websites", "/law-firm-websites/"],
                ["Local SEO", "/local-seo-for-law-firms/"],
                ["Launchpad for New Firms", "/launchpad/"],
                ["GEO / AI Search", "/generative-engine-optimization-for-law-firms/"],
                ["AI Chatbot", "/ai-chatbot-for-law-firm-website/"],
                ["Email Marketing", "/law-firm-email-marketing/"],
                ["Content Writing", "/law-firm-content-writing/"],
                ["Pricing", "/services/pricing/"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors no-underline">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">Practice Areas</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Personal Injury", "/personal-injury-lawyer-marketing/"],
                ["Criminal Defense", "/criminal-defense-lawyer-marketing/"],
                ["Family Law", "/family-law-firm-marketing/"],
                ["Immigration", "/immigration-lawyer-marketing/"],
                ["Bankruptcy", "/bankruptcy-lawyer-marketing/"],
                ["Estate Planning", "/estate-planning-lawyer-marketing/"],
                ["Employment Law", "/employment-lawyer-marketing/"],
                ["DUI Defense", "/dui-lawyer-marketing/"],
                ["Solo Attorneys", "/solo-attorney-marketing/"],
                ["Small Law Firms", "/small-law-firm-marketing/"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors no-underline">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              {[
                ["About JurisPage", "/about-us/"],
                ["Success Stories", "/case-studies/"],
                ["Free Market Report", "/free-market-report/"],
                ["Blog", "/blog/"],
                ["Best Law Firm SEO Companies", "/best-law-firm-seo-companies/"],
                ["Law Firm SEO Cost", "/law-firm-seo-cost/"],
                ["Scorpion Alternative", "/scorpion-legal-marketing-alternative/"],
                ["Contact Us", "/contact/"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors no-underline">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© {currentYear} JurisPage - Ethical SEO Consulting LLC. All rights reserved.</p>
          <p>Law firm marketing services across the United States.</p>
        </div>
      </div>
    </footer>
  );
}
