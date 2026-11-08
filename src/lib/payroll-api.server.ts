export async function payrollRequest(
  path: string,
  options: RequestInit = {},
  token?: string,
) {
  const apiUrl = process.env["PAYROLL_API_URL"];
  const apiKey = process.env["PAYROLL_API_KEY"];

  if (!apiUrl || !apiKey) {
    throw new Error("Payroll API environment variables are not configured.");
  }

  const headers = new Headers(options.headers);

  headers.set("X-API-Key", apiKey);

  if (token) {
    headers.set("X-Auth-Token", token);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}