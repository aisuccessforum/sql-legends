import SiteShell from "@/components/site/SiteShell";
import { SITE } from "@/content/site";
export const metadata = { title: `Contact us — ${SITE.product}` };
export default function Page() {
  return (
    <SiteShell title="Contact us">
      <p>We usually reply within 1–2 working days.</p>
      <ul>
        <li><b>Email:</b> <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a></li>
        <li><b>Phone:</b> {SITE.phone}</li>
        <li><b>Business name:</b> {SITE.seller}</li>
        <li><b>Address:</b> {SITE.sellerAddress}</li>
      </ul>
      <p>For payment issues, include your registered email and payment reference. For access codes, contact the partner who gave you the code or write to us.</p>
    </SiteShell>
  );
}
