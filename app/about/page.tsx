import SiteShell from "@/components/site/SiteShell";
import { SITE, CURRICULUM } from "@/content/site";
export const metadata = { title: `About us — ${SITE.product}` };
export default function Page() {
  const total = CURRICULUM.reduce((a, r) => a + r.tickets, 0);
  return (
    <SiteShell title="About us">
      <p>{SITE.product} is a hands-on SQL learning simulation built by {SITE.seller}, part of the AI Success Forum ecosystem.</p>
      <p>You join {SITE.brand}, a fictional AI consulting firm, as an Intern. Each “ticket” is a realistic client request: you read the brief, write SQL against the client’s data in your browser, and get instant feedback. Complete tickets, earn XP, and get promoted through {CURRICULUM.length} career ranks — {total} tickets in all — ending with a certificate.</p>
      <h2>Why we built it</h2>
      <p>Most SQL courses teach syntax with toy examples. We wanted learners to practise the way analysts actually work: ambiguous requests, messy data and real business questions, with no fluff.</p>
      <h2>Who we are</h2>
      <p>{SITE.seller}, {SITE.sellerAddress}. Questions? Visit our <a href="/contact">contact page</a>.</p>
    </SiteShell>
  );
}
