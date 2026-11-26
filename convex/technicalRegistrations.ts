import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import {
  TECHNICAL_EVENT_TITLES,
  TECHNICAL_EVENT_TITLE_SET,
} from "./technicalEventNames";

const participantValidator = v.object({
  role: v.string(),
  name: v.string(),
  phone: v.string(),
  email: v.string(),
  classYear: v.string(),
  collegeIdUrl: v.optional(v.string()),
});

const registrationFields = {
  event: v.string(),
  collegeName: v.string(),
  codeType: v.string(),
  codeValue: v.string(),
  teamName: v.optional(v.string()),
  entryFormat: v.optional(v.string()),
  teamSize: v.optional(v.string()),
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  classYear: v.optional(v.string()),
  collegeIdUrl: v.optional(v.string()),
  participants: v.optional(v.array(participantValidator)),
  registrationFee: v.string(),
  paymentMethod: v.string(),
  upiTransactionId: v.optional(v.string()),
  paymentScreenshotUrl: v.optional(v.string()),
  additionalPaymentInfo: v.optional(v.string()),
  declarationAccepted: v.boolean(),
};

export const createTechnicalRegistration = mutation({
  args: registrationFields,
  handler: async (ctx, args) => {
    if (!TECHNICAL_EVENT_TITLE_SET.has(args.event)) {
      throw new Error("Unknown technical event.");
    }

    return await ctx.db.insert("technicalRegistrations", {
      ...args,
      submittedAt: Date.now(),
      verificationStatus: "pending",
    });
  },
});

export const listTechnicalRegistrations = query({
  args: {},
  handler: async (ctx) => {
    const registrations = await ctx.db
      .query("technicalRegistrations")
      .withIndex("by_submitted")
      .order("desc")
      .collect();

    const legacyRegistrations = (
      await Promise.all(
        TECHNICAL_EVENT_TITLES.map((event) =>
          ctx.db
            .query("culturalRegistrations")
            .withIndex("by_event", (q) => q.eq("event", event))
            .order("desc")
            .collect()
        )
      )
    ).flat();

    return [
      ...registrations.map((registration) => ({
        ...registration,
        source: "technical" as const,
      })),
      ...legacyRegistrations.map((registration) => ({
        ...registration,
        source: "legacy" as const,
      })),
    ].sort((a, b) => b.submittedAt - a.submittedAt);
  },
});

export const deleteTechnicalRegistration = mutation({
  args: {
    id: v.id("technicalRegistrations"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteLegacyTechnicalRegistration = mutation({
  args: {
    id: v.id("culturalRegistrations"),
  },
  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.id);
    if (
      !registration ||
      !TECHNICAL_EVENT_TITLE_SET.has(registration.event)
    ) {
      throw new Error("This is not a legacy technical registration.");
    }
    await ctx.db.delete(args.id);
  },
});

export const migrateLegacyBatch = internalMutation({
  args: {
    eventIndex: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const eventIndex = args.eventIndex ?? 0;
    if (eventIndex >= TECHNICAL_EVENT_TITLES.length) {
      return { complete: true, migrated: 0 };
    }

    const event = TECHNICAL_EVENT_TITLES[eventIndex];
    const page = await ctx.db
      .query("culturalRegistrations")
      .withIndex("by_event", (q) => q.eq("event", event))
      .order("desc")
      .paginate({ numItems: 50, cursor: args.cursor ?? null });

    for (const registration of page.page) {
      await ctx.db.insert("technicalRegistrations", {
        event: registration.event,
        collegeName: registration.collegeName,
        codeType: registration.codeType,
        codeValue: registration.codeValue,
        ...(registration.teamName !== undefined
          ? { teamName: registration.teamName }
          : {}),
        ...(registration.entryFormat !== undefined
          ? { entryFormat: registration.entryFormat }
          : {}),
        ...(registration.teamSize !== undefined
          ? { teamSize: registration.teamSize }
          : {}),
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        ...(registration.classYear !== undefined
          ? { classYear: registration.classYear }
          : {}),
        ...(registration.collegeIdUrl !== undefined
          ? { collegeIdUrl: registration.collegeIdUrl }
          : {}),
        ...(registration.participants !== undefined
          ? { participants: registration.participants }
          : {}),
        registrationFee: registration.registrationFee,
        paymentMethod: registration.paymentMethod,
        ...(registration.upiTransactionId !== undefined
          ? { upiTransactionId: registration.upiTransactionId }
          : {}),
        ...(registration.paymentScreenshotUrl !== undefined
          ? { paymentScreenshotUrl: registration.paymentScreenshotUrl }
          : {}),
        ...(registration.additionalPaymentInfo !== undefined
          ? { additionalPaymentInfo: registration.additionalPaymentInfo }
          : {}),
        declarationAccepted: registration.declarationAccepted,
        submittedAt: registration.submittedAt,
        verificationStatus: registration.verificationStatus,
      });
      await ctx.db.delete(registration._id);
    }

    const nextEventIndex = page.isDone ? eventIndex + 1 : eventIndex;
    if (nextEventIndex < TECHNICAL_EVENT_TITLES.length) {
      await ctx.scheduler.runAfter(
        0,
        internal.technicalRegistrations.migrateLegacyBatch,
        page.isDone
          ? { eventIndex: nextEventIndex }
          : { eventIndex, cursor: page.continueCursor }
      );
    }

    return {
      complete: nextEventIndex >= TECHNICAL_EVENT_TITLES.length,
      migrated: page.page.length,
    };
  },
});
