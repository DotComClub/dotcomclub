"use client";

import {
  LegalPageTemplate,
  type LegalSectionItem,
} from "@/components/home/LegalPageTemplate";

const TAPE_ITEMS = [
  "Data Protection",
  "User Rights",
  "Security",
  "Transparency",
  "Consent",
  "Privacy Notice",
];

const KEY_POINTS = [
  {
    q: "What personal information do we process?",
    a: "When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.",
  },
  {
    q: "Do we process any sensitive personal information?",
    a: 'Some of the information may be classified "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origin, sexual orientation, or religious beliefs. We will ask for your explicit consent to process this information.',
  },
  {
    q: "Do we collect any information from third parties?",
    a: "We may collect information from public databases, marketing partners, social media platforms, and other outside sources.",
  },
  {
    q: "How do we process your information?",
    a: "We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.",
  },
  {
    q: "In what situations and with which parties do we share personal information?",
    a: "We may share information in specific situations and with specific third parties.",
  },
  {
    q: "How do we keep your information safe?",
    a: "We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.",
  },
  {
    q: "What are your rights?",
    a: "Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.",
  },
  {
    q: "How do you exercise your rights?",
    a: (
      <>
        The easiest way to exercise your rights is by submitting a{" "}
        <a href="#section11">data subject access request</a>, or by contacting
        us. We will consider and act upon any request in accordance with
        applicable data protection laws.
      </>
    ),
  },
  {
    q: "Want to learn more about what we do with any information we collect?",
    a: (
      <>
        <a href="#legal-body">Review the Privacy Policy in full</a>.
      </>
    ),
  },
];

const PRIVACY_SECTIONS: LegalSectionItem[] = [
  {
    id: "section1",
    number: "01",
    title: "WHAT INFORMATION DO WE COLLECT?",
    content: (
      <>
        <h3>Personal information you disclose to us</h3>
        <p>
          <strong>In Short:</strong> We collect personal information that you
          provide to us.
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </p>

        <h3>Personal Information Provided by You</h3>
        <p>
          The personal information that we collect depends on the context of
          your interactions with us and the Services, the choices you make, and
          the products and features you use. The personal information we collect
          may include the following:
        </p>
        <ul>
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
          <li>mailing addresses</li>
          <li>usernames</li>
          <li>passwords</li>
          <li>billing addresses</li>
          <li>debit/credit card numbers</li>
        </ul>

        <h3>Sensitive Information</h3>
        <p>We do not process sensitive information.</p>

        <h3>Payment Data</h3>
        <p>
          We may collect data necessary to process your payment if you make
          purchases, such as your payment instrument number (such as a credit
          card number), and the security code associated with your payment
          instrument. All payment data is stored by our payment processor. You
          may find their privacy notice link(s) here:{" "}
          <a href="#section10">payment processor privacy policy</a>.
        </p>

        <h3>Information automatically collected</h3>
        <p>
          <strong>In Short:</strong> Some information — such as your Internet
          Protocol (IP) address and/or browser and device characteristics — is
          collected automatically when you visit our Services.
        </p>
        <p>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </p>
        <p>The information we collect includes:</p>
        <ul>
          <li>
            <strong className="text-[var(--tx)]">Log and Usage Data.</strong>{" "}
            Log and usage data is service-related, diagnostic, usage, and
            performance information our servers automatically collect when you
            access or use our Services and which we record in log files.
            Depending on how you interact with us, this log data may include your
            IP address, device information, browser type, and settings and
            information about your activity in the Services (such as the
            date/time stamps associated with your usage, pages and files viewed,
            searches, and other actions you take such as which features you
            use), device event information (such as system activity, error
            reports (sometimes called &quot;crash dumps&quot;), and hardware
            settings).
          </li>
          <li>
            <strong className="text-[var(--tx)]">Device Data.</strong> We
            collect device data such as information about your computer, phone,
            tablet, or other device you use to access the Services. Depending on
            the device used, this device data may include information such as
            your IP address (or proxy server), device and application
            identification numbers, location, browser type, hardware model,
            Internet service provider and/or mobile carrier, operating system,
            and system configuration information.
          </li>
          <li>
            <strong className="text-[var(--tx)]">Location Data.</strong> We
            collect location data such as information about your device&apos;s
            location, which can be either precise or imprecise. How much
            information we collect depends on the type and settings of the
            device you use to access the Services. For example, we may use GPS
            and other technologies to collect geolocation data that tells us
            your current location (based on your IP address). You can opt out of
            allowing us to collect this information either by refusing access to
            the information or by disabling your Location setting on your
            device. However, if you choose to opt out, you may not be able to
            use certain aspects of the Services.
          </li>
        </ul>

        <h3>Information collected from other sources</h3>
        <p>
          <strong>In Short:</strong> We may collect limited data from public
          databases, marketing partners, and other outside sources.
        </p>
        <p>
          In order to enhance our ability to provide relevant marketing, offers,
          and services to you and update our records, we may obtain information
          about you from other sources, such as public databases, joint
          marketing partners, affiliate programs, data providers, social media
          platforms, and from other third parties. This information includes
          mailing addresses, job titles, email addresses, phone numbers, intent
          data (or user behavior data), Internet Protocol (IP) addresses, social
          media profiles, social media URLs, and custom profiles, for purposes
          of targeted advertising and event promotion. If you interact with us
          on a social media platform using your social media account (e.g.,
          Facebook or Twitter), we receive personal information about you such
          as your name, email address, and gender. Any personal information that
          we collect from your social media account depends on your social media
          account privacy settings.
        </p>
      </>
    ),
  },
  {
    id: "section2",
    number: "02",
    title: "HOW DO WE PROCESS YOUR INFORMATION?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> We process your information to provide,
          improve, and administer our Services, communicate with you, for
          security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent.
        </p>
        <p>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul>
          <li>
            <strong className="text-[var(--tx)]">
              To respond to user inquiries/offer support to users.
            </strong>{" "}
            We may process your information to respond to your inquiries and
            solve any potential issues you might have with the requested
            service.
          </li>
          <li>
            <strong className="text-[var(--tx)]">To post testimonials.</strong>{" "}
            We post testimonials on our Services that may contain personal
            information.
          </li>
          <li>
            <strong className="text-[var(--tx)]">
              To determine group sizing and composition.
            </strong>{" "}
            We may process your information to determine group sizes and
            compositions.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "section3",
    number: "03",
    title: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> We may share information in specific
          situations described in this section and/or with the following third
          parties.
        </p>
        <p>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul>
          <li>
            <strong className="text-[var(--tx)]">Business Transfers.</strong> We
            may share or transfer your information in connection with, or during
            negotiations of, any merger, sale of company assets, financing, or
            acquisition of all or a portion of our business to another company.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "section4",
    number: "04",
    title: "HOW LONG DO WE KEEP YOUR INFORMATION?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> We keep your information for as long as
          necessary to fulfill the purposes outlined in this Privacy Notice
          unless otherwise required by law.
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
      </>
    ),
  },
  {
    id: "section5",
    number: "05",
    title: "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> We aim to protect your personal information
          through a system of organizational and technical security measures.
        </p>
        <p>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </p>
      </>
    ),
  },
  {
    id: "section6",
    number: "06",
    title: "DO WE COLLECT INFORMATION FROM MINORS?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> We do not knowingly collect data from or
          market to children under 18 years of age.
        </p>
        <p>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent&apos;s use of the Services. If we
          learn that personal information from users less than 18 years of age
          has been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at{" "}
          <a href="mailto:jhcdotcomclub.offical@gmail.com">
            jhcdotcomclub.offical@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "section7",
    number: "07",
    title: "WHAT ARE YOUR PRIVACY RIGHTS?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> You may review, change, or terminate your
          account at any time, depending on your specific privacy or data
          residence.
        </p>
        <h3>Withdrawing your consent</h3>
        <p>
          If we are relying on your consent to process your personal
          information, which may be express and/or implied consent depending on
          the applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us by
          using the contact details provided in the section &quot;HOW CAN YOU
          CONTACT US ABOUT THIS NOTICE?&quot; below.
        </p>
        <p>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <a href="mailto:jhcdotcomclub.offical@gmail.com">
            jhcdotcomclub.offical@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "section8",
    number: "08",
    title: "CONTROLS FOR DO-NOT-TRACK FEATURES",
    content: (
      <p>
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting
        you can activate to signal your privacy preference not to have data
        about your online browsing activities monitored and collected. At this
        stage no uniform technology standard for recognizing and implementing DNT
        signals has been finalized. As such, we do not currently respond to DNT
        browser signals or any other mechanism that automatically communicates
        your choice not to be tracked online. If a standard for online tracking
        is adopted that we must follow in the future, we will inform you about
        that practice in a revised version of this Privacy Notice.
      </p>
    ),
  },
  {
    id: "section9",
    number: "09",
    title: "DO WE MAKE UPDATES TO THIS NOTICE?",
    content: (
      <>
        <p>
          <strong>In Short:</strong> Yes, we will update this notice as
          necessary to stay compliant with relevant laws.
        </p>
        <p>
          We may update this Privacy Notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date at
          the top of this Privacy Notice. If we make material changes to this
          Privacy Notice, we may notify you either by prominently posting a
          notice of such changes or by directly sending you a notification. We
          encourage you to review this Privacy Notice frequently to be informed
          of how we are protecting your information.
        </p>
      </>
    ),
  },
  {
    id: "section10",
    number: "10",
    title: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    content: (
      <>
        <p>
          If you have questions or comments about this Privacy Notice, you may
          email us at{" "}
          <a href="mailto:jhcdotcomclub.offical@gmail.com">
            jhcdotcomclub.offical@gmail.com
          </a>{" "}
          or contact us by post at:
        </p>
        <div className="mt-4 space-y-1 text-[var(--tx)]">
          <p className="font-bold text-white">Dot Com Club</p>
          <p>Jai Hind College</p>
          <p>A-Road, Churchgate</p>
          <p>Mumbai, Maharashtra 400020</p>
          <p>India</p>
        </div>
      </>
    ),
  },
  {
    id: "section11",
    number: "11",
    title: "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
    content: (
      <p>
        Based on the applicable laws of your country, you may have the right to
        request access to the personal information we collect from you, change
        that information, or delete it. To request to review, update, or delete
        your personal information, please fill out and submit a{" "}
        <a href="mailto:jhcdotcomclub.offical@gmail.com?subject=Data%20Subject%20Access%20Request">
          data subject access request
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageTemplate
      badgeId="privacy-cp"
      heroLine1="Privacy"
      heroLine2="Policy"
      heroLabel="Privacy Policy"
      lastUpdated="June 21, 2026"
      heroDescription="How Dot Com Club collects, uses, stores, and protects your personal information across our website and events."
      marqueeItems={TAPE_ITEMS}
      introBanner={
        <>
          <p>
            This Privacy Policy describes how Dot Com Club (&quot;DCC&quot;,
            &quot;we/our/us&quot;) collect, use and why we might access,
            collect, store, use, and/or share (&quot;process&quot;) your
            personal information when you use our services (&quot;Services&quot;),
            including when you:
          </p>
          <ul>
            <li>
              Visit our website at{" "}
              <a href="#legal-body">Any links the business/service may use</a>,
              or any website of ours that links to this Privacy Policy
            </li>
            <li>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <p>
            We will collect and use your information as stated in this document
            and notice. We are responsible for making decisions about how your
            personal information is processed. If you do not agree with our
            policies and practices, please do not use our Services. If you still
            have any questions or concerns, please contact us at{" "}
            <a href="mailto:jhcdotcomclub.offical@gmail.com">
              jhcdotcomclub.offical@gmail.com
            </a>
            .
          </p>
        </>
      }
      summarySlot={
        <div className="legal-summary">
          <h3>Summary of Key Points</h3>
          <p>
            This summary provides key points from our Privacy Notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our Table of Contents
            below to find the section you are looking for.
          </p>
          <div className="legal-summary-grid">
            {KEY_POINTS.map((item) => (
              <div key={item.q} className="legal-summary-item">
                <strong>{item.q}</strong>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      }
      sections={PRIVACY_SECTIONS}
      bodyHeading="Privacy Clauses"
      closingText="Thank you for reviewing our Privacy Policy. Review our terms and refund guidelines or head back to the homepage."
      relatedLinks={[
        {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
          variant: "wh",
        },
        { label: "Refund Policy", href: "/refund-policy", variant: "ol" },
      ]}
    />
  );
}
