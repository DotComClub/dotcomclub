"use client";

import Link from "next/link";
import {
  LegalPageTemplate,
  type LegalSectionItem,
} from "@/components/home/LegalPageTemplate";

const TAPE_ITEMS = [
  "Terms of Use",
  "Intellectual Property",
  "Registrations",
  "Refund Policy",
  "User Data",
  "Governing Law",
];

const TERMS_SECTIONS: LegalSectionItem[] = [
  {
    id: "section1",
    number: "01",
    title: "OUR SERVICES",
    content: (
      <>
        <p>
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country. Accordingly, those persons who
          choose to access the Services from other locations do so on their own
          initiative and are solely responsible for compliance with local laws,
          if and to the extent local laws are applicable.
        </p>
        <p>
          You are required to independently assess and ensure that the Services
          meet your requirements. Your use of our Services and the website is
          solely at your own risk and discretion.
        </p>
      </>
    ),
  },
  {
    id: "section2",
    number: "02",
    title: "INTELLECTUAL PROPERTY RIGHTS",
    content: (
      <>
        <h3>Our intellectual property</h3>
        <p>
          The Services and all contents, including but not limited to text,
          images, graphics, logos, icons, intellectual property rights,
          trademarks, service marks, audio clips, downloadable materials,
          software, and data compilations, are the property of Dot Com Club and
          protected by applicable copyright and trademark laws. The contents of
          the Website and the Services are proprietary to Us and you will not
          have any authority to claim any intellectual property rights, title,
          or interest in its contents.
        </p>

        <h3>Your use of our Services</h3>
        <p>
          The Services are provided for your personal, non-commercial use only.
          You agree not to reproduce, duplicate, copy, sell, resell, or exploit
          any portion of the Services, use of the Services, or access to the
          Services without express written permission by us. You acknowledge
          that unauthorized use of the Website or the Services may lead to
          action against you as per these Terms or applicable laws.
        </p>
      </>
    ),
  },
  {
    id: "section3",
    number: "03",
    title: "USER REPRESENTATIONS AND REGISTRATION",
    content: (
      <>
        <p>
          By using the Services, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3) you
          have the legal capacity and you agree to comply with these Terms of
          Use; (4) you are not a minor in the jurisdiction in which you reside;
          (5) you will not access the Services through automated or non-human
          means, whether through a bot, script, or otherwise; (6) you will not
          use the Services for any illegal or unauthorized purpose; and (7) your
          use of the Services will not violate any applicable law or regulation.
        </p>
        <p>
          To access and use the Services, you agree to provide true, accurate
          and complete information to us during and after registration, and you
          shall be responsible for all acts done through the use of your
          registered account.
        </p>
        <p>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Services
          (or any portion thereof).
        </p>
      </>
    ),
  },
  {
    id: "section4",
    number: "04",
    title: "PROHIBITED ACTIVITIES",
    content: (
      <>
        <p>
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used
          in connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </p>
        <p>
          You agree not to use the website and/or Services for any purpose that
          is unlawful, illegal or forbidden by these Terms, or Indian or local
          laws that might apply to you.
        </p>
        <p>As a user of the Services, you agree not to:</p>
        <ul>
          <li>
            Systematically retrieve data or other content from the Services to
            create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </li>
          <li>
            Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
          </li>
          <li>
            Circumvent, disable, or otherwise interfere with security-related
            features of the Services, including features that prevent or
            restrict the use or copying of any Content.
          </li>
          <li>
            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
            Services.
          </li>
          <li>
            Use any information obtained from the Services in order to harass,
            abuse, or harm another person.
          </li>
          <li>
            Make improper use of our support services or submit false reports of
            abuse or misconduct.
          </li>
          <li>
            Engage in any automated use of the system, such as using scripts to
            send comments or messages.
          </li>
          <li>Attempt to impersonate another user or person.</li>
          <li>
            Upload or transmit (or attempt to upload or to transmit) viruses,
            Trojan horses, or other material, including spamming, that
            interferes with any party&apos;s uninterrupted use and enjoyment of
            the Services.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "section5",
    number: "05",
    title: "USER GENERATED CONTRIBUTIONS",
    content: (
      <>
        <p>
          The Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality, and may
          provide you with the opportunity to create, submit, post, display,
          transmit, perform, publish, distribute, or broadcast content and
          materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions,
          or personal information or other material (collectively,
          &quot;Contributions&quot;).
        </p>
        <p>
          Contributions may be viewable by other users of the Services and
          through third-party websites. As such, any Contributions you transmit
          may be treated as non-confidential and non-proprietary. When you
          create or make available any Contributions, you thereby represent and
          warrant that your Contributions comply with these Terms of Use.
        </p>
      </>
    ),
  },
  {
    id: "section6",
    number: "06",
    title: "CONTRIBUTION LICENSE",
    content: (
      <p>
        By posting your Contributions to any part of the Services, you
        automatically grant, and you represent and warrant that you have the
        right to grant, to us an unrestricted, unlimited, irrevocable,
        perpetual, non-exclusive, transferable, royalty-free, fully-paid,
        worldwide right, and license to host, use, copy, reproduce, disclose,
        sell, resell, publish, broadcast, retitle, archive, store, cache,
        publicly perform, publicly display, reformat, translate, transmit,
        excerpt (in whole or in part), and distribute such Contributions for any
        purpose, commercial, advertising, or otherwise, and to prepare
        derivative works of, or incorporate into other works, such
        Contributions, and grant and authorize sublicenses of the foregoing.
      </p>
    ),
  },
  {
    id: "section7",
    number: "07",
    title: "SERVICES MANAGEMENT",
    content: (
      <p>
        We reserve the right, but not the obligation, to: (1) monitor the
        Services for violations of these Terms of Use; (2) take appropriate legal
        action against anyone who, in our sole discretion, violates the law or
        these Terms of Use, including without limitation, reporting such user to
        law enforcement authorities; (3) in our sole discretion and without
        limitation, refuse, restrict access to, limit the availability of, or
        disable (to the extent technologically feasible) any of your
        Contributions or any portion thereof; (4) in our sole discretion and
        without limitation, notice, or liability, to remove from the Services or
        otherwise disable all files and content that are excessive in size or
        are in any way burdensome to our systems; and (5) otherwise manage the
        Services in a manner designed to protect our rights and property and to
        facilitate the proper functioning of the Services.
      </p>
    ),
  },
  {
    id: "section8",
    number: "08",
    title: "TERM AND TERMINATION",
    content: (
      <>
        <p>
          These Terms of Use shall remain in full force and effect while you use
          the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF
          USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE
          OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING
          BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
          WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY
          APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
          PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION
          THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
        </p>
        <p>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </p>
      </>
    ),
  },
  {
    id: "section9",
    number: "09",
    title: "MODIFICATIONS AND INTERRUPTIONS",
    content: (
      <>
        <p>
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Services. We also reserve the right to modify or discontinue all
          or part of the Services without notice at any time. We will not be
          liable to you or any third party for any modification, price change,
          suspension, or discontinuance of the Services.
        </p>
        <p>
          We cannot guarantee the Services will be available at all times. We
          may experience hardware, software, or other problems or need to
          perform maintenance related to the Services, resulting in
          interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services
          at any time or for any reason without notice to you. You agree that we
          have no liability whatsoever for any loss, damage, or inconvenience
          caused by your inability to access or use the Services during any
          downtime or discontinuance of the Services. Nothing in these Terms of
          Use will be construed to obligate us to maintain and support the
          Services or to supply any corrections, updates, or releases in
          connection therewith.
        </p>
      </>
    ),
  },
  {
    id: "section10",
    number: "10",
    title: "PAYMENTS AND REFUNDS",
    content: (
      <>
        <p>
          You agree to pay us the charges associated with availing the Services.
          You understand that upon initiating a transaction for availing the
          Services you are entering into a legally binding and enforceable
          contract with us for the Services.
        </p>
        <p>
          You shall be entitled to claim a refund of the payment made by you in
          case we are not able to provide the Service. The timelines for such
          return and refund will be according to the specific Service you have
          availed or within the time period provided in our policies (as
          applicable). In case you do not raise a refund claim within the
          stipulated time, this would make you ineligible for a refund.
        </p>
        <p>
          For more detailed information about our refund policies for specific
          services and events, please refer to our{" "}
          <Link href="/refund-policy">Refund Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "section11",
    number: "11",
    title: "THIRD-PARTY WEBSITES AND CONTENT",
    content: (
      <>
        <p>
          You agree and acknowledge that the website and the Services may
          contain links to other third-party websites. On accessing these links,
          you will be governed by the terms of use, privacy policy and such
          other policies of such third-party websites.
        </p>
        <p>
          The Services may contain (or you may be sent via the Site) links to
          other websites (&quot;Third-Party Websites&quot;) as well as articles,
          photographs, text, graphics, pictures, designs, music, sound, video,
          information, applications, software, and other content or items
          belonging to or originating from third parties (&quot;Third-Party
          Content&quot;). Such Third-Party Websites and Third-Party Content are
          not investigated, monitored, or checked for accuracy, appropriateness,
          or completeness by us, and we are not responsible for any Third-Party
          Websites accessed through the Services or any Third-Party Content
          posted on, available through, or installed from the Services,
          including the content, accuracy, offensiveness, opinions, reliability,
          privacy practices, or other policies of or contained in the
          Third-Party Websites or the Third-Party Content.
        </p>
      </>
    ),
  },
  {
    id: "section12",
    number: "12",
    title: "DISCLAIMERS AND USER RISK",
    content: (
      <>
        <p>
          Neither we nor any third parties provide any warranty or guarantee as
          to the accuracy, timeliness, performance, completeness or suitability
          of the information and materials offered on this website or through
          the Services, for any specific purpose. You acknowledge that such
          information and materials may contain inaccuracies or errors and we
          expressly exclude liability for any such inaccuracies or errors to the
          fullest extent permitted by law.
        </p>
        <p>
          Your use of our Services and the website is solely at your own risk
          and discretion. You are required to independently assess and ensure
          that the Services meet your requirements.
        </p>
        <p>
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
          AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
          FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
          IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT
          OF ANY WEBSITES LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY
          OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
          CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY
          NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
          SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
          AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
          STORED THEREIN.
        </p>
      </>
    ),
  },
  {
    id: "section13",
    number: "13",
    title: "GOVERNING LAW AND JURISDICTION",
    content: (
      <>
        <p>
          These Terms and any dispute or claim relating to it, or its
          enforceability, shall be governed by and construed in accordance with
          the laws of India.
        </p>
        <p>
          All disputes arising out of or in connection with these Terms shall be
          subject to the exclusive jurisdiction of the courts in Mumbai,
          Maharashtra.
        </p>
      </>
    ),
  },
  {
    id: "section14",
    number: "14",
    title: "DISPUTE RESOLUTION",
    content: (
      <p>
        Any dispute arising out of or in connection with these Terms of Use,
        including any question regarding its existence, validity, or termination,
        shall be referred to and finally resolved by arbitration in Mumbai, India
        in accordance with the Arbitration and Conciliation Act, 1996 which
        rules are deemed to be incorporated by reference in this clause. The
        number of arbitrators shall be one. The seat, or legal place, of
        arbitration shall be Mumbai, India. The language to be used in the
        arbitral proceedings shall be English. The governing law shall be the
        substantive law of India.
      </p>
    ),
  },
  {
    id: "section15",
    number: "15",
    title: "FORCE MAJEURE",
    content: (
      <>
        <p>
          Notwithstanding anything contained in these Terms, the parties shall
          not be liable for any failure to perform an obligation under these
          Terms if performance is prevented or delayed by a force majeure event.
          A force majeure event includes but is not limited to acts of God,
          natural disasters, epidemics, pandemics, riots, war, civil unrest,
          terrorism, or any other circumstances beyond the reasonable control of
          the parties.
        </p>
        <p>
          If a force majeure event occurs, the party affected shall inform the
          other party without delay and the parties shall cooperate to find an
          equitable solution and use reasonable endeavors to minimize the impact
          of the event on the performance of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "section16",
    number: "16",
    title: "USER DATA",
    content: (
      <>
        <p>
          We will maintain certain data that you transmit to the Services for
          the purpose of managing the performance of the Services, as well as
          data relating to your use of the Services. Although we perform regular
          routine backups of data, you are solely responsible for all data that
          you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any
          loss or corruption of any such data, and you hereby waive any right of
          action against us arising from any such loss or corruption of such
          data.
        </p>
        <p>
          For more information on how we collect, use, share, and protect your
          data, please review our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "section17",
    number: "17",
    title: "ELECTRONIC COMMUNICATIONS",
    content: (
      <p>
        Visiting the Services, sending us emails, and completing online forms
        constitute electronic communications. You consent to receive electronic
        communications, and you agree that all agreements, notices, disclosures,
        and other communications we provide to you electronically, via email and
        on the Services, satisfy any legal requirement that such communication
        be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
        CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
        NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
        US OR VIA THE SERVICES. You hereby waive any rights or requirements under
        any statutes, regulations, rules, ordinances, or other laws in any
        jurisdiction which require an original signature or delivery or retention
        of non-electronic records, or to payments or the granting of credits by
        any means other than electronic means.
      </p>
    ),
  },
  {
    id: "section18",
    number: "18",
    title: "CONTACT INFORMATION",
    content: (
      <>
        <p>
          All concerns or communications relating to these Terms must be
          communicated to us using the contact information provided below.
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

export default function TermsAndConditions() {
  return (
    <LegalPageTemplate
      badgeId="terms-cp"
      heroLine1="Terms &"
      heroLine2="Conditions"
      heroLabel="Terms and Conditions"
      lastUpdated="June 21, 2026"
      heroDescription="Legally binding agreement governing your access to and use of Dot Com Club's website, events, and membership services."
      marqueeItems={TAPE_ITEMS}
      introBanner={
        <>
          <p>
            These Terms of Use constitute a legally binding agreement made
            between you and Dot Com Club (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), concerning your access to and use of our website
            and services. By using our website and availing the Services, you
            agree that you have read and accepted these Terms (including the
            Privacy Policy). We reserve the right to modify these Terms at any
            time and without assigning any reason. It is your responsibility to
            periodically review these Terms to stay informed of updates.
          </p>
          <p>
            The use of this website or availing of our Services is subject to
            the following terms of use. Supplemental terms and conditions or
            documents that may be posted on the website from time to time are
            hereby expressly incorporated herein by reference. We reserve the
            right, in our sole discretion, to make changes or modifications to
            these Terms of Use at any time and for any reason. We will alert you
            about any changes by updating the &quot;Last updated&quot; date of
            these Terms of Use, and you waive any right to receive specific
            notice of each such change.
          </p>
          <p className="legal-warning">
            IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
            EXPRESSLY PROHIBITED FROM USING THE WEBSITE AND SERVICES AND YOU
            MUST DISCONTINUE USE IMMEDIATELY.
          </p>
        </>
      }
      sections={TERMS_SECTIONS}
      bodyHeading="Legal Clauses"
      closingText="Thank you for reviewing Dot Com Club's Terms and Conditions. Explore our related policies or return to the homepage."
      relatedLinks={[
        { label: "Privacy Policy", href: "/privacy-policy", variant: "wh" },
        { label: "Refund Policy", href: "/refund-policy", variant: "ol" },
      ]}
    />
  );
}
