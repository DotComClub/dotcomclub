import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

    participants: v.optional(v.array(v.object({
      role: v.string(),
      name: v.string(),
      phone: v.string(),
      email: v.string(),
      classYear: v.string(),
      collegeIdUrl: v.optional(v.string()),
    }))),

    registrationFee: v.string(),
    paymentMethod: v.string(),
    upiTransactionId: v.optional(v.string()),
    paymentScreenshotUrl: v.optional(v.string()),
    additionalPaymentInfo: v.optional(v.string()),
    declarationAccepted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("culturalRegistrations", {
      ...args,
      submittedAt: Date.now(),
      verificationStatus: "pending",
    });
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
