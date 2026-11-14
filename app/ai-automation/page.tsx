import { type Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

const DESCRIPTION =
  "VELNARO designs and implements AI-powered automations, agents and system integrations that reduce manual work, improve response times and help teams operate more efficiently.";

import { AutomationHero } from "@/components/ai-automation/automation-hero";
import { WorkflowCanvas } from "@/components/ai-automation/workflow-canvas";
import { ManualVsAutomated } from "@/components/ai-automation/manual-vs-automated";
import { AutomationArchitecture } from "@/components/ai-automation/automation-architecture";
import { AutomationUseCase } from "@/components/ai-automation/automation-use-case";
import { AutomationTimeline } from "@/components/ai-automation/automation-timeline";
import { AutomationFAQ } from "@/components/ai-automation/automation-faq";
import { ResponsibleAutomation } from "@/components/ai-automation/responsible-automation";
import { ServiceCta } from "@/components/services/service-cta";

type UseCase = {
  id: number;
  title: string;
  manualProblem: string;
  automatedWorkflow: string;
  improvement: string;
  visualAlt: string;
};

const AUTOMATION_USE_CASES: UseCase[] = [
  {
    id: 1,
    title: "Lead Capture and Follow-up",
    manualProblem:
      "Teams manually collect form submissions and spend hours on follow-up emails, often missing leads.",
    automatedWorkflow:
      "Form submission triggers automated capture, AI-powered lead scoring, and assignment to the right sales representative with immediate follow-up email.",
    improvement:
      "Leads are captured and assigned 24/7 without manual data entry, reducing response time from hours to minutes.",
    visualAlt: "Lead capture workflow",
  },
  {
    id: 2,
    title: "Data Processing and Administration",
    manualProblem:
      "Staff spend days each month entering data into spreadsheets and multiple systems, prone to errors and inconsistencies.",
    automatedWorkflow:
      "Documents are automatically parsed, data is extracted and synchronized across CRM, ERP, and accounting systems without manual entry.",
    improvement:
      "Data processing completes in hours instead of days, with significantly reduced error rates and no duplicate entries.",
    visualAlt: "Data processing workflow",
  },
];

const IMPLEMENTATION_PROCESS = [
  {
    id: 1,
    title: "Discovery",
    description:
      "Understanding your processes, pain points, and goals through workshops and analysis.",
  },
  {
    id: 2,
    title: "Mapping",
    description:
      "Documenting the current state and designing the automated workflow with stakeholder input.",
  },
  {
    id: 3,
    title: "Design",
    description:
      "Building the automation, AI components, and system integrations to the planned specification.",
  },
  {
    id: 4,
    title: "Integration",
    description:
      "Connecting the automation to your existing systems and configuring data flows between tools.",
  },
  {
    id: 5,
    title: "Monitor and improve",
    description:
      "Ongoing support, updates, and optimization as your business evolves, with regular health checks.",
  },
];

const RELIABILITY_CONTROL = [
  "Human approvals required for critical actions",
  "Error handling with fallback paths and alerts",
  "Complete workflow logging for audit and troubleshooting",
  "Monitoring and alerting for automation health",
  "Data access controls and permission management",
  "Regular testing and validation of automated paths",
  "Documentation of workflows and system integrations",
  "Maintenance arrangements for ongoing reliability",
];

export const metadata: Metadata = {
  title: {
    absolute: `${"AI Automation & Business Systems"} | ${SITE_NAME}`,
  },
  description:
    "VELNARO designs and implements AI-powered automations, agents and system integrations that reduce manual work, improve response times and help teams operate more efficiently.",
  alternates: {
    canonical: "/ai-automation",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/ai-automation"),
    siteName: SITE_NAME,
    title: `${"AI Automation & Business Systems"} | ${SITE_NAME}`,
    description: DESCRIPTION,
    locale: OG_LOCALE,
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${"AI Automation & Business Systems"} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
};

export default function AIAutomation() {
  return (
    <>
      <Navbar />
      <section id="ai-automation" className="c-space relative overflow-visible">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
      </div>

      <AutomationHero
        eyebrow="AI AUTOMATION"
        headline="Less manual work. More connected operations."
        subtitle="
          VELNARO helps businesses automate repetitive workflows, connect systems and use AI where it creates practical value. We focus on solutions that are reliable, maintainable and deliver real operational improvement.
        "
        primaryCtaText="Explore Automation Opportunities"
        primaryCtaHref="#contact"
        secondaryCtaText="View Related Work"
        secondaryCtaHref="/#work"
      />

      <ManualVsAutomated
        title="From manual process to connected workflow"
        manualSteps={[
          { title: "A person receives an enquiry and copies information manually", description: "" },
          { title: "Updates several systems individually with the same data", description: "" },
          { title: "Sends separate notifications to different teams or stakeholders", description: "" },
          { title: "Follows up manually, often inconsistently or not at all", description: "" },
        ]}
        automatedSteps={[
          { title: "Enquiry received and automatically captured in the system", description: "" },
          { title: "Data processed and validated by rules engine", description: "" },
          { title: "Systems updated automatically with correct data", description: "" },
          { title: "Follow-up initiated through the right channel at the right time", description: "" },
        ]}
      />

      <WorkflowCanvas
        title="Where automation helps"
        description="
          Practical business scenarios where automation creates measurable operational improvement.
        "
        nodes={[
          { id: "1", title: "Lead Capture", description: "Form submissions captured automatically" },
          { id: "2", title: "Scoring", description: "AI scores lead quality and relevance" },
          { id: "3", title: "Assignment", description: "Lead assigned to appropriate representative" },
          { id: "4", title: "Follow-up", description: "Automated email sequence begins immediately" },
        ]}
        connections={[
          { from: "1", to: "2", label: "score" },
          { from: "2", to: "3", label: "assign" },
          { from: "3", to: "4", label: "trigger" },
        ]}
      />

      <AutomationArchitecture
        title="How connected automation works"
        description="
          The layers of a modern automation system, from trigger to human review.
        "
        layers={[
          { name: "Trigger", description: "Event or signal that starts the workflow" },
          { name: "Data and context", description: "Information gathered and enriched at startup" },
          { name: "Business logic", description: "Rules and decision paths that govern processing" },
          { name: "AI processing", description: "Where appropriate, AI augments decision-making" },
          { name: "Connected applications", description: "Systems that receive and act on processed data" },
          { name: "Human review and monitoring", description: "Oversee the system and intervene when needed" },
        ]}
      />

      <AutomationUseCase useses={AUTOMATION_USE_CASES} />

      <AutomationTimeline steps={IMPLEMENTATION_PROCESS} />

      <AutomationFAQ
        title="FAQ"
        items={[
          {
            question: "Which processes can be automated?",
            answer:
              "Repetitive, rules-based processes such as data entry, lead routing, scheduling, and report generation are ideal for automation. Processes involving AI can handle more complex scenarios like document understanding and customer intent.",
          },
          {
            question: "Can existing business tools be connected?",
            answer:
              "Yes. VELNARO specializes in connecting CRM, ERP, email, scheduling, support platforms, and custom internal tools through APIs and middleware.",
          },
          {
            question: "Where should AI be used and where should ordinary automation be used?",
            answer:
              "AI is used where it adds meaningful value such as understanding unstructured data or predicting outcomes. Ordinary automation is preferred for reliable, repeatable rules-based tasks where it is more economical and more predictable.",
          },
          {
            question: "Can human approvals remain in the workflow?",
            answer:
              "Yes. Human approvals can be built in at critical decision points. VELNARO designs workflows that balance automation efficiency with appropriate human oversight.",
          },
        ]}
      />

      <ResponsibleAutomation
        title="Responsible automation"
        items={RELIABILITY_CONTROL}
      />

      <ServiceCta
        headline="Let's identify the work your business should no longer do manually."
        subtitle="
          Tell us about the processes that consume your team's time. We'll help you scope an automation solution that delivers real operational improvement.
        "
        primaryCtaText="Discuss an Automation Project"
        primaryCtaHref="#contact"
        secondaryCtaText=""
        secondaryCtaHref=""
      />
      </section>
      <Footer />
    </>
  );
}