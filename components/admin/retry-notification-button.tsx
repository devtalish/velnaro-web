"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FC } from "react";
import { retryContactNotificationAction } from "@/app/admin/actions";

export const RetryNotificationButton: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const handleRetry = () => {
    setMessage(null);
    setFailed(false);
    startTransition(async () => {
      const result = await retryContactNotificationAction(id);
      setFailed(!result.ok);
      setMessage(result.ok ? "Email delivery completed." : result.error ?? "Email delivery could not be retried.");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleRetry}
        disabled={pending}
        className="rounded-full border border-deep-teal/30 bg-deep-teal/10 px-3 py-1 text-xs font-medium text-deep-teal transition-colors hover:bg-deep-teal/15 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Retrying…" : "Retry email delivery"}
      </button>
      {message && (
        <span role={failed ? "alert" : "status"} className={`text-xs ${failed ? "text-red-700" : "text-deep-teal"}`}>
          {message}
        </span>
      )}
    </div>
  );
};
