import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About JurisPage | Law Firm Marketing Agency Built on Ethics",
  description: "JurisPage is a law firm marketing agency with 15+ years of legal SEO experience, 113+ clients served, and a mission to make enterprise-quality digital marketing accessible to small law firms.",
  alternates: { canonical: "https://jurispage.com/about-us/" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://jurispage.com/about-us/",
  name: "About JurisPage",
  url: "https://jurispage.com/about-us/",
  description: "JurisPage is a law firm marketing agency acquired by Ethical SEO Consulting LLC in February 2026, with a mission to provide transparent, ethical marketing for small and mid-market law firms.",
};

const differences = [
  {
    title: "No Hidden Fees or Surprises",
    body: "We don't play games with pricing. We'll give you a straight answer on cost during your first conversation. No runaround, no mystery packages. Starting at $2,000/month.",
  },
  {
    title: "100% Law Firm Focus",
    body: "We don't do e-commerce SEO. We don't run campaigns for restaurants or HVAC companies. Every single thing we do is built for law firms - the compliance considerations, the YMYL standards, the local map pack tactics that actually move the needle.",
  },
  {
    title: "Month-to-Month Contracts",
    body: "We don't lock you into 12-month agreements and collect a check whether you're happy or not. We operate month-to-month because we believe we should earn your business every single month.",
  },
  {
    title: "Ethical SEO - No Shortcuts",
    body: "No black hat link schemes, no keyword stuffing, no fake reviews, no tricks. Ethical SEO takes longer to ramp, but it builds rankings that last and won't get you penalized when Google updates.",
  },
  {
    title: "Built for Small Firms",
    body: "The attorney running a three-person PI firm deserves the same caliber of digital marketing as the 50-attorney firm down the street. We built JurisPage specifically for small and mid-size firms that are underserved by the market.",
  },
];

const teamMembers = [
  { name: "Leann Pickard", image: "headshot-leann-pickard.webp", title: "President & COO" },
  { name: "Peter Kerlin", image: "headshot-peter-kerlin.webp", title: "Director of Operations" },
  { name: "Shahla Cornelio", image: "headshot-shahla-cornelio.jpg", title: "PPC Manager" },
  { name: "Serena Gross", image: "headshot-serena-gross.jpg", title: "Web Designer" },
  { name: "Justin Carson", image: "headshot-justin-carson.jpg", title: "SEO Specialist" },
  { name: "Jeremy Shankman", image: "headshot-jeremy-shankman.jpg", title: "Senior SEO Specialist" },
];

const partners = [
  { name: "Forbes", image: "partner-forbes.svg" },
  { name: "Lawyerist", image: "partner-lawyerist.svg" },
  { name: "Moz", image: "partner-moz.svg" },
  { name: "Unbounce Agency", image: "partner-unbounce-agency.svg" },
  { name: "Expertise.com", image: "partner-expertise-com.svg" },
  { name: "Backlinko", image: "partner-backlinko.svg" },
  { name: "Google", image: "partner-google.svg" },
  { name: "Law360", image: "partner-law360.svg" },
];

const practiceAreasList = [
  "Personal Injury", "Criminal Defense", "Family Law & Divorce", "Immigration Law",
  "Estate Planning & Probate", "Business Law", "Employment Law", "Bankruptcy",
  "Medical Malpractice", "Workers' Compensation", "Social Security Disability", "Real Estate Law",
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={aboutSchema} />

      {/* Hero */}
      <section className="bg-gray-50 py-20 px-6 text-center border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-extrabold text-gray-900 text-5xl mb-6 leading-tight">
            Law Firm Marketing Built on Ethics, Not Empty Promises
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            We&apos;re a specialized law firm marketing agency with one mission: make enterprise-quality digital marketing accessible to the small and mid-size law firms that need it most.
          </p>
        </div>
      </section>

      {/* Three Alternating Image+Text Sections */}
      {/* Section 1 - Image Left */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/about/about-us-marketing-team-4x5-image.jpg"
              alt="JurisPage marketing team"
              width={600}
              height={750}
              className="rounded-2xl object-cover w-full h-auto"
            />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
              Your Passion for Law, Our Passion for Legal Marketing
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At JurisPage, you&apos;re more than a client. You&apos;re a partner looking for more out of your digital marketing efforts.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our team combines legal marketing expertise and dynamic energy with the kind of experience that only comes from serving law firms for more than a decade.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Image Right */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
              Your Success Is Our Sole Focus
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We&apos;re dedicated exclusively to the legal industry. We speak your language, understand your needs, and most importantly, we know how to make your phone ring.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              When you choose JurisPage, you&apos;re choosing a partnership with a team of digital marketing experts who are as committed to your success as you are.
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <Image
              src="/images/about/about-us-mobile-interaction-4x5-image.jpg"
              alt="Mobile marketing interaction for law firms"
              width={600}
              height={750}
              className="rounded-2xl object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Section 3 - Image Left */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/about/about-us-always-connected-4x5-image.jpg"
              alt="Always connected communication with law firm clients"
              width={600}
              height={750}
              className="rounded-2xl object-cover w-full h-auto"
            />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
              Transparent, Clear Communication
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              You have a firm to manage and clients to serve. At JurisPage, direct access is always just a call or email away. We proactively keep you informed so you&apos;re always in the loop on your marketing campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>Our Story</h2>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>JurisPage has been around for years, but in February 2026 we entered a new chapter. Ethical SEO Consulting LLC acquired JurisPage and brought in a leadership team with over 15 years of hands-on experience in legal digital marketing.</p>
            <p>We&apos;ve grown and evolved significantly over time. Today we&apos;re building something we&apos;re genuinely proud of.</p>
            <p>A focused, ethical, results-driven agency for law firms that are serious about growth - without the big-agency price tag or the big-agency indifference.</p>
            <p>Our broader organization has served 113+ law firms across the country. That experience shapes everything we do at JurisPage - from how we price our services to how we talk with clients every week.</p>
            <p>We&apos;re not going to pretend we&apos;re the biggest agency in legal marketing. We&apos;re going to prove we&apos;re the best fit for small law firms that want real results and a partner they can actually trust.</p>
          </div>
        </div>
      </section>

      {/* Meet Casey */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>Meet Casey Meraz, CEO</h2>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>Casey Meraz has spent 15 years doing one thing: helping law firms get found online and turn that traffic into clients.</p>
            <p>He&apos;s personally managed SEO campaigns for 100+ law firms - from solo practitioners to multi-location regional firms.</p>
            <p>He&apos;s built one of the most-read blogs on legal marketing online and contributed to industry publications covering local SEO, ethical link building, and content strategy for attorneys.</p>
            <p>Casey is based in Ireland and works with law firms across the United States remotely - a setup that works because this work has always been about strategy and results, not office visits.</p>
            <p>His philosophy is simple: <strong>&quot;Do the right thing for the client, be completely transparent about what&apos;s working and what isn&apos;t, and never take a shortcut that could put their business at risk.&quot;</strong></p>
            <p>That&apos;s not a tagline. It&apos;s how he&apos;s operated for 15 years, and it&apos;s the standard every JurisPage team member is held to.</p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>What Makes JurisPage Different</h2>
          <div className="space-y-4">
            {differences.map((d) => (
              <div key={d.title} className="bg-white rounded-lg p-6 border-l-4 shadow-sm" style={{ borderLeftColor: "#EE6C13" }}>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{d.title}</h3>
                <p className="text-gray-600 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>Why JurisPage vs Your Other Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm shadow-sm">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-[#1a1a1a] text-white font-semibold rounded-tl-lg w-1/4"> </th>
                  <th className="p-4 text-center font-extrabold text-gray-900 text-base rounded-none" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)", color: "#fff" }}>JurisPage</th>
                  <th className="p-4 text-center bg-gray-700 text-white font-semibold">Large Agencies</th>
                  <th className="p-4 text-center bg-gray-700 text-white font-semibold rounded-tr-lg">Freelancers</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Pricing transparency", "Published online", "Requires sales call", "Varies widely"],
                  ["Contract terms", "Month-to-month", "12-month lock-in", "Month-to-month"],
                  ["Law firm focus", "100% legal only", "General or 'legal team'", "Rarely specialized"],
                  ["Proven results", "113+ law firms served", "Varies by team", "Hard to verify"],
                  ["Starting price", "Starting at $2,000/mo", "$5,000 – $15,000+/mo", "Low cost, high risk"],
                ].map(([feature, juris, large, free], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-semibold text-gray-800">{feature}</td>
                    <td className="p-4 text-center font-bold text-gray-900">{juris}</td>
                    <td className="p-4 text-center text-gray-500">{large}</td>
                    <td className="p-4 text-center text-gray-500">{free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
            Meet the Team Dedicated to Your Success
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <Image
                  src={`/images/about/${member.image}`}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="rounded-full w-24 h-24 object-cover mx-auto mb-3"
                />
                <p className="font-bold text-gray-900 text-sm text-center">{member.name}</p>
                {member.title && <p className="text-xs text-gray-500 text-center mt-0.5">{member.title}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>
            Our Partners
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <Image
                key={partner.name}
                src={`/images/about/${partner.image}`}
                alt={partner.name}
                width={120}
                height={32}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#EE6C13" }}>Who We Serve</h2>
          <p className="text-gray-700 leading-relaxed mb-4">JurisPage works with law firms across the United States - from solo practitioners launching their first marketing campaign to established regional firms looking to take their online presence to the next level.</p>
          <p className="text-gray-700 leading-relaxed mb-6">We work across nearly every practice area, including:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {practiceAreasList.map((area) => (
              <div key={area} className="bg-white px-4 py-3 border-l-4 text-sm font-medium text-gray-700 shadow-sm" style={{ borderLeftColor: "#EE6C13" }}>
                {area}
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">We&apos;re built for firms with 1 to 25 attorneys who are ready to grow. If that&apos;s you, we&apos;d like to talk.</p>
        </div>
      </section>

      <CTASection
        heading="Ready to Grow Your Firm?"
        subtext="No long-term contracts. No mystery pricing. No runaround. Just a straightforward conversation about what digital marketing can do for your law firm."
        primaryLabel="Book Your Strategy Session"
        primaryHref="/contact/"
      />
    </>
  );
}
