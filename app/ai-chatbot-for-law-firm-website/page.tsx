import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";

const service = getServiceBySlug("ai-chatbot-for-law-firm-website")!;

export function generateMetadata(): Metadata {
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: "https://jurispage.com/ai-chatbot-for-law-firm-website/" },
    openGraph: {
      title: service.title,
      description: service.description,
      url: "https://jurispage.com/ai-chatbot-for-law-firm-website/",
    },
  };
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JD Assistant",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web (WordPress plugin)",
  description:
    "AI-powered WordPress plugin that replaces live chat on law firm websites. Answers visitor questions instantly, pre-qualifies leads, and captures intake information 24/7.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Flat monthly fee included with JurisPage service plans",
  },
  provider: {
    "@type": "Organization",
    name: "JurisPage",
    url: "https://jurispage.com",
  },
};

const faqs = [
  {
    question: "What is JD Assistant and how does it work?",
    answer:
      "JD Assistant is a WordPress plugin built specifically for law firm websites. It uses AI trained on your practice areas and firm details to answer visitor questions in real time, collect contact information, and pre-qualify leads before they ever reach your intake team. It replaces traditional live chat widgets that require a human on the other end.",
  },
  {
    question: "How is JD Assistant different from live chat?",
    answer:
      "Live chat requires someone to be available to respond. If nobody answers, the visitor leaves. JD Assistant handles conversations automatically, 24 hours a day, with no staffing required. It responds instantly, stays on-topic, and never takes a break. You get the benefits of live engagement without the payroll.",
  },
  {
    question: "Is JD Assistant compliant with bar advertising rules?",
    answer:
      "Yes. JD Assistant is configured with disclaimers that make clear the conversation does not create an attorney-client relationship and that the chatbot is not providing legal advice. It is designed for intake and lead qualification, not legal counsel.",
  },
  {
    question: "Can I control what JD Assistant says?",
    answer:
      "Absolutely. The assistant is trained on content you approve: your practice areas, FAQs, firm policies, and intake questions. It will not go off-script or make claims about outcomes. You review and adjust the training material at any time.",
  },
  {
    question: "What happens when JD Assistant captures a lead?",
    answer:
      "When a visitor shares their contact information or describes a potential case, JD Assistant sends an instant notification via email or SMS to your intake team. Lead details are logged and can be integrated with your CRM or case management software.",
  },
  {
    question: "Does JD Assistant work on any website or just WordPress?",
    answer:
      "JD Assistant is built as a WordPress plugin. If your law firm website runs on WordPress, installation takes minutes. For non-WordPress sites, contact us to discuss integration options.",
  },
  {
    question: "How much does JD Assistant cost?",
    answer:
      "JD Assistant is available as an add-on to JurisPage service plans at a flat monthly fee. There are no per-conversation charges and no hidden costs. Contact us for current pricing based on your plan.",
  },
  {
    question: "Will JD Assistant slow down my website?",
    answer:
      "No. The plugin is lightweight and loads asynchronously. It will not affect your page speed scores or Core Web Vitals, which matter for both user experience and SEO rankings.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Chatbot for Law Firms",
      item: "https://jurispage.com/ai-chatbot-for-law-firm-website/",
    },
  ],
};

export default function AiChatbotPage() {
  return (
    <>
      <SchemaOrg schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      {/* ── 1. Hero ── */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
                <span className="text-gray-700">AI Chatbot for Law Firms</span>
              </nav>
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: "#EE6C1322", color: "#EE6C13" }}
              >
                JD Assistant
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
                Stop Losing Leads to Unanswered Chat Windows
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-6">
                JD Assistant is an AI-powered WordPress plugin that replaces live chat on your law firm website. It answers visitor questions instantly, pre-qualifies leads, and captures intake information around the clock, with no staffing required.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/contact/"
                  className="inline-block font-heading font-bold text-sm px-8 py-4 rounded-[40px] text-white no-underline transition-opacity hover:opacity-90"
                  style={{ background: "#EE6C13" }}
                >
                  Get JD Assistant
                </Link>
                <a
                  href="#live-demo"
                  className="inline-block font-heading font-bold text-sm px-8 py-4 rounded-[40px] no-underline border-2 transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                >
                  See the Live Demo
                </a>
              </div>
            </div>

            {/* Right: trust stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:pt-16">
              {[
                { value: "Flat Fee", label: "No per-conversation charges" },
                { value: "24/7", label: "Always-on lead capture" },
                { value: "<1s", label: "Average response time" },
                { value: "0", label: "Staff required to operate" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-5 bg-gray-50 border border-gray-100 text-center"
                >
                  <p className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Award Banner ── */}
      <section className="py-5 px-6" style={{ background: "#1a1a1a" }}>
        <p className="text-center text-sm text-gray-300 max-w-3xl mx-auto">
          Built by the team behind Juris Digital, recognized by{" "}
          <span className="text-white font-semibold">Fast Company&apos;s 2025 Most Innovative Companies</span>{" "}
          in the AI category.
        </p>
      </section>

      {/* ── 3. Three-Column Feature Grid ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4">
              About the JD Assistant Plugin
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A purpose-built AI assistant for law firm websites. Here is exactly what it does, what it does not do, and what you get.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* What It Does */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4"
                style={{ background: "#EE6C13" }}
              >
                &#10003;
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">What It Does</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Answers visitor questions about your practice areas instantly
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Collects name, email, phone, and case details from prospects
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Pre-qualifies leads based on criteria you define
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Sends real-time notifications to your intake team
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Works 24/7 including holidays and weekends
                </li>
              </ul>
            </div>

            {/* What It Doesn't Do */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4"
                style={{ background: "#982A0B" }}
              >
                &#10007;
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">What It Does Not Do</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#982A0B" }}>&#10007;</span>
                  Provide legal advice or case evaluations
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#982A0B" }}>&#10007;</span>
                  Create attorney-client relationships
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#982A0B" }}>&#10007;</span>
                  Make guarantees about case outcomes
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#982A0B" }}>&#10007;</span>
                  Go off-script or hallucinate claims about your firm
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#982A0B" }}>&#10007;</span>
                  Require any technical knowledge to manage
                </li>
              </ul>
            </div>

            {/* What Comes Included */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4"
                style={{ background: "#1a1a1a" }}
              >
                &#9733;
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">What Comes Included</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Full plugin installation and configuration
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Custom AI training on your firm and practice areas
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  CRM and intake tool integration
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Compliance-aware conversation design
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-bold mt-0.5" style={{ color: "#EE6C13" }}>&#10003;</span>
                  Ongoing updates and support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Video Section ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4">
            See JD Assistant in Action
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Watch a quick walkthrough of how JD Assistant handles a real visitor conversation on a law firm website.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <video
              controls
              preload="metadata"
              className="w-full"
              playsInline
            >
              <source
                src="https://jurisdigital.com/wp-content/uploads/jd-assistant-quick-demo.mp4.mov"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ── 5. Live Demo ── */}
      <section id="live-demo" className="py-20 px-6 scroll-mt-16" style={{ background: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Try JD Assistant Right Now
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            This is a live, working demo. Ask it anything a potential client would ask a law firm. See how it responds, qualifies the lead, and collects contact information.
          </p>
          <div className="rounded-2xl overflow-hidden mx-auto bg-white" style={{ maxWidth: "900px" }}>
            <iframe
              src="https://jurisdigital.com/assistant/"
              title="JD Assistant Live Demo"
              className="w-full border-0"
              style={{ height: "650px" }}
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Demo not loading?{" "}
            <a
              href="https://jurisdigital.com/assistant/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-gray-300 hover:text-white"
            >
              Open the demo in a new tab
            </a>
          </p>
        </div>
      </section>

      {/* ── 6. Testimonial ── */}
      <section className="py-16 px-6" style={{ background: "#FEF3EC" }}>
        <div className="max-w-3xl mx-auto">
          <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: "#EE6C13" }}>
            <p className="text-gray-800 text-lg md:text-xl italic leading-relaxed mb-4">
              &ldquo;We used to lose after-hours leads constantly. Someone would visit the site at 10pm, see no way to get a quick answer, and move on to the next firm. JD Assistant changed that completely. Now every visitor gets an immediate, intelligent response, and our intake team wakes up to qualified leads already in the pipeline.&rdquo;
            </p>
            <footer>
              <p className="font-heading font-bold text-gray-900">Attorney Robert Wood</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── 7. Use Cases ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4">
              How Law Firms Use JD Assistant
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every practice area benefits from instant visitor engagement. Here are the most common ways firms put JD Assistant to work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "After-Hours Lead Capture",
                desc: "40% of legal inquiries happen outside business hours. JD Assistant captures those leads automatically, collecting case details and contact information while your office is closed.",
                tag: "Lead Generation",
              },
              {
                title: "Pre-Qualifying Before Intake",
                desc: "Instead of your intake team spending time on unqualified callers, JD Assistant screens visitors first. It asks the right questions so your team only follows up with prospects who match your case criteria.",
                tag: "Efficiency",
              },
              {
                title: "Replacing Expensive Live Chat",
                desc: "Live chat services charge per conversation and still miss after-hours traffic. JD Assistant handles unlimited conversations at a flat monthly rate with no staffing overhead.",
                tag: "Cost Savings",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                <span
                  className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                  style={{ background: "#EE6C1318", color: "#EE6C13" }}
                >
                  {item.tag}
                </span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <FAQAccordion faqs={faqs} heading="JD Assistant: Questions Answered" />

      {/* ── 9. Bottom CTA ── */}
      <CTASection
        heading="Ready to Stop Missing Leads?"
        subtext="Flat monthly fee. No per-conversation charges. No contracts. Your AI assistant is ready when your visitors are."
        primaryLabel="Get JD Assistant"
        primaryHref="/contact/"
        secondaryLabel="See the Demo"
        secondaryHref="#live-demo"
      />
    </>
  );
}
