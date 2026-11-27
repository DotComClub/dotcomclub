"use client";

import { useState } from "react";

const UPI_ID = "tinwala075@okicici";
const PAYEE_NAME = "Hussain Tinwala";

/**
 * Shared UPI payment QR card displayed in all event registration forms.
 */
export function PaymentQrCard() {
  const [copied, setCopied] = useState(false);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="event-qr-card">
      <div className="event-qr-img-wrap">
        <img
          src="/images/payment-qr.jpg"
          alt={`UPI Payment QR Code for ${PAYEE_NAME} (${UPI_ID})`}
          className="event-qr-img"
        />
      </div>

      <div className="event-qr-info">
        <span className="event-qr-tag">Scan &amp; Pay via any UPI app</span>
        <h4 className="event-qr-payee">{PAYEE_NAME}</h4>
        <div className="event-qr-upi-row">
          <code className="event-qr-upi">{UPI_ID}</code>
          <button
            type="button"
            className="event-qr-copy"
            onClick={copyUpi}
          >
            {copied ? "✓ Copied" : "Copy UPI ID"}
          </button>
        </div>
        <p className="event-qr-note">
          Scan the QR code or pay to the UPI ID above, then enter your
          transaction reference number and upload the payment screenshot below.
        </p>
      </div>
    </div>
  );
}
