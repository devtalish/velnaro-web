import {
  buildAlertHtml,
  buildAlertSubject,
  buildReplyHtml,
  type Submission,
} from "./email-template.ts";

const sample: Submission = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Ada Lovelace",
  email: "ada@example.com",
  budget: "$5k–$15k",
  message: "I would like to discuss a project.",
  created_at: "2026-11-10T12:00:00.000Z",
  ip_address: null,
  user_agent: "Test browser",
};

Deno.test("reply email uses readable contrast and escapes visitor content", () => {
  const html = buildReplyHtml({ ...sample, message: "<script>alert(1)</script>" }, "VELNARO", "https://velnaro.agency");
  if (!html.includes("color:#171B1F;font-size:22px")) throw new Error("Reply heading must be readable on white.");
  if (!html.includes("&lt;script&gt;alert(1)&lt;/script&gt;")) throw new Error("Visitor message must be HTML-escaped.");
  if (html.includes("<script>alert(1)</script>")) throw new Error("Untrusted HTML must never be rendered.");
});

Deno.test("owner alert email escapes visitor name and keeps readable heading contrast", () => {
  const html = buildAlertHtml({ ...sample, name: "<img src=x onerror=alert(1)>" });
  if (!html.includes("color:#171B1F;font-size:22px")) throw new Error("Alert heading must be readable on white.");
  if (!html.includes("&lt;img src=x onerror=alert(1)&gt;")) throw new Error("Visitor name must be HTML-escaped.");
});

Deno.test("owner alert subject strips CR/LF header injection", () => {
  const subject = buildAlertSubject({ ...sample, name: "Ada\r\nBcc: attacker@example.com" });
  if (subject.includes("\r") || subject.includes("\n")) throw new Error("Subject must not contain line breaks.");
  if (!subject.includes("Ada Bcc: attacker@example.com")) throw new Error("Sanitized subject should retain readable text.");
});
