import { createFileRoute } from "@tanstack/react-router";
import { payrollRequest } from "@/lib/payroll-api.server";

export const Route = createFileRoute("/api/auth/password")({
  server: {
    handlers: {
      PUT: async ({ request }) => {
        const cookies = request.headers.get("cookie") || "";
        const match = cookies.match(/(?:^|;\s*)payroll_session=([a-f0-9]+)/i);
        const token = match?.[1];

        if (!token) {
          return Response.json({ error: "login_required" }, { status: 401 });
        }

        try {
          const body = await request.json();

          const upstream = await payrollRequest(
            "/api/auth/password",
            {
              method: "PUT",
              body: JSON.stringify({
                oldPassword: body.oldPassword,
                newPassword: body.newPassword,
              }),
            },
            token,
          );

          const data = await upstream.json();

          return Response.json(data, {
            status: upstream.status,
          });
        } catch {
          return Response.json(
            { error: "server_error", message: "ارتباط با سرور برقرار نشد." },
            { status: 500 },
          );
        }
      },
    },
  },
});
