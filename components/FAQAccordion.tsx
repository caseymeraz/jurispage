"use client";
import { useState } from "react";
import { renderLinkedText } from "@/lib/renderLinkedText";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  heading?: string;
}

export default function FAQAccordion({ faqs, heading = "Frequently Asked Questions" }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl font-extrabold text-gray-900 mb-10 text-center">{heading}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`w-full text-left px-6 py-5 font-heading font-semibold text-gray-900 text-base flex justify-between items-center hover:bg-orange-50 transition-colors ${open === i ? "border-l-4 border-l-[#EE6C13]" : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.question}</span>
                <span className="text-xl ml-4 flex-shrink-0" style={{ color: open === i ? "#EE6C13" : "#9ca3af" }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-base">
                  {renderLinkedText(faq.answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
