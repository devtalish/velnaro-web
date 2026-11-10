import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense, type FC } from "react";
import { HERO_NAME } from "@/constants/portfolio-constants";
import { getAdminState } from "@/lib/admin/auth";
import { SetupNotice } from "@/components/admin/setup-notice";
import {
  ADMIN_LOGIN_DESCRIPTION,
  ADMIN_LOGIN_TITLE,
} from "@/constants/seo-constants";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: ADMIN_LOGIN_TITLE,
  description: ADMIN_LOGIN_DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: `${ADMIN_LOGIN_TITLE} · ${HERO_NAME}`,
    description: ADMIN_LOGIN_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: `${ADMIN_LOGIN_TITLE} · ${HERO_NAME}`,
    description: ADMIN_LOGIN_DESCRIPTION,
  },
};

const AdminLoginPage: FC = async () => {
  const state = await getAdminState();

  if (state.status === "admin") redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-deep-teal to-slate text-lg font-black text-white">
            VN
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-graphite">
            Admin sign in
          </h1>
          <p className="mt-1 text-sm text-muted">
            Contact submissions for {HERO_NAME}
          </p>
        </div>

        <div className="glass gradient-border p-6">
          {state.status === "not-configured" ? (
            <SetupNotice />
          ) : state.status === "schema-missing" ? (
            <SetupNotice variant="no-schema" />
          ) : (
            <Suspense
              fallback={
                <div className="h-64 animate-pulse rounded-lg bg-white/5" />
              }
            >
              <LoginForm />
            </Suspense>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Protected area · secured by Supabase Auth
        </p>
      </div>
    </main>
  );
};

export default AdminLoginPage;
