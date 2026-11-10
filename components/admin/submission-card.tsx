import { type FC } from "react";
import { DeleteButton } from "@/app/admin/delete-button";
import { formatDateTime } from "@/helpers/format-helpers";
import { type SubmissionCardProps } from "@/types/admin-types";

export const SubmissionCard: FC<SubmissionCardProps> = ({ row }) => (
  <article className="glass gradient-border p-5 text-graphite">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold text-graphite">{row.name}</h3>
        <a href={`mailto:${row.email}`} className="break-all text-sm text-deep-teal hover:underline">{row.email}</a>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {row.budget && <span className="rounded-full border border-slate/20 bg-white px-3 py-1 text-xs text-slate">{row.budget}</span>}
        <time dateTime={row.created_at} className="whitespace-nowrap text-xs text-muted">{formatDateTime(row.created_at)}</time>
      </div>
    </header>
    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate">{row.message}</p>
    {(row.owner_email_sent === false || (row.owner_email_sent == null && row.email_sent === false)) && (
      <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800">
        Owner notification failed{row.owner_email_error ?? row.email_error ? `: ${row.owner_email_error ?? row.email_error}` : "."}
      </p>
    )}
    {row.acknowledgement_email_sent === false && (
      <p className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        Visitor acknowledgement failed{row.acknowledgement_email_error ? `: ${row.acknowledgement_email_error}` : "."}
      </p>
    )}
    <details className="mt-4">
      <summary className="cursor-pointer list-none text-xs uppercase tracking-[0.2em] text-muted hover:text-graphite">Metadata</summary>
      <dl className="mt-3 grid gap-2 text-xs text-slate sm:grid-cols-[7rem_1fr]">
        <dt className="text-muted">Network address</dt><dd>Not retained; a keyed fingerprint is used for rate limiting.</dd>
        <dt className="text-muted">User agent</dt><dd className="break-all">{row.user_agent ?? "N/A"}</dd>
        <dt className="text-muted">Submission ID</dt><dd className="break-all font-mono">{row.id}</dd>
      </dl>
    </details>
    <footer className="mt-4 flex justify-end border-t border-slate/10 pt-3"><DeleteButton id={row.id} name={row.name} /></footer>
  </article>
);
