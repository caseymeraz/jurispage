import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Dashboard | JurisPage",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  let isAuthenticated = false;

  if (adminPassword) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const expectedToken = createHash("sha256")
      .update(adminPassword)
      .digest("hex");
    isAuthenticated = token === expectedToken;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-report-layout>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 font-heading">
            JurisPage Admin
          </h1>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to site
          </a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {isAuthenticated ? children : <LoginForm />}
      </main>
    </div>
  );
}
