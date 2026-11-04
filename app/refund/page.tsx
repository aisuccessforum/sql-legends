import SiteShell from "@/components/site/SiteShell";
import { SITE } from "@/content/site";
export const metadata = { title: `Refund Policy — ${SITE.product}` };
export default function Page() {
  return (
    <SiteShell title="Refund Policy">
      <p>{SITE.product} is a digital product delivered instantly online; nothing is shipped.</p>
      <h2>Free access</h2>
      <p>The Intern rank is free, so you can try the Service before paying. Access codes are free of charge and are not refundable or exchangeable for cash.</p>
      <h2>Paid access</h2>
      <p>You may request a full refund within <b>7 days</b> of your payment, provided you have not completed more than <b>5 tickets</b> in the paid ranks. After that, payments are non-refundable because access is delivered immediately.</p>
      <h2>Payment problems</h2>
      <p>If you were charged but access was not unlocked, or you were charged twice, write to us and we will fix it or refund the extra payment in full.</p>
      <h2>How to request a refund</h2>
      <p>Email <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a> from your registered email address with your payment reference. Approved refunds are returned to the original payment method within 5–7 working days.</p>
    </SiteShell>
  );
}
