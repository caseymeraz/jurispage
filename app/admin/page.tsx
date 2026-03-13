import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  teaser_ready: "bg-blue-100 text-blue-800",
  full_report_ready: "bg-green-100 text-green-800",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  contact: "bg-blue-100 text-blue-800",
  "growth-assessment": "bg-purple-100 text-purple-800",
  "market-report": "bg-orange-100 text-orange-800",
  "ghost-lead": "bg-red-100 text-red-800",
  quote: "bg-green-100 text-green-800",
  scorecard: "bg-teal-100 text-teal-800",
};

function summarizeData(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case "contact":
      return [data.practiceArea, data.budget].filter(Boolean).join(" | ");
    case "growth-assessment":
      return [data.attorneys && `${data.attorneys} attorneys`, data.budget].filter(Boolean).join(" | ");
    case "market-report":
      return [data.practiceArea, data.targetMarket].filter(Boolean).join(" in ");
    case "ghost-lead":
      return data.monthlyBleed ? `$${Number(data.monthlyBleed).toLocaleString()}/mo bleed` : "";
    case "quote":
      return [
        data.practiceArea,
        data.isCustom ? "Custom" : data.monthlyTotal ? `$${Number(data.monthlyTotal).toLocaleString()}/mo` : "",
      ].filter(Boolean).join(" | ");
    case "scorecard":
      return data.score ? `${data.score}/100 (${data.grade})` : "";
    default:
      return "";
  }
}

export default async function AdminPage() {
  let reports: Awaited<ReturnType<typeof prisma.marketGapReport.findMany<{ include: { lead: true } }>>> = [];
  let aiReports: Awaited<ReturnType<typeof prisma.aiSearchReport.findMany<{ include: { lead: true } }>>> = [];
  let formSubmissions: Awaited<ReturnType<typeof prisma.formSubmission.findMany>> = [];
  let quotes: Awaited<ReturnType<typeof prisma.launchpadQuote.findMany>> = [];

  try {
    [reports, aiReports] = await Promise.all([
      prisma.marketGapReport.findMany({
        orderBy: { createdAt: "desc" },
        include: { lead: true },
      }),
      prisma.aiSearchReport.findMany({
        orderBy: { createdAt: "desc" },
        include: { lead: true },
      }),
    ]);
  } catch {
    // DB may be unreachable or tables may not exist yet
  }

  try {
    [formSubmissions, quotes] = await Promise.all([
      prisma.formSubmission.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.launchpadQuote.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);
  } catch {
    // Tables may not exist yet
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          Market Gap Reports
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {reports.length} total submission{reports.length !== 1 ? "s" : ""}
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Firm Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Practice Area
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Market
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {report.lead.email}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {report.lead.firmName || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {report.practiceArea}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {report.city}, {report.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          STATUS_STYLES[report.status] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {report.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/market-gap/report/${report.accessToken}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#EE6C13] hover:text-[#982A0B] font-medium transition-colors"
                      >
                        View →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Launchpad Quotes ─────────────────────────────────────────── */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          Launchpad Quotes
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {quotes.length} total quote{quotes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No quotes yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Practice Area</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Attorneys</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">City Size</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Monthly</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Add-ons</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(q.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{q.name}</td>
                    <td className="px-4 py-3 text-gray-700">{q.email}</td>
                    <td className="px-4 py-3 text-gray-700">{q.practiceArea}</td>
                    <td className="px-4 py-3 text-gray-700">{q.attorneys}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{q.citySize}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {q.monthlyTotal != null
                        ? `$${q.monthlyTotal.toLocaleString()}/mo`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {[q.addonChatbot && "Chatbot", q.addonLogo && "Logo"]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          q.isCustom
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {q.isCustom ? "custom" : "standard"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── AI Search Reports ────────────────────────────────────────── */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          AI Search Reports
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {aiReports.length} total submission{aiReports.length !== 1 ? "s" : ""}
        </p>
      </div>

      {aiReports.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No AI search submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Firm Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Website
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Practice Area
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Market
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    AI Visibility
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {aiReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {report.lead.email}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {report.lead.firmName || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {report.firmDomain || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {report.practiceArea}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {report.city}, {report.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.queriesFound > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {report.queriesFound} / {report.queriesRun} queries
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── All Form Submissions ─────────────────────────────────────── */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          All Form Submissions
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {formSubmissions.length} total submission{formSubmissions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {formSubmissions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No form submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Phone</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Firm</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(sub.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          TYPE_BADGE_STYLES[sub.type] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sub.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{sub.name}</td>
                    <td className="px-4 py-3 text-gray-700">{sub.email}</td>
                    <td className="px-4 py-3 text-gray-700">{sub.phone || "—"}</td>
                    <td className="px-4 py-3 text-gray-700">{sub.firmName || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {summarizeData(sub.type, sub.data as Record<string, unknown>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
