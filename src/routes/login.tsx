import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole, User, Wallet } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "ورود به سامانه انجام نشد.");
        return;
      }

      await refreshUser();

      if (data.mustChange) {
        await navigate({ to: "/change-password", replace: true });
      } else {
        await navigate({ to: "/", replace: true });
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Wallet className="size-8" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-foreground">حقوق‌یار</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            سامانه یکپارچه مدیریت حقوق، دستمزد و منابع انسانی
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
          <h2 className="text-xl font-bold text-foreground">ورود به سامانه</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            برای ادامه، اطلاعات حساب کاربری خود را وارد کنید.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                نام کاربری
              </label>

              <div className="relative">
                <User className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="نام کاربری خود را وارد کنید"
                  className="h-12 w-full rounded-xl border border-input bg-background pr-10 pl-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                رمز عبور
              </label>

              <div className="relative">
                <LockKeyhole className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  className="h-12 w-full rounded-xl border border-input bg-background px-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "در حال ورود..." : "ورود به سامانه"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          حقوق‌یار · سامانه مدیریت حقوق و دستمزد
        </p>
      </div>
    </main>
  );
}
