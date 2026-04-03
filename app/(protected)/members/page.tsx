"use client";

import MainLayout from "@/app/components/layout/MainLayout";
import Button from "@/app/components/ui/Button";
import TableContainer from "@/app/components/shared/TableContainer";
import { useAppSelector } from "@/app/hooks/useAuth";
import {
  useCreateFamilyInvitationMutation,
  useGetFamilyMembersQuery,
} from "@/app/services/api/familyAPI";
import { Users, Copy, Check, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

function isAdminRole(role: string | undefined) {
  if (!role) return false;
  const r = role.toLowerCase();
  return r === "admin" || r === "administrator";
}

function formatRoleLabel(role: string) {
  const r = role?.toLowerCase() ?? "";
  if (r === "admin" || r === "administrator") return "Admin";
  return "Member";
}

export default function MembersPage() {
  const user = useAppSelector((s) => s.auth.user);
  const familyId = user?.familyId;
  const [createInvitation, { isLoading: inviteLoading }] =
    useCreateFamilyInvitationMutation();
  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useGetFamilyMembersQuery(familyId ?? 0, { skip: !familyId });

  const [plainCode, setPlainCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canInvite = isAdminRole(user?.role) && familyId != null && familyId > 0;

  const { adminCount, memberCount } = useMemo(() => {
    let admins = 0;
    let mems = 0;
    for (const m of members) {
      if (formatRoleLabel(m.role) === "Admin") admins += 1;
      else mems += 1;
    }
    return { adminCount: admins, memberCount: mems };
  }, [members]);

  const handleGenerate = async () => {
    if (!familyId) return;
    setError(null);
    setPlainCode(null);
    setExpiresAt(null);
    try {
      const res = await createInvitation(familyId).unwrap();
      setPlainCode(res.invitationCode);
      setExpiresAt(res.expiresAtUtc);
    } catch {
      setError("Could not create a new code. Only family admins can invite.");
    }
  };

  const handleCopy = async () => {
    if (!plainCode) return;
    try {
      await navigator.clipboard.writeText(plainCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed — select and copy the code manually.");
    }
  };

  return (
    <MainLayout>
      <div className="h-full w-full space-y-8">
        {/* Full-width page header (matches income / dashboard rhythm, not a narrow column) */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3 min-w-0">
            <div className="shrink-0 rounded-full bg-blue-100 p-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900">Family members</h1>
              <p className="mt-1 text-sm text-gray-600">
                Everyone in your family ledger. Admins can generate invitation codes for new
                sign-ups.
              </p>
              {familyId && !membersLoading && !membersError && (
                <p className="mt-2 text-sm text-gray-500">
                  {members.length} total · {adminCount} admin{adminCount !== 1 ? "s" : ""} ·{" "}
                  {memberCount} member{memberCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {canInvite && (
            <div className="shrink-0 lg:pt-1">
              <Button
                type="button"
                variant="primary"
                onClick={handleGenerate}
                isLoading={inviteLoading}
                disabled={inviteLoading}
                className="w-full sm:w-auto"
              >
                {inviteLoading ? "Generating…" : "Generate code"}
              </Button>
            </div>
          )}
        </div>

        <TableContainer title="Member details">
          {!familyId ? (
            <p className="py-8 text-sm text-gray-600">Join or create a family to see members.</p>
          ) : membersLoading ? (
            <p className="py-8 text-sm text-gray-500">Loading members…</p>
          ) : membersError ? (
            <p className="py-8 text-sm text-red-600">Could not load members.</p>
          ) : members.length === 0 ? (
            <p className="py-8 text-sm text-gray-600">No members found.</p>
          ) : (
            <table className="min-w-full text-sm table-auto">
              <thead className="border-b bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="py-3 px-4 font-medium">Member</th>
                  <th className="py-3 px-4 font-medium">Role</th>
                  <th className="py-3 px-4 font-medium">Joined</th>
                  <th className="py-3 px-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-gray-900">
                          {m.fullName}
                          {user?.id === m.id && (
                            <span className="ml-2 align-middle rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                              You
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{m.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          formatRoleLabel(m.role) === "Admin"
                            ? "inline-block rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900"
                            : "inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                        }
                      >
                        {formatRoleLabel(m.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {m.createdOn
                        ? new Date(m.createdOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          disabled
                          className="inline-flex rounded p-1 text-gray-300 cursor-not-allowed opacity-60"
                          aria-label="Edit member (coming soon)"
                          title="Coming soon"
                        >
                          <Pencil className="h-[18px] w-[18px]" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          disabled
                          className="inline-flex rounded p-1 text-gray-300 cursor-not-allowed opacity-60"
                          aria-label="Remove member (coming soon)"
                          title="Coming soon"
                        >
                          <Trash2 className="h-[18px] w-[18px]" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableContainer>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Invitation code</h2>
          <p className="mt-1 text-sm text-gray-500">
            Codes are valid for 24 hours. Generating a new code replaces the previous one. Use{" "}
            <span className="font-medium text-gray-700">Generate code</span> above when you are an
            admin.
          </p>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {plainCode ? (
            <div className="mt-4 space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Copy and send this code
              </p>
              <div className="flex items-center justify-between gap-2">
                <code className="break-all text-lg font-mono font-semibold text-gray-900">
                  {plainCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              {expiresAt && (
                <p className="text-xs text-gray-500">
                  Expires: {new Date(expiresAt).toLocaleString()}
                </p>
              )}
            </div>
          ) : canInvite ? (
            <p className="mt-4 text-sm text-gray-600">
              No active code shown yet. Click <strong>Generate code</strong> above to create one.
            </p>
          ) : (
            <p className="mt-4 text-sm text-gray-600">
              Only a family admin can create invitation codes. Ask your admin for a code to use on{" "}
              <span className="font-medium text-gray-800">Register → Join with code</span>.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
