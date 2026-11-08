import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/change-password")({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("رمز جدید باید حداقل ۶ نویسه باشد.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("رمز جدید و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "تغییر رمز عبور انجام نشد.");
      }

      await refreshUser();
      await navigate({ to: "/", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطایی هنگام تغییر رمز رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-8"
    >
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LockKeyhole className="h-7 w-7" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold">تغییر رمز عبور</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            برای ادامه کار، لطفاً رمز عبور خود را تغییر دهید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="text-sm font-medium">
              رمز عبور فعلی
            </label>
            <input
              id="oldPassword"
              type={showPasswords ? "text" : "password"}
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              رمز عبور جدید
            </label>
            <input
              id="newPassword"
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              تکرار رمز عبور جدید
            </label>
            <input
              id="confirmPassword"
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords((value) => !value)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPasswords ? "مخفی کردن رمزها" : "نمایش رمزها"}
          </button>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "در حال تغییر رمز..." : "تغییر رمز و ادامه"}
          </button>
        </form>
      </div>
    </div>
  );
}
