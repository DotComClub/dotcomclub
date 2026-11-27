import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { TECHNICAL_EVENT_TITLE_SET } from "./technicalEventNames";

export const createCulturalRegistration = mutation({
  args: {
    event: v.string(),
    collegeName: v.string(),
    codeType: v.string(), // "PRNC" | "CC"
    codeValue: v.string(),
    teamName: v.optional(v.string()),
    entryFormat: v.optional(v.string()),
    teamSize: v.optional(v.string()),

    name: v.string(),
    email: v.string(),
    phone: v.string(),
    classYear: v.optional(v.string()),
    collegeIdUrl: v.optional(v.string()),
    govtIdUrl: v.optional(v.string()),

    participants: v.optional(v.array(v.object({
      role: v.string(),
      name: v.string(),
      phone: v.string(),
      email: v.string(),
      classYear: v.string(),
      collegeIdUrl: v.optional(v.string()),
      govtIdUrl: v.optional(v.string()),
    }))),

    registrationFee: v.string(),
    paymentMethod: v.string(),
    upiTransactionId: v.optional(v.string()),
    paymentScreenshotUrl: v.optional(v.string()),
    additionalPaymentInfo: v.optional(v.string()),
    declarationAccepted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const participants = args.participants?.map((participant) => ({
      role: participant.role,
      name: participant.name,
      phone: participant.phone,
      email: participant.email,
      classYear: participant.classYear,
      ...(participant.collegeIdUrl
        ? { collegeIdUrl: participant.collegeIdUrl }
        : {}),
      ...(participant.govtIdUrl
        ? { govtIdUrl: participant.govtIdUrl }
        : {}),
    }));

    const registration = {
      event: args.event,
      collegeName: args.collegeName,
      codeType: args.codeType,
      codeValue: args.codeValue,
      ...(args.teamName ? { teamName: args.teamName } : {}),
      ...(args.entryFormat ? { entryFormat: args.entryFormat } : {}),
      ...(args.teamSize ? { teamSize: args.teamSize } : {}),
      name: args.name,
      email: args.email,
      phone: args.phone,
      ...(args.classYear ? { classYear: args.classYear } : {}),
      ...(args.collegeIdUrl ? { collegeIdUrl: args.collegeIdUrl } : {}),
      ...(args.govtIdUrl ? { govtIdUrl: args.govtIdUrl } : {}),
      ...(participants ? { participants } : {}),
      registrationFee: args.registrationFee,
      paymentMethod: args.paymentMethod,
      ...(args.upiTransactionId
        ? { upiTransactionId: args.upiTransactionId }
        : {}),
      ...(args.paymentScreenshotUrl
        ? { paymentScreenshotUrl: args.paymentScreenshotUrl }
        : {}),
      ...(args.additionalPaymentInfo
        ? { additionalPaymentInfo: args.additionalPaymentInfo }
        : {}),
      declarationAccepted: args.declarationAccepted,
      submittedAt: Date.now(),
      verificationStatus: "pending",
    } as const;

    if (TECHNICAL_EVENT_TITLE_SET.has(args.event)) {
      return await ctx.db.insert("technicalRegistrations", registration);
    }

    return await ctx.db.insert("culturalRegistrations", registration);
  },
});

export const listCulturalRegistrations = query({
  args: { event: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.event) {
      return await ctx.db
        .query("culturalRegistrations")
        .withIndex("by_event", (q) => q.eq("event", args.event!))
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("culturalRegistrations")
      .withIndex("by_submitted")
      .order("desc")
      .collect();
  },
});

export const deleteCulturalRegistration = mutation({
  args: { id: v.id("culturalRegistrations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
