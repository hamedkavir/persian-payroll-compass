export interface AuthUser {
  id: number;
  username: string;
  fullName: string;
  isAdmin: boolean;
  active: boolean;
  permissions: string[];
  mustChange: boolean;
  createdAt?: string;
  navOrder: string[];
  navCfg: Record<string, unknown> | null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error("دریافت اطلاعات کاربر انجام نشد.");
    }

    const data: AuthUser = await response.json();

    return data;
  } catch (error) {
    console.error("Auth check failed:", error);
    throw error;
  }
}