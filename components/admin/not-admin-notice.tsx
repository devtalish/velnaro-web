import { type FC } from "react";
import { LogoutButton } from "@/app/admin/logout-button";

export const NotAdminNotice: FC<{ email: string }> = ({ email }) => (
  <div className="space-y-4 text-sm text-graphite">
    <h1 className="text-lg font-semibold text-graphite">Not an admin</h1>
    <p className="text-muted">You are signed in as <span className="text-graphite">{email}</span>, but that account is not on this project&apos;s admin list, so there is nothing here for it to show.</p>
    <p className="text-muted">Grant it access by running <code className="text-graphite">select public.grant_admin(&apos;{email}&apos;);</code> in the Supabase SQL editor.</p>
    <LogoutButton />
  </div>
);
