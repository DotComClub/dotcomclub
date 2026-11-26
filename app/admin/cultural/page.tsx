"use client";

import { AdminLogin } from "@/components/admin-login";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { CalendarDays, Download, LogOut, Trash2 } from "lucide-react";
import { TECHNICAL_EVENT_TITLES } from "@/lib/technical-events";

export default function AdminCulturalRegistrations() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const allRegistrations = useQuery(
    api.culturalRegistrations.listCulturalRegistrations,
    {}
  );
  const registrations = allRegistrations?.filter(
    (registration) => !TECHNICAL_EVENT_TITLES.has(registration.event)
  );
  const deleteRegistration = useMutation(
    api.culturalRegistrations.deleteCulturalRegistration
  );

  if (!isAuthenticated) return <AdminLogin onLogin={login} />;

  const exportCSV = () => {
    if (!registrations?.length) return;

    const rows = registrations.flatMap((registration) =>
      (registration.participants?.length
        ? registration.participants
        : [
            {
              role: "INDIVIDUAL",
              name: registration.name,
              email: registration.email,
              phone: registration.phone,
              classYear: registration.classYear ?? "",
              collegeIdUrl: registration.collegeIdUrl,
            },
          ]
      ).map((participant, index) => [
        registration.event,
        registration.collegeName,
        registration.codeType,
        registration.codeValue,
        registration.teamName ?? "",
        registration.entryFormat ?? "",
        registration.teamSize ?? "",
        participant.role,
        index + 1,
        participant.name,
        participant.email,
        participant.phone,
        participant.classYear,
        participant.collegeIdUrl ?? "",
        registration.registrationFee,
        registration.paymentMethod,
        registration.upiTransactionId ?? "",
        registration.paymentScreenshotUrl ?? "",
        registration.additionalPaymentInfo ?? "",
        registration.verificationStatus,
        new Date(registration.submittedAt).toLocaleString(),
      ])
    );

    const headers = [
      "Event",
      "College",
      "Code Type",
      "Code",
      "Team",
      "Entry Format",
      "Team Size",
      "Participant Role",
      "Participant No",
      "Name",
      "Email",
      "Phone",
      "Class / Year",
      "College ID URL",
      "Fee",
      "Payment Method",
      "UPI Reference",
      "Payment Screenshot",
      "Additional Payment Info",
      "Status",
      "Submitted",
    ];
    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((field) => `"${String(field).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `cultural-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (id: Id<"culturalRegistrations">) => {
    if (!window.confirm("Delete this cultural registration?")) return;
    await deleteRegistration({ id });
  };

  const DocumentLink = ({
    url,
    alt,
  }: {
    url?: string;
    alt: string;
  }) => {
    if (!url) return <span className="text-gray-500">Not provided</span>;
    const isImage = /\.(jpg|jpeg|png|webp)(\?|$)/i.test(url);

    if (!isImage) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline"
        >
          Open document
        </a>
      );
    }

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={url}
          alt={alt}
          className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
        />
      </a>
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 pt-32 bg-black text-white">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
              <CalendarDays className="text-pink-400" />
              Cultural Registrations
            </h1>
            <p className="text-gray-400">
              {registrations?.length ?? 0} total entries
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportCSV}
              variant="outline"
              disabled={!registrations?.length}
            >
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-500/30 text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Card className="border-pink-500/30 bg-black">
          <CardHeader>
            <CardTitle>All cultural registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {registrations === undefined ? (
              <p className="text-gray-400">Loading registrations...</p>
            ) : registrations.length === 0 ? (
              <p className="text-gray-400">No cultural registrations yet.</p>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration._id}
                    className="rounded border border-white/10 p-4"
                  >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {registration.event}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {registration.collegeName}
                          {registration.teamName
                            ? ` · Team: ${registration.teamName}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {registration.verificationStatus}
                        </Badge>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="border-red-500/30 text-red-400"
                          onClick={() => remove(registration._id)}
                          aria-label={`Delete ${registration.event} registration`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Registration code</span>
                        <p>{registration.codeType}: {registration.codeValue}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Entry</span>
                        <p>
                          {registration.entryFormat ?? "-"}
                          {registration.teamSize
                            ? ` · ${registration.teamSize} participants`
                            : ""}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Payment</span>
                        <p>{registration.paymentMethod} · {registration.registrationFee}</p>
                        {registration.upiTransactionId && (
                          <p className="break-all text-gray-400">
                            Ref: {registration.upiTransactionId}
                          </p>
                        )}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Submitted</span>
                        <p>{new Date(registration.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {registration.additionalPaymentInfo && (
                      <p className="mt-3 text-sm text-gray-400">
                        Additional payment info: {registration.additionalPaymentInfo}
                      </p>
                    )}

                    <div className="mt-4">
                      <span className="text-sm text-gray-500">Payment proof</span>
                      <div className="mt-2">
                        <DocumentLink
                          url={registration.paymentScreenshotUrl}
                          alt={`Payment proof for ${registration.event}`}
                        />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 lg:grid-cols-2">
                      {(registration.participants?.length
                        ? registration.participants
                        : [
                            {
                              role: "INDIVIDUAL",
                              name: registration.name,
                              email: registration.email,
                              phone: registration.phone,
                              classYear: registration.classYear ?? "",
                              collegeIdUrl: registration.collegeIdUrl,
                            },
                          ]
                      ).map((participant, index) => (
                        <div
                          key={`${participant.email}-${index}`}
                          className="grid gap-3 rounded border border-white/10 p-3 sm:grid-cols-[1fr_128px]"
                        >
                          <div className="text-sm">
                            <Badge variant="secondary" className="mb-2">
                              {participant.role}
                            </Badge>
                            <p className="font-medium">{participant.name}</p>
                            <p className="break-all text-gray-400">
                              {participant.email} · {participant.phone}
                            </p>
                            <p className="text-gray-500">
                              {participant.classYear}
                            </p>
                          </div>
                          <DocumentLink
                            url={participant.collegeIdUrl}
                            alt={`College ID for ${participant.name}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
