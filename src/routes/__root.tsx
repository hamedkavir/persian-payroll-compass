import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/contexts/auth-context";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";
import { AccessDenied } from "@/components/layout/access-denied";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">۴۰۴</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">صفحه پیدا نشد</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            بازگشت به داشبورد
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">بارگذاری صفحه انجام نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          مشکلی پیش آمده است. دوباره تلاش کنید یا به داشبورد بازگردید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            تلاش دوباره
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            بازگشت به داشبورد
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "حقوق‌یار | سامانه حقوق و دستمزد" },
      { name: "description", content: "سامانه یکپارچه مدیریت حقوق، دستمزد و منابع انسانی" },
      { property: "og:title", content: "حقوق‌یار | سامانه حقوق و دستمزد" },
      { property: "og:description", content: "سامانه یکپارچه مدیریت حقوق، دستمزد و منابع انسانی" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fa_IR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Tablets and small laptops start with the sidebar collapsed to icons. */
const SIDEBAR_COLLAPSE_QUERY = "(max-width: 1279px)";

function useResponsiveSidebar() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia(SIDEBAR_COLLAPSE_QUERY);
    const apply = () => setOpen(!mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);
  return [open, setOpen] as const;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const PAGE_PERMISSIONS: Record<string, string> = {
  "/": "dashboard",
  "/employees": "personnel",
  "/payslips": "slips",
  "/loans": "loans",
  "/reports": "reports",
  "/settings": "settings",
};

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useResponsiveSidebar();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const requiredPermission = PAGE_PERMISSIONS[pathname];

  const hasPageAccess =
    !requiredPermission ||
    user?.isAdmin ||
    (requiredPermission === "settings"
      ? user?.permissions.some(
          (permission) => permission === "settings" || permission.startsWith("set_"),
        )
      : user?.permissions.includes(requiredPermission));
  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (pathname !== "/login") {
        navigate({ to: "/login", replace: true });
      }
      return;
    }

    if (user.mustChange) {
      if (pathname !== "/change-password") {
        navigate({ to: "/change-password", replace: true });
      }
      return;
    }

    if (pathname === "/login" || pathname === "/change-password") {
      navigate({ to: "/", replace: true });
    }
  }, [loading, pathname, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">در حال بررسی وضعیت ورود...</p>
      </div>
    );
  }

  if (pathname === "/login" || pathname === "/change-password") {
    return <Outlet />;
  }

  if (!user) {
    return null;
  }

  if (!hasPageAccess) {
    return <AccessDenied />;
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-5 md:px-6 md:py-7 lg:px-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
