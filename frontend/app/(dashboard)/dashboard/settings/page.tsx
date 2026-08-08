
"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

import {
  changePassword,
  getProfile,
  updateProfile,
} from "@/lib/services/profile";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [threatFeedUpdates, setThreatFeedUpdates] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();

        setFullName(profile.user.full_name);
        setEmail(profile.user.email);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSaveChanges() {
    setMessage("");
    setError("");
    setSaving(true);

    try {
      await updateProfile({
        full_name: fullName,
        email,
      });

      setMessage("Changes saved successfully.");
    } catch (err: any) {
      console.error("Failed to save changes:", err);

      setError(
        err?.response?.data?.detail ||
          "Failed to save changes."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword) {
      setError("Please enter both passwords.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );
      return;
    }

    setChangingPassword(true);

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordForm(false);

      setMessage(
        "Password changed successfully."
      );
    } catch (err: any) {
      console.error(
        "Failed to change password:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <main className="min-h-screen p-8">
          <p className="text-slate-400">
            Loading settings...
          </p>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Configure your ThreatFusion account and
            application preferences.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-green-700 bg-green-950/40 px-4 py-3 text-green-400">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-700 bg-red-950/40 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-8">

          {/* Profile */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Profile
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Full Name
                </label>

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              </div>

            </div>

          </section>

          {/* Notifications */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Notifications
            </h2>

            <div className="space-y-4">

              <label className="flex items-center justify-between">
                <span>Email Alerts</span>

                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) =>
                    setEmailAlerts(e.target.checked)
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Threat Feed Updates</span>

                <input
                  type="checkbox"
                  checked={threatFeedUpdates}
                  onChange={(e) =>
                    setThreatFeedUpdates(
                      e.target.checked
                    )
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Weekly Reports</span>

                <input
                  type="checkbox"
                  checked={weeklyReports}
                  onChange={(e) =>
                    setWeeklyReports(
                      e.target.checked
                    )
                  }
                />
              </label>

            </div>

          </section>

          {/* Security */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Security
            </h2>

            {!showPasswordForm ? (
              <button
                onClick={() =>
                  setShowPasswordForm(true)
                }
                className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
              >
                Change Password
              </button>
            ) : (
              <div className="max-w-xl space-y-4">

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                    className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {changingPassword
                      ? "Changing..."
                      : "Update Password"}
                  </button>

                  <button
                    onClick={() => {
                      setShowPasswordForm(false);
                      setCurrentPassword("");
                      setNewPassword("");
                    }}
                    className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

          </section>

          {/* API */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              API Keys
            </h2>

            <p className="text-slate-400">
              API key management will be available
              in the next version.
            </p>

          </section>

          {/* Save */}

          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </main>
    </AuthGuard>
  );
}