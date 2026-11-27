"use client";

import { useState } from "react";

const UPI_ID = "tinwala075@okicici";
const PAYEE_NAME = "Hussain Tinwala";
const DEFAULT_QR_SRC = "/images/payment-qr.jpg";

const AMOUNT_QR_MAP: Record<number, string> = {
  50: "/images/qr/qr-50.jpg",
  80: "/images/qr/qr-80.jpg",
  100: "/images/qr/qr-100.jpg",
  150: "/images/qr/qr-150.jpg",
  160: "/images/qr/qr-160.jpg",
  200: "/images/qr/qr-200.jpg",
  1000: "/images/qr/qr-1000.jpg",
};

interface PaymentQrCardProps {
  /** Exact INR payable amount for the selected sub-event or team size. */
  amount?: number;
}

/**
 * Shared UPI payment QR card displayed in all event registration forms.
 * Selects an amount-specific QR when available, otherwise falls back to the open-amount QR.
 */
export function PaymentQrCard({ amount }: PaymentQrCardProps) {
  const [copied, setCopied] = useState(false);
  const qrSrc =
    amount !== undefined && AMOUNT_QR_MAP[amount]
      ? AMOUNT_QR_MAP[amount]
      : DEFAULT_QR_SRC;
  const hasFixedQr = amount !== undefined && Boolean(AMOUNT_QR_MAP[amount]);

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
          src={qrSrc}
          alt={`UPI Payment QR Code for ${PAYEE_NAME} (${UPI_ID})${
            hasFixedQr ? ` - ₹${amount}` : ""
          }`}
          className="event-qr-img"
        />
      </div>

      <div className="event-qr-info">
        <span className="event-qr-tag">
          {hasFixedQr
            ? `Scan & Pay ₹${amount?.toLocaleString("en-IN")} via any UPI app`
            : "Scan & Pay via any UPI app"}
        </span>
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
