import Image from "next/image";

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-report-layout>
      {/* Minimal branded header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" aria-label="JurisPage home">
            <Image
              src="/images/jurispage-logo-dark.svg"
              alt="JurisPage"
              width={140}
              height={32}
              priority
            />
          </a>
          <a
            href="tel:+18555936935"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
          >
            (855) 593-6935
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} JurisPage</span>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-gray-600 transition-colors">
              Home
            </a>
            <a
              href="/see-my-market-gap"
              className="hover:text-gray-600 transition-colors"
            >
              Get Your Report
            </a>
            <a
              href="mailto:hello@jurispage.com"
              className="hover:text-gray-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
