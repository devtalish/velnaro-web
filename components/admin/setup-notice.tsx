import { type FC } from "react";

interface SetupNoticeProps { variant?: "no-project" | "no-schema"; }

export const SetupNotice: FC<SetupNoticeProps> = ({ variant = "no-project" }) => (
  <div className="space-y-4 text-sm text-graphite">
    <div className="flex items-center gap-2">
      <span className="inline-block h-2 w-2 rounded-full bg-deep-teal" />
      <h2 className="font-semibold text-graphite">{variant === "no-schema" ? "Migrations not run yet" : "Database not connected"}</h2>
    </div>
    {variant === "no-schema" ? (
      <>
        <p className="text-muted">The Supabase project is connected, but it has no <code className="text-graphite">admin_users</code> table, so there is no way to say who is allowed in here.</p>
        <ol className="list-decimal space-y-2 pl-5 text-muted marker:text-muted">
          <li>Run <code className="text-graphite">supabase/migrations/0001_init.sql</code> and then <code className="text-graphite">0002_restrict_public_submission_columns.sql and 0003_secure_contact_intake_and_delivery_status.sql</code> in the SQL editor.</li>
          <li>Create the user in Supabase Authentication → Users, then grant access with <code className="text-graphite">select public.grant_admin(&apos;you@your.email&apos;);</code>.</li>
        </ol>
      </>
    ) : (
      <>
        <p className="text-muted">The contact form and this inbox need a Supabase project. The rest of the site runs fine without one.</p>
        <ol className="list-decimal space-y-2 pl-5 text-muted marker:text-muted">
          <li>Create a project at <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer noopener" className="text-deep-teal hover:underline">supabase.com</a>.</li>
          <li>Run all SQL migrations in <code className="text-graphite">supabase/migrations/</code> in numerical order.</li>
          <li>Set <code className="text-graphite">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-graphite">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and the server-only <code className="text-graphite">SUPABASE_SERVICE_ROLE_KEY</code>, then redeploy.</li>
        </ol>
      </>
    )}
    <p className="text-xs text-muted">Full walkthrough in <code>docs/admin.md</code>.</p>
  </div>
);
