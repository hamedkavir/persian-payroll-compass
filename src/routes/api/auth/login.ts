import { createFileRoute } from "@tanstack/react-router";
import { payrollRequest } from "@/lib/payroll-api.server";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          if (
            typeof body.username !== "string" ||
            typeof body.password !== "string" ||
            !body.username.trim() ||
            !body.password
          ) {
            return Response.json(
              { error: "نام کاربری و رمز عبور الزامی است." },
              { status: 400 },
            );
          }

          const response = await payrollRequest("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username: body.username.trim(),
              password: body.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            return Response.json(data, {
              status: response.status,
            });
          }

          if (typeof data.token !== "string" || !data.token) {
            return Response.json(
              { error: "پاسخ سرور معتبر نیست." },
              { status: 502 },
            );
          }

          const cookie = [
            `payroll_session=${data.token}`,
            "HttpOnly",
            "SameSite=Lax",
            "Path=/",
            "Max-Age=43200",
            ...(process.env["NODE_ENV"] === "production" ? ["Secure"] : []),
          ].join("; ");

          return Response.json(
            {
              user: data.user,
              mustChange: data.mustChange,
            },
            {
              headers: {
                "Set-Cookie": cookie,
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