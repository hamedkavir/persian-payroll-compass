import { createFileRoute } from "@tanstack/react-router";
import { payrollRequest } from "@/lib/payroll-api.server";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const cookies = request.headers.get("cookie") || "";
        const match = cookies.match(/(?:^|;\s*)payroll_session=([a-f0-9]+)/i);
        const token = match?.[1];

        try {
          if (token) {
            await payrollRequest(
              "/api/auth/logout",
              { method: "POST" },
              token,
            );
          }

          return Response.json(
            { ok: true },
            {
              headers: {
                "Set-Cookie":
                  "payroll_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0",
              },
            },
          );
        } catch {
          return Response.json(
            { error: "ارتباط با سرور حقوق و دستمزد برقرار نشد." },
            { status: 500 },
          );
        }
      },
    },
  },
});