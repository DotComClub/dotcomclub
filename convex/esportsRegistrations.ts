import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRegistration = mutation({
  args: {
    game: v.string(),
    codeType: v.string(), // "PRNC" | "CC"
    codeValue: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    ign: v.optional(v.string()),
    collegeId: v.optional(v.string()),
    collegeIdUrl: v.optional(v.string()),
    collegeName: v.optional(v.string()),
    playerTag: v.optional(v.string()),
    teamName: v.optional(v.string()),
    players: v.optional(v.array(v.object({
      name: v.string(),
      email: v.string(),
      ign: v.string(),
      collegeId: v.optional(v.string()),
      collegeIdUrl: v.optional(v.string()),
      number: v.string(),
      collegeName: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("esportsRegistrations", {
      ...args,
      submittedAt: Date.now(),
      verificationStatus: "pending",
    });
  },
});

export const listRegistrations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("esportsRegistrations")
      .withIndex("by_submitted")
      .order("desc")
      .collect();
  },
});

export const deleteRegistration = mutation({
  args: { id: v.id("esportsRegistrations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
