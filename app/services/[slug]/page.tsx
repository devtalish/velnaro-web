import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { SITE_NAME, SITE_URL } from "@/constants/seo-constants";

type ServicePage = {
  title: string;
  h1: string;
  description: string;
  intro: string;
  deliverables: string[];
  fit: string[];
  faqs: Array<{ question: string; answer: string }>;
};

const SERVICES: Record<string, ServicePage> = {
  "geo-aeo-ai-search-visibility": {
    title: "GEO & AEO — AI Search Visibility",
    h1: "Make your expertise easier to discover and understand.",
    description: "VELNARO's flagship GEO and AEO service combines technical SEO, entity clarity, structured data, answer-led content and measurement for traditional and AI-assisted search.",
    intro: "Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) improve the technical accessibility, clarity and usefulness of a business's public information. VELNARO audits the foundations, prioritizes practical improvements and measures available search and citation signals without promising rankings or AI recommendations.",
    deliverables: ["Technical crawlability and indexation review", "Information architecture and internal-link recommendations", "Entity and brand fact consistency review", "JSON-LD structured data aligned with visible content", "Answer-led content briefs and page improvements", "Search and AI visibility measurement plan"],
    fit: ["B2B SaaS and technology companies", "Private healthcare and dental practices", "International NGOs and non-profits", "Boutique law firms and specialist service providers"],
    faqs: [
      { question: "What is included in a GEO/AEO engagement?", answer: "Scope can include technical SEO, crawl and indexation checks, entity clarity, structured data, content structure, answer-led pages and measurement. The exact deliverables depend on the selected engagement and written proposal." },
      { question: "Can VELNARO guarantee AI citations or first-page rankings?", answer: "No. Search rankings, AI citations and recommendations are controlled by third-party systems. VELNARO delivers agreed technical and content work and reports available measurements." },
      { question: "Does this replace SEO?", answer: "No. GEO and AEO build on sound SEO foundations such as crawlability, indexation, useful content, site architecture and clear page metadata." }
    ]
  },
  "ai-automation-business-systems": {
    title: "AI Automation & Business Systems",
    h1: "Connect the workflows that keep your business moving.",
    description: "VELNARO designs AI-assisted workflows, CRM and lead-management automation, document processing and integrations for business operations.",
    intro: "AI automation combines reliable workflow rules, connected applications and carefully selected AI capabilities to reduce repetitive handoffs. VELNARO starts by understanding the process, data permissions and failure cases, then designs a maintainable workflow with appropriate human review.",
    deliverables: ["Workflow and process discovery", "CRM and lead capture automation", "Document and data processing", "API and application integrations", "RAG knowledge assistants where appropriate", "Human approvals, exception handling and monitoring"],
    fit: ["Teams handling high enquiry volumes", "Organizations processing recurring documents", "Service firms coordinating leads and follow-ups", "NGOs managing information and administrative workflows"],
    faqs: [
      { question: "Should every workflow use AI?", answer: "No. Predictable, rules-based work is often better handled by conventional automation. AI is considered where it adds value, such as interpreting unstructured documents or natural-language requests." },
      { question: "Can a human approve important actions?", answer: "Yes. Approval gates and escalation paths can be included for sensitive, high-impact or uncertain decisions." },
      { question: "Can existing software be integrated?", answer: "Potentially. Integration feasibility depends on available APIs, permissions, data quality and vendor limitations, which are assessed during discovery." }
    ]
  },
  "custom-software-web-development": {
    title: "Custom Software & Web Development",
    h1: "Digital products designed around your operations.",
    description: "VELNARO builds high-performance websites, custom web applications, business dashboards, internal tools and API integrations.",
    intro: "Custom software is useful when off-the-shelf tools do not fit a business process or when several disconnected tools create operational friction. VELNARO scopes the problem, user needs, data model and integration constraints before selecting an implementation approach.",
    deliverables: ["High-performance business websites", "Custom web applications and portals", "Business dashboards and internal tools", "API integrations and workflow connections", "Responsive interface implementation", "Testing, validation and delivery documentation"],
    fit: ["B2B companies with specialized workflows", "SaaS teams building product features", "Service businesses needing operational tools", "Organizations replacing manual spreadsheet processes"],
    faqs: [
      { question: "Can VELNARO improve an existing application?", answer: "Yes, subject to access, code quality, dependencies and the existing system's constraints. Discovery identifies whether a targeted improvement or larger rebuild is appropriate." },
      { question: "What is the project timeline?", answer: "Timing depends on requirements, integrations, design complexity, data migration and review cycles. A timeline is confirmed after scope discovery." },
      { question: "Do you provide hosting and ongoing support?", answer: "Hosting, maintenance and support are discussed as separate project requirements and included only when agreed in the proposal." }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  const canonical = `/services/${slug}`;
  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.description,
    alternates: { canonical },
    openGraph: { type: "website", url: `${SITE_URL}${canonical}`, title: `${service.title} | ${SITE_NAME}`, description: service.description, siteName: SITE_NAME },
    twitter: { card: "summary_large_image", title: `${service.title} | ${SITE_NAME}`, description: service.description }
  };
}

export default async function ServiceLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();
  const url = `${SITE_URL}/services/${slug}`;
  const geoOffers = slug === "geo-aeo-ai-search-visibility"
    ? [
        { name: "AI Search & GEO Diagnostic Audit", price: "850", billing: "one-time" },
        { name: "GEO Strategy & Entity Roadmap", price: "1650", billing: "one-time" },
        { name: "Complete GEO/AEO Technical Implementation Sprint", price: "2800", billing: "one-time" },
        { name: "Monthly GEO/AEO Growth Optimization Retainer", price: "2200", billing: "monthly" },
        { name: "Advanced Ongoing Authority Program", price: "4500", billing: "monthly" },
      ].map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        price: offer.price,
        priceCurrency: "USD",
        url,
        ...(offer.billing === "monthly"
          ? { priceSpecification: { "@type": "UnitPriceSpecification", price: offer.price, priceCurrency: "USD", unitText: "month" } }
          : {}),
        itemOffered: { "@type": "Service", name: offer.name, provider: { "@id": `${SITE_URL}/#organization` } },
      }))
    : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: ["Canada", "Australia", "United Kingdom", "Austria", "United States"],
        url,
        ...(geoOffers ? { offers: geoOffers } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` }, { "@type": "ListItem", position: 3, name: service.title, item: url }] }
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Navbar />
    <main className="min-h-screen bg-ivory text-graphite">
      <article className="c-space mx-auto max-w-7xl pb-24 pt-32">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/#services">Services</Link><span aria-hidden="true"> / </span><span>{service.title}</span></nav>
        <header className="max-w-4xl">
          <p className="text-eyebrow mb-5">VELNARO / SERVICE</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{service.h1}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">{service.intro}</p>
          <Link href="/#contact" className="btn-primary mt-9">Discuss this service</Link>
        </header>
        <section className="mt-20 grid gap-12 border-t border-slate/15 pt-12 md:grid-cols-2">
          <div><h2 className="text-2xl font-semibold">What the engagement can cover</h2><ul className="mt-6 space-y-4">{service.deliverables.map((item) => <li key={item} className="flex gap-3 text-muted"><span className="text-deep-teal">✓</span>{item}</li>)}</ul></div>
          <div><h2 className="text-2xl font-semibold">Who this can support</h2><ul className="mt-6 space-y-4">{service.fit.map((item) => <li key={item} className="rounded-xl border border-slate/15 bg-white/60 p-4">{item}</li>)}</ul></div>
        </section>
        <section className="mt-20 border-t border-slate/15 pt-12"><h2 className="text-3xl font-semibold">Frequently asked questions</h2><div className="mt-8 grid gap-8 md:grid-cols-2">{service.faqs.map((faq) => <div key={faq.question}><h3 className="text-lg font-semibold">{faq.question}</h3><p className="mt-3 leading-relaxed text-muted">{faq.answer}</p></div>)}</div></section>
        {slug === "geo-aeo-ai-search-visibility" && <section className="mt-20 border-t border-slate/15 pt-12"><h2 className="text-3xl font-semibold">Published GEO/AEO pricing anchors</h2><p className="mt-3 max-w-3xl text-muted">Prices are in USD. Final deliverables, scope, timelines, taxes and third-party costs are confirmed in a written proposal.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{[["AI Search & GEO Diagnostic Audit","$850"],["GEO Strategy & Entity Roadmap","$1,650"],["Complete GEO/AEO Technical Implementation Sprint","$2,800"],["Monthly GEO/AEO Growth Optimization Retainer","$2,200 / month"],["Advanced Ongoing Authority Program","$4,500 / month"]].map(([name,price]) => <div key={name} className="rounded-2xl border border-slate/15 bg-white/70 p-6"><h3 className="font-semibold">{name}</h3><p className="mt-3 text-2xl font-semibold text-deep-teal">{price} <span className="text-sm text-muted">USD</span></p></div>)}</div></section>}
        <section className="mt-20 rounded-3xl bg-graphite p-8 text-white md:p-12"><h2 className="text-3xl font-semibold">Discuss your requirements with VELNARO.</h2><p className="mt-4 max-w-2xl text-white/70">Share the business challenge, the systems involved and the outcome you want to achieve. A suitable scope can then be discussed.</p><Link href="/#contact" className="btn-primary mt-8">Contact VELNARO</Link></section>
      </article>
    </main>
    <Footer />
  </>;
}
