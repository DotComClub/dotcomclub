"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { anton, dmSans } from "@/fonts/font";
import { BackgroundCanvas } from "@/components/home/BackgroundCanvas";
import { Navbar } from "@/components/home/Navbar";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { RevealHeading } from "@/components/home/RevealHeading";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DEPARTMENTS = [
  "BSC IT",
  "BVOC SD",
  "BVOC TT",
  "BCOM",
  "BBA",
  "BSC",
  "BIOTECH",
  "BMS",
  "BMM",
  "BFM",
  "BAF",
  "BBI",
  "BA",
  "BDS",
  "Other",
] as const;

const YEARS = ["FY", "SY", "TY"] as const;

const TEAMS = [
  "Hackathon",
  "Contingent",
  "Events",
  "ESports",
  "Marketing",
  "PR (Public Relations)",
  "WebOps",
  "Media and Graphics",
  "Photography",
  "Decor",
  "Editorial",
  "Security and Logistics",
] as const;

const TSHIRT_SIZES = [
  "XS - 34",
  "S - 36",
  "M - 38",
  "L - 40",
  "XL - 42",
  "XXL - 44",
  "Other",
] as const;

const HEAR_OPTIONS = [
  "Social Media",
  "On Campus",
  "Via Email",
  "Friends",
  "Other",
] as const;

const TAPE_ITEMS = [
  "Hackathon",
  "WebOps",
  "Esports",
  "Media & Graphics",
  "Contingent",
  "Marketing",
  "PR",
  "Editorial",
];

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    uid: z.string().min(1, {
      message: "UID is required (write NA if FY).",
    }),
    contactNo: z.string().min(10, {
      message: "Contact number must be at least 10 digits.",
    }),
    department: z.enum(DEPARTMENTS, {
      required_error: "Please select a department.",
    }),
    departmentOther: z.string().optional(),
    year: z.enum(YEARS, {
      required_error: "Please select your year.",
    }),
    team: z.enum(TEAMS, {
      required_error: "Please select the team you would like to join.",
    }),
    tshirtSize: z.enum(TSHIRT_SIZES, {
      required_error: "Please select your T-shirt size.",
    }),
    tshirtSizeOther: z.string().optional(),
    hearAboutDCC: z.enum(HEAR_OPTIONS, {
      required_error: "Please tell us how you heard about DCC.",
    }),
    hearAboutDCCOther: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.department === "Other" && !values.departmentOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["departmentOther"],
        message: "Please specify your department.",
      });
    }
    if (values.tshirtSize === "Other" && !values.tshirtSizeOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tshirtSizeOther"],
        message: "Please specify your T-shirt size.",
      });
    }
    if (values.hearAboutDCC === "Other" && !values.hearAboutDCCOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hearAboutDCCOther"],
        message: "Please specify how you heard about DCC.",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

interface RadioTileFieldProps {
  control: ReturnType<typeof useForm<FormValues>>["control"];
  name: FieldPath<FormValues>;
  label: string;
  options: readonly string[];
  gridClassName: string;
  idPrefix: string;
}

/**
 * Reusable interactive radio-tile selector styled for the homepage design system.
 */
function RadioTileField({
  control,
  name,
  label,
  options,
  gridClassName,
  idPrefix,
}: RadioTileFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={typeof field.value === "string" ? field.value : undefined}
              className={gridClassName}
            >
              {options.map((option) => {
                const inputId = `${idPrefix}-${option}`;
                const isSelected = field.value === option;
                return (
                  <label
                    key={option}
                    htmlFor={inputId}
                    data-selected={isSelected ? "true" : "false"}
                    className="reg-tile"
                  >
                    <RadioGroupItem
                      value={option}
                      id={inputId}
                      className="border-[var(--p)] text-[var(--p)] shrink-0"
                    />
                    <span className="text-sm font-medium leading-snug">
                      {option}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-rose-400 text-xs font-medium" />
        </FormItem>
      )}
    />
  );
}

export default function RegisterOC() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      uid: "",
      contactNo: "",
      departmentOther: "",
      tshirtSizeOther: "",
      hearAboutDCCOther: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    const processedValues = {
      ...values,
      department:
        values.department === "Other"
          ? values.departmentOther?.trim()
          : values.department,
      tshirtSize:
        values.tshirtSize === "Other"
          ? values.tshirtSizeOther?.trim()
          : values.tshirtSize,
      hearAboutDCC:
        values.hearAboutDCC === "Other"
          ? values.hearAboutDCCOther?.trim()
          : values.hearAboutDCC,
    };

    localStorage.setItem("registrationData", JSON.stringify(processedValues));

    setTimeout(() => {
      router.push("/payment-confirmation");
    }, 400);
  }

  const marqueeContent = (
    <div className="mq">
      {[...Array(2)].map((_, loopIdx) => (
        <span key={loopIdx} className="inline-flex">
          {TAPE_ITEMS.map((item, itemIdx) => (
            <span key={`${loopIdx}-${itemIdx}`}>
              <span>{item}</span>
              <span>●</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-loaded={isLoaded ? "true" : "false"}
      className={`register-root home-root ${isLoaded ? "go" : ""} ${anton.variable} ${dmSans.variable} bg-[var(--bg)] text-[var(--tx)] relative`}
    >
      {/* Background Organic Drift & Brush Canvas */}
      <BackgroundCanvas />

      {/* Editorial Navigation matching Homepage */}
      <Navbar />

      {/* Custom Comet Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 1. Hero Section */}
      <header className="hero" id="hero">
        <HeroCanvas />

        {/* Rotating Circular Badge SVG */}
        <svg className="bdg" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path
              id="reg-cp"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fontSize="19"
            fontWeight="700"
            fill="#1B1030"
            fontFamily="DM Sans, sans-serif"
          >
            <textPath href="#reg-cp" textLength="480" lengthAdjust="spacing">
              JAI HIND COLLEGE • EST. 2014 • TECH CLUB •
            </textPath>
          </text>
          <circle cx="100" cy="100" r="14" fill="#1B1030" />
        </svg>

        <div className="wrap">
          <h1 className="h1" aria-label="Join Dot Com Club">
            <s>
              <i>Join</i>
            </s>
            <s>
              <i>
                Dot<b className="od" />
                Com
              </i>
            </s>
          </h1>

          <div className="c2">
            <p>
              Become an official member of DCC 2026–27. Pick your squad, unlock
              flagship events, and build with Jai Hind&apos;s tech community.
            </p>
            <div>
              <a className="btn dk" href="#register-form">
                Apply Now
              </a>
              <a className="btn ol" href="#details">
                Fee &amp; Details
              </a>
            </div>
          </div>
        </div>

        {/* Crossing Infinite Marquee Tapes */}
        <div className="tp t1" aria-hidden="true">
          {marqueeContent}
        </div>
        <div className="tp t2" aria-hidden="true">
          {marqueeContent}
        </div>
      </header>

      {/* 2. Lavender Overview Band */}
      <section className="cnt" id="details">
        <div className="wrap">
          <RevealHeading>Membership 2026–27</RevealHeading>
          <p className="lead" style={{ color: "var(--ink)" }}>
            One registration connects you to all twelve club squads, exclusive
            Cyberstrike &apos;26 privileges, and your official DCC tee.
          </p>

          <div className="reg-stats">
            <div className="reg-stat">
              <div className="reg-stat-val">₹300</div>
              <small>Annual Membership Fee (2026–27)</small>
            </div>
            <div className="reg-stat">
              <div className="reg-stat-val">12</div>
              <small>Technical, Creative &amp; Core Squads</small>
            </div>
            <div className="reg-stat">
              <div className="reg-stat-val">01 TEE</div>
              <small>Custom Official DCC Merchandise Included</small>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Registration Form Section */}
      <section id="register-form">
        <div className="wrap">
          <RevealHeading>Register Now</RevealHeading>
          <p className="lead">
            Complete the form below to reserve your spot. Fields marked with *
            are required.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-4xl"
            >
              {/* Step 01: Personal Information */}
              <div className="reg-card">
                <div className="reg-card-head">
                  <h3>Personal Identity</h3>
                  <span className="reg-step-tag">01 / Identity</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="uid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          UID (Write NA if FY) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="e.g. 24BIT001 or NA"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Contact No. *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="10-digit WhatsApp number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Step 02: Academic Profile */}
              <div className="reg-card space-y-8">
                <div className="reg-card-head">
                  <h3>Academic Profile</h3>
                  <span className="reg-step-tag">02 / Academics</span>
                </div>

                <RadioTileField
                  control={form.control}
                  name="department"
                  label="Department *"
                  options={DEPARTMENTS}
                  gridClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5"
                  idPrefix="dept"
                />

                {form.watch("department") === "Other" && (
                  <FormField
                    control={form.control}
                    name="departmentOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Please specify your department *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="Enter your department"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                )}

                <RadioTileField
                  control={form.control}
                  name="year"
                  label="Year *"
                  options={YEARS}
                  gridClassName="grid grid-cols-3 gap-3 max-w-md"
                  idPrefix="year"
                />
              </div>

              {/* Step 03: Squad & Merchandise */}
              <div className="reg-card space-y-8">
                <div className="reg-card-head">
                  <h3>Squad &amp; Merchandise</h3>
                  <span className="reg-step-tag">03 / Squad</span>
                </div>

                <RadioTileField
                  control={form.control}
                  name="team"
                  label="Select the team you would like to join *"
                  options={TEAMS}
                  gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  idPrefix="team"
                />

                <RadioTileField
                  control={form.control}
                  name="tshirtSize"
                  label="T Shirt Size *"
                  options={TSHIRT_SIZES}
                  gridClassName="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                  idPrefix="tshirt"
                />

                {form.watch("tshirtSize") === "Other" && (
                  <FormField
                    control={form.control}
                    name="tshirtSizeOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Please specify your T-shirt size *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="Enter your T-shirt size"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Step 04: Discovery & Payment */}
              <div className="reg-card space-y-8">
                <div className="reg-card-head">
                  <h3>Discovery &amp; Checkout</h3>
                  <span className="reg-step-tag">04 / Checkout</span>
                </div>

                <RadioTileField
                  control={form.control}
                  name="hearAboutDCC"
                  label="How did you hear about DCC? *"
                  options={HEAR_OPTIONS}
                  gridClassName="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
                  idPrefix="hear"
                />

                {form.watch("hearAboutDCC") === "Other" && (
                  <FormField
                    control={form.control}
                    name="hearAboutDCCOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold text-[var(--tx)]">
                          Please specify how you heard about DCC *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="reg-input"
                            placeholder="Tell us where you found DCC"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                )}

                <div className="reg-fee-box">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 text-[var(--p)] font-bold text-sm uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Membership Fee Summary</span>
                    </div>
                    <p className="text-sm sm:text-base text-[var(--tx)] leading-relaxed m-0">
                      The membership fee for DCC 2026–27 is{" "}
                      <strong className="text-white">₹300</strong>. After
                      submitting, you&apos;ll be directed to our payment page to
                      upload your screenshot and complete registration.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--mute)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--p)] shrink-0" />
                    <span>Instant confirmation step</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-2">
                  <button
                    type="submit"
                    className="reg-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[var(--mute)] m-0 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Link
                      href="/contact-us"
                      className="hover:text-white underline underline-offset-4"
                    >
                      Contact Us
                    </Link>
                    <span>•</span>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white underline underline-offset-4"
                    >
                      Terms &amp; Conditions
                    </Link>
                    <span>•</span>
                    <Link
                      href="/refund-policy"
                      className="hover:text-white underline underline-offset-4"
                    >
                      Refund Policy
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>

      {/* Editorial Footer matching Homepage */}
      <FooterSection />
    </div>
  );
}
