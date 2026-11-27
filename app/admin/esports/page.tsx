"use client";

import { AdminLogin } from "@/components/admin-login";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Download, Gamepad2, LogOut, Trash2 } from "lucide-react";

export default function AdminEsportsRegistrations() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const registrations = useQuery(api.esportsRegistrations.listRegistrations);
  const deleteRegistration = useMutation(api.esportsRegistrations.deleteRegistration);

  if (!isAuthenticated) return <AdminLogin onLogin={login} />;

  const exportCSV = () => {
    if (!registrations?.length) return;
    const rows = registrations.flatMap((registration, index) => {
      if (registration.players?.length) {
        return registration.players.map((player, playerIndex) => [
          index + 1,
          registration.game,
          registration.codeType ?? "",
          registration.codeValue ?? "",
          registration.teamName ?? "",
          playerIndex + 1,
          player.name,
          player.email,
          player.ign,
          player.collegeIdUrl ?? player.collegeId ?? "",
          player.govtIdUrl ?? "",
          player.number,
          player.collegeName,
          registration.verificationStatus,
          registration.paymentMethod ?? "",
          registration.upiTransactionId ?? "",
          registration.paymentScreenshotUrl ?? "",
          registration.additionalPaymentInfo ?? "",
          new Date(registration.submittedAt).toLocaleString(),
        ]);
      }
      return [[
        index + 1,
        registration.game,
        registration.codeType ?? "",
        registration.codeValue ?? "",
        "",
        "",
        registration.name ?? "",
        registration.email ?? "",
        registration.ign ?? "",
        registration.collegeIdUrl ?? registration.collegeId ?? "",
        registration.govtIdUrl ?? "",
        registration.phone ?? "",
        registration.collegeName ?? "",
        registration.verificationStatus,
        registration.paymentMethod ?? "",
        registration.upiTransactionId ?? "",
        registration.paymentScreenshotUrl ?? "",
        registration.additionalPaymentInfo ?? "",
        new Date(registration.submittedAt).toLocaleString(),
      ]];
    });

    const headers = ["S.No", "Game", "Code Type", "Code", "Team Name", "Player No", "Name", "Email", "IGN", "College ID", "Govt ID", "Number", "College Name", "Status", "Payment Method", "UPI Reference", "Payment Screenshot", "Additional Payment Info", "Submitted"];
    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `esports-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (id: Id<"esportsRegistrations">) => {
    if (!window.confirm("Delete this esports registration?")) return;
    await deleteRegistration({ id });
  };

  return (
    <div className="min-h-screen px-4 py-8 pt-32 bg-black text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
              <Gamepad2 className="text-cyan-400" />
              Esports Registrations
            </h1>
            <p className="text-gray-400">{registrations?.length ?? 0} total entries</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportCSV} variant="outline" disabled={!registrations?.length}>
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button onClick={logout} variant="outline" className="border-red-500/30 text-red-400">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Card className="border-cyan-500/30 bg-black">
          <CardHeader>
            <CardTitle>All entries</CardTitle>
          </CardHeader>
          <CardContent>
            {registrations === undefined ? (
              <p className="text-gray-400">Loading registrations...</p>
            ) : registrations.length === 0 ? (
              <p className="text-gray-400">No esports registrations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-3">Game</th>
                      <th className="p-3">Entrant / Team</th>
                      <th className="p-3">Roster</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Submitted</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => (
                      <tr key={registration._id} className="border-b border-white/10 align-top">
                        <td className="p-3 font-semibold">{registration.game}</td>
                        <td className="p-3">
                          {registration.teamName ? (
                            <><span className="font-medium">{registration.teamName}</span></>
                          ) : (
                            <>
                              <span className="font-medium">{registration.name ?? "-"}</span>
                              <span className="block text-gray-400">{registration.email ?? registration.phone ?? "-"}</span>
                            </>
                          )}
                          {registration.codeType && registration.codeValue && (
                            <span className="mt-1 inline-block rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                              {registration.codeType}: {registration.codeValue}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {registration.players?.length ? (
                            <div className="space-y-2">
                              {registration.players.map((player, index) => (
                                <div key={`${player.email}-${index}`} className="border-l border-cyan-500/40 pl-3">
                                  <span className="font-medium">{player.name}</span>
                                  {index >= (registration.game === "BGMI" ? 4 : 5) && (
                                    <span className="ml-2 text-xs text-cyan-400">(sub)</span>
                                  )}
                                  <span className="block break-all text-gray-400">{player.email} · {player.number}</span>
                                  <span className="block text-gray-500">{player.ign} · {player.collegeName}</span>
                                  <div className="mt-2 flex flex-wrap gap-3">
                                    {(player.collegeIdUrl || player.collegeId) && (
                                      <a
                                        href={player.collegeIdUrl || player.collegeId}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <span className="mb-1 block text-xs text-gray-500">College ID</span>
                                        <img
                                          src={player.collegeIdUrl || player.collegeId}
                                          alt={`College ID for ${player.name}`}
                                          className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
                                        />
                                      </a>
                                    )}
                                    {player.govtIdUrl && (
                                      <a
                                        href={player.govtIdUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <span className="mb-1 block text-xs text-gray-500">Govt ID</span>
                                        <img
                                          src={player.govtIdUrl}
                                          alt={`Government ID for ${player.name}`}
                                          className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
                                        />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              <span>{registration.ign || registration.playerTag || "-"}</span>
                              <span className="block text-gray-400">{registration.collegeName || "-"}</span>
                              <span className="block text-gray-500">{registration.phone || "-"}</span>
                              <div className="mt-2 flex flex-wrap gap-3">
                                {(registration.collegeIdUrl || registration.collegeId) && (
                                  <a
                                    href={
                                      registration.collegeIdUrl ||
                                      registration.collegeId
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <span className="mb-1 block text-xs text-gray-500">College ID</span>
                                    <img
                                      src={
                                        registration.collegeIdUrl ||
                                        registration.collegeId
                                      }
                                      alt={`College ID for ${registration.name || "entrant"}`}
                                      className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
                                    />
                                  </a>
                                )}
                                {registration.govtIdUrl && (
                                  <a
                                    href={registration.govtIdUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <span className="mb-1 block text-xs text-gray-500">Govt ID</span>
                                    <img
                                      src={registration.govtIdUrl}
                                      alt={`Government ID for ${registration.name || "entrant"}`}
                                      className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
                                    />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {registration.paymentMethod ? (
                            <div className="space-y-1 text-xs">
                              <span className="font-medium text-white">
                                {registration.paymentMethod}
                              </span>
                              {registration.upiTransactionId && (
                                <span className="block break-all text-cyan-300">
                                  Ref: {registration.upiTransactionId}
                                </span>
                              )}
                              {registration.additionalPaymentInfo && (
                                <span className="block text-gray-400">
                                  {registration.additionalPaymentInfo}
                                </span>
                              )}
                              {registration.paymentScreenshotUrl && (
                                <a
                                  href={registration.paymentScreenshotUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 block"
                                >
                                  <img
                                    src={registration.paymentScreenshotUrl}
                                    alt="Payment screenshot"
                                    className="h-20 w-32 rounded border border-cyan-500/30 object-cover"
                                  />
                                </a>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">—</span>
                          )}
                        </td>
                        <td className="p-3 whitespace-nowrap text-gray-400">
                          {new Date(registration.submittedAt).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary">{registration.verificationStatus}</Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="border-red-500/30 text-red-400"
                            onClick={() => remove(registration._id)}
                            aria-label={`Delete ${registration.game} registration`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
