import SiteShell from "@/components/site/SiteShell";
import { SITE, PAID_RANK_COUNT } from "@/content/site";
export const metadata = { title: `Terms & Conditions — ${SITE.product}` };
export default function Page() {
  return (
    <SiteShell title="Terms & Conditions">
      <p>These terms govern your use of {SITE.product} at {SITE.domain} (the “Service”), operated by {SITE.seller} (“we”, “us”). By signing in you agree to them.</p>
      <h2>1. The Service</h2>
      <p>{SITE.product} is an online SQL learning simulation set in a fictional company, {SITE.brand}. It contains client-style tickets that you solve by writing SQL in your browser. It is educational content; it is not professional, employment, financial or legal advice, and the company, clients and people shown are fictional.</p>
      <h2>2. Accounts</h2>
      <p>You sign in with Google. You are responsible for activity under your account and must provide accurate information. One account per person; sharing accounts or access codes is not permitted.</p>
      <h2>3. Free and paid access</h2>
      <ul>
        <li>The Intern rank is free.</li>
        <li>The remaining {PAID_RANK_COUNT} ranks require a one-time payment of ₹{SITE.priceInr.toLocaleString("en-IN")} (no GST charged) or a valid access code.</li>
        <li>Access codes are issued by us or our referral partners, are single-account, and may have a usage limit or expiry date. We may deactivate codes that are abused, resold or shared.</li>
        <li>Access is for your personal learning for as long as the Service operates.</li>
      </ul>
      <h2>4. Payments</h2>
      <p>Payments are processed by a third-party payment gateway. We do not store your card, UPI or bank details. Prices are in Indian rupees and are inclusive of all charges we apply. See our <a href="/refund">Refund Policy</a>.</p>
      <h2>5. Certificates</h2>
      <p>Certificates issued by the Service confirm completion of the simulation’s tickets. They are not accredited qualifications.</p>
      <h2>6. Acceptable use</h2>
      <p>You must not attempt to disrupt or reverse-engineer the Service, bypass access controls, scrape or redistribute the content, or use automated tools to complete tickets.</p>
      <h2>7. Intellectual property</h2>
      <p>The content, design and tickets are owned by {SITE.seller}. You receive a personal, non-transferable licence to use them for learning.</p>
      <h2>8. Disclaimer and liability</h2>
      <p>The Service is provided “as is”. We do not guarantee uninterrupted availability or that using it will lead to a particular job or result. To the extent permitted by law, our total liability is limited to the amount you paid us in the 12 months before the claim.</p>
      <h2>9. Changes and termination</h2>
      <p>We may update the Service or these terms; continued use means you accept the changes. We may suspend accounts that breach these terms.</p>
      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at Thane, Maharashtra have jurisdiction.</p>
      <h2>11. Contact</h2>
      <p>{SITE.seller}, {SITE.sellerAddress}. Email: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.</p>
    </SiteShell>
  );
}
