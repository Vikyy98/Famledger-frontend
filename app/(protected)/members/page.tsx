"use client";

import MainLayout from "@/app/components/layout/MainLayout";
import Button from "@/app/components/ui/Button";
import TableContainer from "@/app/components/shared/TableContainer";
import ConfirmModal from "@/app/components/shared/ConfirmModal";
import { useAppSelector } from "@/app/hooks/useAuth";
import {
  useCreateFamilyInvitationMutation,
  useGetFamilyMembersQuery,
  useRemoveFamilyMemberMutation,
  useUpdateFamilyMemberRoleMutation,
} from "@/app/services/api/familyAPI";
import { FamilyMember, MemberRole } from "@/app/types/family";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Check,
  Trash2,
} from "lucide-react";
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

type PendingRoleChange = {
  member: FamilyMember;
  nextRole: MemberRole;
};

export default function MembersPage() {
  const user = useAppSelector((s) => s.auth.user);
  const familyId = user?.familyId;

  const [createInvitation, { isLoading: inviteLoading }] =
    useCreateFamilyInvitationMutation();
  const [removeMemberMutation] = useRemoveFamilyMemberMutation();
  const [updateRoleMutation] = useUpdateFamilyMemberRoleMutation();

  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useGetFamilyMembersQuery(familyId ?? 0, { skip: !familyId });

  const [plainCode, setPlainCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pendingRemove, setPendingRemove] = useState<FamilyMember | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] =
    useState<PendingRoleChange | null>(null);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const isViewerAdmin = isAdminRole(user?.role);
  const canInvite = isViewerAdmin && familyId != null && familyId > 0;

  const { adminCount, memberCount } = useMemo(() => {
    let admins = 0;
    let mems = 0;
    for (const m of members) {
      if (formatRoleLabel(m.role) === "Admin") admins += 1;
      else mems += 1;
    }
    return { adminCount: admins, memberCount: mems };
  }, [members]);

  const isLastAdmin = (member: FamilyMember) =>
    formatRoleLabel(member.role) === "Admin" && adminCount <= 1;

  const canTargetMember = (member: FamilyMember) => {
    if (!isViewerAdmin) return false;
    if (user?.id === member.id) return false; // Admin can't target self via these actions.
    return true;
  };

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

  const openRemoveConfirm = (member: FamilyMember) => {
    if (!canTargetMember(member) || isLastAdmin(member)) return;
    setActionError(null);
    setPendingRemove(member);
  };

  const handleConfirmRemove = async () => {
    if (!pendingRemove || !familyId) return;
    setIsRemoving(true);
    setActionError(null);
    try {
      await removeMemberMutation({
        familyId,
        memberUserId: pendingRemove.id,
      }).unwrap();
      setPendingRemove(null);
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 409) {
        setActionError(
          "Cannot remove this member — they are the only remaining admin."
        );
      } else if (status === 403) {
        setActionError("You don't have permission to remove this member.");
      } else {
        setActionError("Could not remove the member. Please try again.");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  const openRoleChangeConfirm = (member: FamilyMember, nextRole: MemberRole) => {
    if (!canTargetMember(member)) return;
    if (nextRole === "Member" && isLastAdmin(member)) return;
    setActionError(null);
    setPendingRoleChange({ member, nextRole });
  };

  const handleConfirmRoleChange = async () => {
    if (!pendingRoleChange || !familyId) return;
    setIsChangingRole(true);
    setActionError(null);
    try {
      await updateRoleMutation({
        familyId,
        memberUserId: pendingRoleChange.member.id,
        role: pendingRoleChange.nextRole,
      }).unwrap();
      setPendingRoleChange(null);
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 409) {
        setActionError(
          "Cannot change this role — at least one admin must remain."
        );
      } else if (status === 403) {
        setActionError("You don't have permission to change this member's role.");
      } else {
        setActionError("Could not update the role. Please try again.");
      }
    } finally {
      setIsChangingRole(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {familyId && !membersLoading && !membersError && (
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 tabular-nums">
            {members.length} total · {adminCount} admin{adminCount !== 1 ? "s" : ""} ·{" "}
            {memberCount} member{memberCount !== 1 ? "s" : ""}
          </p>
        )}

        {actionError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {actionError}
          </div>
        )}

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
            <table className="hidden min-w-full table-auto text-sm md:table">
              <thead className="border-b border-gray-200 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Joined</th>
                  {isViewerAdmin && (
                    <th className="py-3 px-4 text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {members.map((m) => {
                  const roleLabel = formatRoleLabel(m.role);
                  const isSelf = user?.id === m.id;
                  const targetable = canTargetMember(m);
                  const lastAdmin = isLastAdmin(m);
                  return (
                    <tr key={m.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-gray-900">
                            {m.fullName}
                            {isSelf && (
                              <span className="ml-2 align-middle inline-flex items-center rounded-md bg-white ring-1 ring-indigo-200 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
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
                            roleLabel === "Admin"
                              ? "inline-flex items-center rounded-md bg-white ring-1 ring-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700"
                              : "inline-flex items-center rounded-md bg-white ring-1 ring-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                          }
                        >
                          {roleLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 tabular-nums">
                        {m.createdOn
                          ? new Date(m.createdOn).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      {isViewerAdmin && (
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {roleLabel === "Member" ? (
                              <button
                                type="button"
                                disabled={!targetable}
                                onClick={() => openRoleChangeConfirm(m, "Admin")}
                                className={
                                  targetable
                                    ? "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                                    : "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-gray-200 px-2 py-1 text-xs font-medium text-gray-400 cursor-not-allowed"
                                }
                                title={
                                  targetable
                                    ? "Promote to admin"
                                    : "You cannot change your own role"
                                }
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                                Promote
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={!targetable || lastAdmin}
                                onClick={() => openRoleChangeConfirm(m, "Member")}
                                className={
                                  targetable && !lastAdmin
                                    ? "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-amber-200 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                                    : "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-gray-200 px-2 py-1 text-xs font-medium text-gray-400 cursor-not-allowed"
                                }
                                title={
                                  !targetable
                                    ? "You cannot change your own role"
                                    : lastAdmin
                                      ? "Cannot demote the only admin"
                                      : "Demote to member"
                                }
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                                Demote
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={!targetable || lastAdmin}
                              onClick={() => openRemoveConfirm(m)}
                              className={
                                targetable && !lastAdmin
                                  ? "inline-flex items-center justify-center rounded-md bg-white ring-1 ring-rose-200 p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                                  : "inline-flex items-center justify-center rounded-md bg-white ring-1 ring-gray-200 p-1.5 text-gray-300 cursor-not-allowed"
                              }
                              title={
                                !targetable
                                  ? isSelf
                                    ? "You cannot remove yourself"
                                    : "Only admins can remove members"
                                  : lastAdmin
                                    ? "Cannot remove the only admin"
                                    : "Remove member"
                              }
                              aria-label="Remove member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Mobile: card list (shown when we have members) */}
          {familyId && !membersLoading && !membersError && members.length > 0 && (
            <ul className="flex flex-col gap-3 md:hidden">
              {members.map((m) => {
                const roleLabel = formatRoleLabel(m.role);
                const isSelf = user?.id === m.id;
                const targetable = canTargetMember(m);
                const lastAdmin = isLastAdmin(m);
                return (
                  <li
                    key={`${m.id}-card`}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-900">
                          <span className="truncate">{m.fullName}</span>
                          {isSelf && (
                            <span className="inline-flex items-center rounded-md bg-white ring-1 ring-indigo-200 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
                              You
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {m.email}
                        </p>
                      </div>
                      <span
                        className={
                          roleLabel === "Admin"
                            ? "shrink-0 inline-flex items-center rounded-md bg-white ring-1 ring-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700"
                            : "shrink-0 inline-flex items-center rounded-md bg-white ring-1 ring-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                        }
                      >
                        {roleLabel}
                      </span>
                    </div>

                    <p className="mt-2 text-xs tabular-nums text-gray-500">
                      Joined{" "}
                      {m.createdOn
                        ? new Date(m.createdOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>

                    {isViewerAdmin && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
                        {roleLabel === "Member" ? (
                          <button
                            type="button"
                            disabled={!targetable}
                            onClick={() => openRoleChangeConfirm(m, "Admin")}
                            className={
                              targetable
                                ? "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-emerald-200 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                                : "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-400 cursor-not-allowed"
                            }
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                            Promote
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={!targetable || lastAdmin}
                            onClick={() => openRoleChangeConfirm(m, "Member")}
                            className={
                              targetable && !lastAdmin
                                ? "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-amber-200 px-2.5 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50"
                                : "inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-400 cursor-not-allowed"
                            }
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                            Demote
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={!targetable || lastAdmin}
                          onClick={() => openRemoveConfirm(m)}
                          className={
                            targetable && !lastAdmin
                              ? "ml-auto inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-rose-200 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
                              : "ml-auto inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-300 cursor-not-allowed"
                          }
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </TableContainer>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Invitation Code
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Codes are valid for 24 hours. Generating a new code replaces the previous one.
              </p>
            </div>
            {canInvite && (
              <Button
                type="button"
                variant="primary"
                onClick={handleGenerate}
                isLoading={inviteLoading}
                disabled={inviteLoading}
                className="w-full sm:w-auto shrink-0"
              >
                {inviteLoading ? "Generating…" : "Generate code"}
              </Button>
            )}
          </div>

          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

          {plainCode ? (
            <div className="mt-4 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Copy and send this code
              </p>
              <div className="flex items-center justify-between gap-2">
                <code className="break-all text-lg font-mono font-semibold tracking-wide text-gray-900">
                  {plainCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              {expiresAt && (
                <p className="text-xs text-gray-500 tabular-nums">
                  Expires: {new Date(expiresAt).toLocaleString()}
                </p>
              )}
            </div>
          ) : canInvite ? (
            <p className="mt-4 text-sm text-gray-600">
              No active code. Click <strong>Generate code</strong> to create one.
            </p>
          ) : (
            <p className="mt-4 text-sm text-gray-600">
              Only a family admin can create invitation codes. Ask your admin for a code to use on{" "}
              <span className="font-medium text-gray-800">Register → Join with code</span>.
            </p>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingRemove !== null}
        title="Remove member"
        message={
          pendingRemove ? (
            <>
              Remove <strong>{pendingRemove.fullName}</strong> from{" "}
              {user?.familyName ? `${user.familyName} Family` : "this family"}? Their income
              and expense records will stay in the ledger, but they won&apos;t be able to log in
              or add new entries.
            </>
          ) : (
            ""
          )
        }
        confirmLabel="Remove"
        cancelLabel="Cancel"
        confirmTone="danger"
        isLoading={isRemoving}
        onClose={() => !isRemoving && setPendingRemove(null)}
        onConfirm={handleConfirmRemove}
      />

      <ConfirmModal
        isOpen={pendingRoleChange !== null}
        title={
          pendingRoleChange?.nextRole === "Admin"
            ? "Promote to admin"
            : "Demote to member"
        }
        message={
          pendingRoleChange ? (
            pendingRoleChange.nextRole === "Admin" ? (
              <>
                Promote <strong>{pendingRoleChange.member.fullName}</strong> to admin? Admins can
                invite new members, manage roles, and edit any income or expense in the family.
              </>
            ) : (
              <>
                Demote <strong>{pendingRoleChange.member.fullName}</strong> to member? They will
                lose the ability to invite new members and manage roles. Their existing records
                remain intact.
              </>
            )
          ) : (
            ""
          )
        }
        confirmLabel={
          pendingRoleChange?.nextRole === "Admin" ? "Promote" : "Demote"
        }
        cancelLabel="Cancel"
        confirmTone={pendingRoleChange?.nextRole === "Admin" ? "primary" : "danger"}
        isLoading={isChangingRole}
        onClose={() => !isChangingRole && setPendingRoleChange(null)}
        onConfirm={handleConfirmRoleChange}
      />
    </MainLayout>
  );
}
