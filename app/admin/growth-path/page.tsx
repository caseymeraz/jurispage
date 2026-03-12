"use client";

import { useState, useEffect, useCallback } from "react";

interface SessionRow {
  id: string;
  status: string;
  flowType: string;
  city: string | null;
  state: string | null;
  practiceArea: string | null;
  website: string | null;
  brandRoute: string;
  overriddenPath: string | null;
  reviewedBy: string | null;
  createdAt: string;
  lead: {
    email: string;
    firmName: string | null;
    phone: string | null;
  };
  recommendation: {
    primaryPath: string;
    brandRoute: string;
  } | null;
}

const PATH_OPTIONS = [
  { value: "starting_from_zero", label: "Starting From Zero" },
  { value: "get_cases", label: "Get Cases In The Door" },
  { value: "fix_broken", label: "Fix What's Broken First" },
  { value: "visitors_to_calls", label: "Turn More Visitors Into Calls" },
  { value: "win_local", label: "Win More Local Searches" },
  { value: "improve_leads", label: "Improve Lead Quality" },
  { value: "dominant_position", label: "Build a Dominant Market Position" },
];

export default function GrowthPathAdminPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", brandRoute: "" });

  const fetchSessions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status) params.set("status", filter.status);
      if (filter.brandRoute) params.set("brandRoute", filter.brandRoute);

      const res = await fetch(`/api/admin/growth-path?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, [filter.status, filter.brandRoute]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  async function handleAction(
    sessionId: string,
    action: "approve" | "flag" | "override",
    overriddenPath?: string
  ) {
    try {
      await fetch(`/api/growth-path/review/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          reviewedBy: "admin",
          overriddenPath,
        }),
      });
      fetchSessions();
    } catch (err) {
      console.error("Action failed:", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Growth Path Sessions
          </h1>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Growth Path Sessions
        </h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={filter.status}
            onChange={(e) => setFilter((p) => ({ ...p, status: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="intake">Intake</option>
            <option value="scanning">Scanning</option>
            <option value="scoring">Scoring</option>
            <option value="report_ready">Report Ready</option>
            <option value="reviewed">Reviewed</option>
          </select>
          <select
            value={filter.brandRoute}
            onChange={(e) => setFilter((p) => ({ ...p, brandRoute: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All brand routes</option>
            <option value="jurispage">JurisPage</option>
            <option value="juris_digital">Juris Digital</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Firm
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Market
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Path
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Route
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Created
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {s.lead.firmName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{s.lead.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.city}, {s.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.status === "report_ready"
                            ? "bg-green-100 text-green-700"
                            : s.status === "reviewed"
                              ? "bg-blue-100 text-blue-700"
                              : s.status === "scanning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.overriddenPath ||
                        s.recommendation?.primaryPath ||
                        "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.recommendation?.brandRoute || s.brandRoute}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/growth-path/report/${s.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium underline"
                          style={{ color: "#EE6C13" }}
                        >
                          View
                        </a>
                        {s.status === "report_ready" && (
                          <>
                            <button
                              onClick={() => handleAction(s.id, "approve")}
                              className="text-xs font-medium text-green-600 hover:underline"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(s.id, "flag")}
                              className="text-xs font-medium text-red-600 hover:underline"
                            >
                              Flag
                            </button>
                            <select
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleAction(s.id, "override", e.target.value);
                                  e.target.value = "";
                                }
                              }}
                              className="text-xs border border-gray-200 rounded px-1 py-0.5"
                              defaultValue=""
                            >
                              <option value="">Override...</option>
                              {PATH_OPTIONS.map((p) => (
                                <option key={p.value} value={p.value}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
