import SiteShell from "@/components/site/SiteShell";
import { SITE } from "@/content/site";
export const metadata = { title: `Privacy Policy — ${SITE.product}` };
export default function Page() {
  return (
    <SiteShell title="Privacy Policy">
      <p>{SITE.seller} (“we”) operates {SITE.product} at {SITE.domain}. This policy explains what we collect and why.</p>
      <h2>What we collect</h2>
      <ul>
        <li><b>Google sign-in data:</b> your name and email address, provided when you sign in with Google.</li>
        <li><b>Profile details</b> you enter during onboarding.</li>
        <li><b>Progress data:</b> your rank, XP, completed tickets and certificates.</li>
        <li><b>Access data:</b> whether you have paid access or redeemed a code, and which code.</li>
        <li><b>Payment records:</b> payment reference and amount. Card, UPI and bank details are handled by our payment gateway and never reach our servers.</li>
      </ul>
      <p>The SQL you write runs in your own browser. We do not collect the queries you type.</p>
      <h2>How we use it</h2>
      <p>To run your account, save your progress, issue certificates, unlock paid ranks, provide support, and prevent abuse. We do not sell your personal data.</p>
      <h2>Who we share it with</h2>
      <p>Service providers who help us operate: Cloudflare (hosting and database), Google (sign-in), our payment gateway, and an email provider for access codes and support. Referral partners learn only whether a code they issued was redeemed, not your personal details.</p>
      <h2>Cookies and storage</h2>
      <p>We use a session cookie to keep you signed in, and your browser’s local storage to keep your game state.</p>
      <h2>Retention and your rights</h2>
      <p>We keep your data while your account is active. You may ask us to access, correct or delete your data by writing to <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>; we will respond within a reasonable time.</p>
      <h2>Security</h2>
      <p>Data is stored on Cloudflare infrastructure over encrypted connections. No system is perfectly secure, but we take reasonable steps to protect your data.</p>
      <h2>Contact</h2>
      <p>{SITE.seller}, {SITE.sellerAddress} · {SITE.phone} · <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a></p>
    </SiteShell>
  );
}
