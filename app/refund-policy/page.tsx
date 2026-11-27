"use client";

import {
  LegalPageTemplate,
  type LegalSectionItem,
} from "@/components/home/LegalPageTemplate";

const TAPE_ITEMS = [
  "Refund Guidelines",
  "24-Hour Window",
  "Membership Fees",
  "Event Registrations",
  "Postponements",
  "Support",
];

const REFUND_SECTIONS: LegalSectionItem[] = [
  {
    id: "section1",
    number: "01",
    title: "GENERAL PRINCIPLES",
    content: (
      <>
        <p>
          All fees and payments made to Dot Com Club are intended to cover costs
          related to organizing events, providing services, maintaining club
          operations, and supporting our educational initiatives. We strive to
          be transparent about our fees and refund policies to ensure that all
          parties understand the terms before making any payments.
        </p>
        <p>
          All refund requests are evaluated on a case-by-case basis, taking into
          consideration the circumstances, timing of the request, and the
          specific nature of the service or event for which payment was made.
        </p>
        <p>
          <strong>Please note:</strong> All refund decisions made by Dot Com
          Club management are final. We reserve the right to modify this Refund
          Policy at any time. Any changes will be effective immediately upon
          posting the revised policy on our website.
        </p>
      </>
    ),
  },
  {
    id: "section2",
    number: "02",
    title: "CLUB MEMBERSHIP FEES",
    content: (
      <>
        <h3>Non-Refundable Membership</h3>
        <p>
          <strong>Club membership registration fees are non-refundable.</strong>{" "}
          When you register as a member of Dot Com Club, you gain immediate
          access to our resources, community, and benefits. As these benefits
          begin immediately upon registration, we cannot offer refunds for
          membership fees.
        </p>

        <h3>Exceptions</h3>
        <p>In extraordinary circumstances, such as:</p>
        <ul>
          <li>Technical errors resulting in duplicate payments</li>
          <li>
            Club dissolution or significant changes to membership benefits
            before the membership period begins
          </li>
        </ul>
        <p>
          In these rare cases, please contact us within 7 days of payment to
          request consideration for a refund. Each request will be reviewed
          individually by our management team.
        </p>
      </>
    ),
  },
  {
    id: "section3",
    number: "03",
    title: "EVENT REGISTRATION FEES",
    content: (
      <>
        <h3>24-Hour Refund Window</h3>
        <p>
          For most events organized by Dot Com Club, we offer a 24-hour refund
          window from the time of registration. If you cancel your registration
          within 24 hours of payment, you will receive a full refund minus any
          transaction fees that may have been incurred.
        </p>

        <h3>Late Cancellations</h3>
        <p>For cancellations made after the 24-hour:</p>
        <ul>
          <li>No refund will be provided</li>
        </ul>

        <h3>Event Cancellation By Dot Com Club</h3>
        <p>
          If an event is canceled by Dot Com Club, all registered participants
          will receive a full refund of their registration fees.
        </p>

        <h3>Event Postponement</h3>
        <p>
          If an event is postponed, registrations will automatically be
          transferred to the new date. If you cannot attend on the new date,
          please contact us within 7 days of the postponement announcement to
          request a refund.
        </p>
      </>
    ),
  },
  {
    id: "section4",
    number: "04",
    title: "HOW TO REQUEST A REFUND",
    content: (
      <>
        <p>To request a refund, please follow these steps:</p>
        <ol className="list-decimal">
          <li>
            Send an email to{" "}
            <a href="mailto:jhcdotcomclub.offical@gmail.com">
              jhcdotcomclub.offical@gmail.com
            </a>{" "}
            with the subject line &quot;Refund Request&quot;
          </li>
          <li>
            Include your full name, the email address used for registration or
            purchase
          </li>
          <li>
            Provide details about what you&apos;re requesting a refund for
            (event name, membership type, merchandise, etc.)
          </li>
          <li>Explain the reason for your refund request</li>
          <li>Include proof of payment (transaction ID, receipt, etc.)</li>
        </ol>
        <p>
          We aim to process all refund requests within 7 business days of
          receiving a complete request. Approved refunds will be issued using
          the original payment method when possible. Please note that it may
          take 5-10 business days for the refund to appear in your account,
          depending on your payment provider.
        </p>
      </>
    ),
  },
  {
    id: "section5",
    number: "05",
    title: "CONTACT US",
    content: (
      <>
        <p>
          If you have any questions about our Refund Policy, please contact us:
        </p>
        <div className="mt-4 space-y-1 text-[var(--tx)]">
          <p className="font-bold text-white">Dot Com Club</p>
          <p>Jai Hind College</p>
          <p>A-Road, Churchgate</p>
          <p>Mumbai, Maharashtra 400020</p>
          <p>India</p>
          <p className="pt-2">
            Email:{" "}
            <a href="mailto:jhcdotcomclub.offical@gmail.com">
              jhcdotcomclub.offical@gmail.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function RefundPolicy() {
  return (
    <LegalPageTemplate
      badgeId="refund-cp"
      heroLine1="Refund"
      heroLine2="Policy"
      heroLabel="Refund Policy"
      lastUpdated="June 21, 2026"
      heroDescription="Guidelines and procedures for refunds related to Dot Com Club services, events, and club memberships."
      marqueeItems={TAPE_ITEMS}
      introBanner={
        <p>
          This Refund Policy outlines the guidelines and procedures for refunds
          related to services, events, and club memberships provided by Dot Com
          Club (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By making
          a payment for any of our services, events, or memberships, you agree
          to the terms outlined in this Refund Policy.
        </p>
      }
      sections={REFUND_SECTIONS}
      bodyHeading="Refund Clauses"
      closingText="Thank you for reviewing our Refund Policy. Review our terms and privacy notice or head back to the homepage."
      relatedLinks={[
        {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
          variant: "wh",
        },
        { label: "Privacy Policy", href: "/privacy-policy", variant: "ol" },
      ]}
    />
  );
}
