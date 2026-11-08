import { createFileRoute } from "@tanstack/react-router";
import { payrollRequest } from "@/lib/payroll-api.server";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cookies = request.headers.get("cookie") || "";
        const match = cookies.match(/(?:^|;\s*)payroll_session=([a-f0-9]+)/i);
        const token = match?.[1];

        if (!token) {
          return Response.json(
            { error: "login_required" },
            { status: 401 },
          );
        }

        try {
          const response = await payrollRequest(
            "/api/auth/me",
            { method: "GET" },
            token,
          );

          const data = await response.json();

          if (response.status === 401) {
            return Response.json(data, {
              status: 401,
              headers: {
                "Set-Cookie":
                  "payroll_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0",
              },
            });
          }

          return Response.json(data, {
            status: response.status,
          });
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