import { prisma } from "@/lib/db";

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

export default async function AdminPage() {
  const reports = await prisma.marketGapReport.findMany({
    orderBy: { createdAt: "desc" },
    include: { lead: true },
  });

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
    </div>
  );
}
